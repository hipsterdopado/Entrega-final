// backend/routes/claseRoutes.js
const express = require('express');
const router = express.Router();
const claseController = require('../controllers/claseController');
const { verificarToken, verificarGerente } = require('../middlewares/authMiddleware');

// Ver todas las clases
router.get('/', verificarToken, claseController.obtenerClases);

// Crear clase (solo gerentes)
router.post('/crear', verificarToken, verificarGerente, claseController.crearClase);

// Solicitar plaza
router.post('/solicitar', verificarToken, claseController.solicitarPlaza);

// Cancelar inscripción (solo deportistas)
router.delete('/borrar-inscripcion', verificarToken, claseController.borrarInscripcion);

// Eliminar clase (solo gerente)
router.delete('/:id', verificarToken, verificarGerente, claseController.eliminarClase);

module.exports = router;
