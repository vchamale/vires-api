import { Router } from 'express';
import SizeController from '../controllers/sizeController';
import authMiddleware from '../middlewares/authMiddleware';
import modifyRequestMiddleware from '../middlewares/modifyRequestMiddleware';

const router = Router();

// Listado con búsqueda opcional (?search=...)
// Soporta también ?limit y ?offset opcionales
router.get(
  '/',
  authMiddleware,
  modifyRequestMiddleware({}),
  SizeController.getAllSizes
);

// Obtener por ID
router.get(
  '/:id',
  authMiddleware,
  modifyRequestMiddleware({}),
  SizeController.getSizeById
);

// Crear
router.post(
  '/',
  authMiddleware,
  modifyRequestMiddleware({}),
  SizeController.createSize
);

// Actualizar por ID
router.put(
  '/:id',
  authMiddleware,
  modifyRequestMiddleware({}),
  SizeController.updateSize
);

// Eliminar por ID
router.delete(
  '/:id',
  authMiddleware,
  modifyRequestMiddleware({}),
  SizeController.deleteSize
);

export default router;
