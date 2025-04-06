// backend/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { registrar, contadorUsuarios } = require('../controllers/userController');
const { verificarToken, verificarGerente } = require('../middlewares/authMiddleware');
const userController = require('../controllers/userController');

// Ruta pública: registrar nuevo usuario (solo como deportista)
router.post('/registrar', registrar);

// Ruta protegida: solo autenticados pueden ver el contador de usuarios
router.get('/contador', verificarToken, verificarGerente, contadorUsuarios);
router.get('/todos', verificarToken, verificarGerente, userController.obtenerUsuarios);
router.delete('/:id', verificarToken, verificarGerente, userController.eliminarUsuario);
router.put('/:id', verificarToken, verificarGerente, userController.actualizarUsuario);

// Ruta para resumen
router.get('/resumen', verificarToken, userController.resumenUsuario);

module.exports = router;
