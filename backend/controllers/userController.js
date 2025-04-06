// backend/controllers/userController.js
const db = require('../db');
const bcrypt = require('bcrypt');

// Función para registrar un nuevo usuario
exports.registrar = async (req, res) => {
  const { nombre, correo, contraseña, rol } = req.body;

  try {
    // Verificar si el correo ya existe
    const [usuariosExistentes] = await db.query(
      'SELECT * FROM usuarios WHERE correo = ?',
      [correo]
    );

    if (usuariosExistentes.length > 0) {
      return res.status(400).json({ error: 'Este correo ya está registrado.' });
    }

    const hash = await bcrypt.hash(contraseña, 10);

    // Proteger: solo se permite registrar gerente desde panel autenticado
    const rolFinal = rol === 'gerente' ? 'deportista' : rol || 'deportista';

    // Registro del nuevo usuario
    await db.query(
      'INSERT INTO usuarios (nombre, correo, contraseña, rol) VALUES (?, ?, ?, ?)',
      [nombre, correo, hash, rolFinal]
    );

    res.json({ mensaje: 'Usuario registrado correctamente' });
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    res.status(500).json({ error: 'Error al registrar el usuario.' });
  }
};

// Función para contar usuarios
exports.contadorUsuarios = async (req, res) => {
  const [[{ total }]] = await db.query('SELECT COUNT(*) as total FROM usuarios');
  res.json({ total });
};

// Función obtener todos los usuarios
exports.obtenerUsuarios = async (req, res) => {
    const [usuarios] = await db.query('SELECT id, nombre, correo, rol FROM usuarios');
    res.json(usuarios);
  };

exports.eliminarUsuario = async (req, res) => {
    const { id } = req.params;
    await db.query('DELETE FROM usuarios WHERE id = ?', [id]);
    res.json({ mensaje: 'Usuario eliminado correctamente' });
  };
  
exports.actualizarUsuario = async (req, res) => {
    const { id } = req.params;
    const { correo, contraseña } = req.body;
    const campos = [];
    const valores = [];
  
    if (correo) {
      campos.push('correo = ?');
      valores.push(correo);
    }
  
    if (contraseña) {
      const bcrypt = require('bcrypt');
      const hash = await bcrypt.hash(contraseña, 10);
      campos.push('contraseña = ?');
      valores.push(hash);
    }
  
    if (campos.length === 0) {
      return res.status(400).json({ error: 'No se proporcionaron datos para actualizar.' });
    }
  
    valores.push(id);
    const sql = `UPDATE usuarios SET ${campos.join(', ')} WHERE id = ?`;
    await db.query(sql, valores);
    res.json({ mensaje: 'Usuario actualizado correctamente' });
  };
  

// Resumen de clases inscritas y próximas
exports.resumenUsuario = async (req, res) => {
  const usuario_id = req.usuario.id;

  try {
    const [[{ total }]] = await db.query(
      'SELECT COUNT(*) as total FROM inscripciones WHERE usuario_id = ?', [usuario_id]
    );

    const [[proxima]] = await db.query(
      `SELECT c.nombre, c.fecha, c.hora FROM clases c
       JOIN inscripciones i ON i.clase_id = c.id
       WHERE i.usuario_id = ? AND c.fecha >= CURDATE()
       ORDER BY c.fecha, c.hora LIMIT 1`,
      [usuario_id]
    );

    res.json({
      total,
      proxima: proxima ? {
        nombre: proxima.nombre,
        fecha: proxima.fecha,
        hora: proxima.hora
      } : null
    });
  } catch (err) {
    console.error('Error en resumenUsuario:', err);
    res.status(500).json({ error: 'Error al obtener resumen' });
  }
};


