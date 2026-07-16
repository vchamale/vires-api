import winston from "winston";

/**
 * Logger centralizado basado en Winston.
 *
 * Objetivos de diseño:
 *  - Un único logger configurado para toda la app (evita `console.log` disperso).
 *  - Dos modos de salida CONFIGURABLES vía env:
 *      · "pretty" -> formato visual con marcador `>>>>>` para debugging local.
 *      · "json"   -> formato estructurado, parseable por Loki/Datadog/CloudWatch.
 *  - Niveles reales (error/warn/info/http/debug) en lugar de loggear todo como info.
 *  - Redacción automática de datos sensibles (PII / credenciales).
 *  - Loggers "hijo" por módulo/feature vía `createLogger("nombreModulo")`.
 *
 * Variables de entorno:
 *  - NODE_ENV     : "production" activa json por defecto.
 *  - LOG_LEVEL    : nivel mínimo a emitir (default: prod=info, dev=debug).
 *  - LOG_FORMAT   : "pretty" | "json" (override explícito del formato).
 *  - LOG_COLOR    : "true" | "false" (override de colores en modo pretty).
 *  - LOG_MARKER   : marcador visual inicial (default: ">>>>>").
 */

const { combine, timestamp, printf, json, errors } = winston.format;

const isProd = process.env.NODE_ENV === "production";

const LOG_FORMAT = (process.env.LOG_FORMAT ?? (isProd ? "json" : "pretty")) as
  | "pretty"
  | "json";
const LOG_LEVEL = process.env.LOG_LEVEL ?? (isProd ? "info" : "debug");
const LOG_MARKER = process.env.LOG_MARKER ?? ">>>>>";
const USE_COLOR =
  process.env.LOG_COLOR !== undefined
    ? process.env.LOG_COLOR === "true"
    : !isProd && Boolean(process.stdout.isTTY);

// ---------------------------------------------------------------------------
// Redacción de datos sensibles (PII / credenciales)
// ---------------------------------------------------------------------------
const SENSITIVE_KEYS = new Set(
  [
    "password",
    "pass",
    "pwd",
    "token",
    "accesstoken",
    "refreshtoken",
    "authorization",
    "secret",
    "jwt",
    "apikey",
    "creditcard",
    "cvv",
    "ssn",
  ].map((k) => k.toLowerCase())
);

const REDACTED = "***REDACTED***";

/** Redacta recursivamente cualquier clave sensible. Protegido contra ciclos. */
function redact(value: unknown, seen = new WeakSet<object>()): unknown {
  if (value === null || typeof value !== "object") return value;

  // Error: message/stack son no-enumerables -> se perderían al serializar.
  // Los materializamos para no perder el stack trace en los logs.
  if (value instanceof Error) {
    return { name: value.name, message: value.message, stack: value.stack };
  }

  if (seen.has(value)) return "[Circular]";
  seen.add(value);

  if (Array.isArray(value)) return value.map((v) => redact(v, seen));

  const out: Record<string, unknown> = {};
  for (const [key, val] of Object.entries(value)) {
    out[key] = SENSITIVE_KEYS.has(key.toLowerCase())
      ? REDACTED
      : redact(val, seen);
  }
  return out;
}

// Campos "reservados" que NO son payload adicional del log.
const RESERVED = new Set(["level", "message", "timestamp", "module", "context", "stack"]);

/** Formato Winston que limpia el meta antes de serializar. */
const redactFormat = winston.format((info) => {
  for (const key of Object.keys(info)) {
    if (RESERVED.has(key)) continue;
    if (SENSITIVE_KEYS.has(key.toLowerCase())) {
      (info as Record<string, unknown>)[key] = REDACTED;
      continue;
    }
    (info as Record<string, unknown>)[key] = redact(
      (info as Record<string, unknown>)[key]
    );
  }
  return info;
});

// ---------------------------------------------------------------------------
// Formato visual (desarrollo): >>>>> ts | LEVEL | [module] (context) message meta
// ---------------------------------------------------------------------------
const LEVEL_COLORS: Record<string, string> = {
  error: "\x1b[31m", // rojo
  warn: "\x1b[33m", // amarillo
  info: "\x1b[32m", // verde
  http: "\x1b[35m", // magenta
  debug: "\x1b[36m", // cyan
};
const RESET = "\x1b[0m";
const DIM = "\x1b[2m";

const prettyFormat = printf((info) => {
  const {
    level,
    message,
    timestamp: ts,
    module,
    context,
    stack,
    ...meta
  } = info as Record<string, unknown> & { level: string; message: string };

  const label = level.toUpperCase().padEnd(5);
  const coloredLabel = USE_COLOR
    ? `${LEVEL_COLORS[level] ?? ""}${label}${RESET}`
    : label;

  const modPart = module ? `[${String(module)}] ` : "";
  const ctxPart = context ? `(${String(context)}) ` : "";

  const metaKeys = Object.keys(meta);
  const metaStr = metaKeys.length
    ? `${USE_COLOR ? DIM : ""} ${JSON.stringify(meta)}${USE_COLOR ? RESET : ""}`
    : "";

  let line = `${LOG_MARKER} ${ts} | ${coloredLabel} | ${modPart}${ctxPart}${message}${metaStr}`;
  if (stack) line += `\n${String(stack)}`;
  return line;
});

// ---------------------------------------------------------------------------
// Logger raíz
// ---------------------------------------------------------------------------
const baseFormat = combine(
  errors({ stack: true }), // convierte instancias Error en { message, stack }
  redactFormat(),
  timestamp({ format: isProd ? undefined : "YYYY-MM-DD HH:mm:ss.SSS" })
);

const logger = winston.createLogger({
  level: LOG_LEVEL,
  format:
    LOG_FORMAT === "json"
      ? combine(baseFormat, json())
      : combine(baseFormat, prettyFormat),
  transports: [new winston.transports.Console()],
  // No abortar el proceso ante errores de logging.
  exitOnError: false,
});

/**
 * Metadatos opcionales que acompañan a un log.
 * `context` describe el flujo/paso; el resto es payload libre (ya redactado).
 */
export interface LogMeta {
  context?: string;
  [key: string]: unknown;
}

/**
 * Crea un logger hijo asociado a un módulo/feature concreto.
 * El nombre aparece como `[module]` en cada línea, facilitando el rastreo.
 *
 * @example
 *   const log = createLogger("currencyService");
 *   log.info("Moneda creada", { context: "createCurrency", currencyId: 3 });
 */
export function createLogger(moduleName: string): winston.Logger {
  return logger.child({ module: moduleName });
}

export default logger;
