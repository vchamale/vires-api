import { Request, Response, NextFunction } from "express";
import { createLogger } from "../config/logger";

const log = createLogger("http");

/**
 * Middleware de acceso HTTP.
 *
 * Registra cada request una sola vez, al finalizar la respuesta, con:
 *  método, url, status, duración (ms) e identidad (userId/tenantId si existen).
 *
 * El nivel se elige según el status:
 *   5xx -> error | 4xx -> warn | resto -> http/info
 * De esta forma NO se loggea todo como `info`.
 */
export const loggerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const start = process.hrtime.bigint();

  res.on("finish", () => {
    const durationMs =
      Math.round((Number(process.hrtime.bigint() - start) / 1e6) * 100) / 100;

    const meta = {
      context: "request",
      method: req.method,
      url: req.originalUrl,
      status: res.statusCode,
      durationMs,
      ip: req.ip,
      userId: req.userId,
      tenantId: req.tenantId,
    };

    const message = `${req.method} ${req.originalUrl} -> ${res.statusCode} (${durationMs}ms)`;

    if (res.statusCode >= 500) log.error(message, meta);
    else if (res.statusCode >= 400) log.warn(message, meta);
    else log.http(message, meta);
  });

  next();
};

/**
 * Middleware final de manejo de errores.
 *
 * Centraliza el logging de cualquier error no capturado en las rutas/controladores
 * y evita filtrar detalles internos al cliente en producción.
 * Debe registrarse DESPUÉS de todas las rutas.
 */
export const errorLoggerMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  // `next` es obligatorio para que Express reconozca esto como error handler.
  _next: NextFunction
): void => {
  log.error(`Unhandled error on ${req.method} ${req.originalUrl}`, {
    context: "unhandledError",
    method: req.method,
    url: req.originalUrl,
    userId: req.userId,
    tenantId: req.tenantId,
    error: err, // el formato `errors({ stack: true })` extrae message + stack
  });

  if (res.headersSent) return;

  res.status(500).json({
    message:
      process.env.NODE_ENV === "production"
        ? "Internal server error"
        : err.message,
  });
};

export default loggerMiddleware;
