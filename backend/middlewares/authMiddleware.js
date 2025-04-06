// backend/middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');

exports.verificarToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ error: 'Token requerido' });

  const token = authHeader.split(' ')[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, usuario) => {
    if (err) return res.status(403).json({ error: 'Token inválido' });
    req.usuario = usuario;
    next();
  });
};

exports.verificarGerente = (req, res, next) => {
  if (req.usuario.rol !== 'gerente') {
    return res.status(403).json({ error: 'Acceso solo para gerentes' });
  }
  next();
};
