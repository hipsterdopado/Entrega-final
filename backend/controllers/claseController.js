// backend/controllers/claseController.js
const db = require('../db');

exports.crearClase = async (req, res) => {
  const { nombre, fecha, hora, plazas_totales } = req.body;
  await db.query('INSERT INTO clases (nombre, fecha, hora, plazas_totales) VALUES (?, ?, ?, ?)', [nombre, fecha, hora, plazas_totales]);
  res.json({ mensaje: 'Clase creada' });
};

exports.obtenerClases = async (req, res) => {
  const [clases] = await db.query('SELECT * FROM clases');
  res.json(clases);
};

exports.solicitarPlaza = async (req, res) => {
  const { clase_id } = req.body;
  const usuario_id = req.usuario.id;

  try {
    const [[clase]] = await db.query('SELECT * FROM clases WHERE id = ?', [clase_id]);
    if (!clase) {
      return res.status(404).json({ error: 'Clase no encontrada' });
    }

    if (clase.plazas_ocupadas >= clase.plazas_totales) {
      return res.status(400).json({ error: 'Clase completa' });
    }

    await db.query('INSERT INTO inscripciones (usuario_id, clase_id) VALUES (?, ?)', [usuario_id, clase_id]);
    await db.query('UPDATE clases SET plazas_ocupadas = plazas_ocupadas + 1 WHERE id = ?', [clase_id]);

    res.json({ mensaje: 'Inscripción realizada' });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ error: 'Ya estás inscrito en esta clase' });
    }

    console.error('Error al inscribirse:', error);
    res.status(500).json({ error: 'Error al procesar la inscripción' });
  }
};

// backend/controllers/claseController.js

exports.borrarInscripcion = async (req, res) => {
    const { clase_id } = req.body;
    const usuario_id = req.usuario.id;
  
    try {
      // Verificar si la inscripción existe
      const [inscripcion] = await db.query(
        'SELECT * FROM inscripciones WHERE usuario_id = ? AND clase_id = ?',
        [usuario_id, clase_id]
      );
  
      if (inscripcion.length === 0) {
        return res.status(400).json({ error: 'No estás inscrito en esta clase.' });
      }
  
      // Eliminar inscripción y actualizar plazas
      await db.query(
        'DELETE FROM inscripciones WHERE usuario_id = ? AND clase_id = ?',
        [usuario_id, clase_id]
      );
  
      await db.query(
        'UPDATE clases SET plazas_ocupadas = plazas_ocupadas - 1 WHERE id = ? AND plazas_ocupadas > 0',
        [clase_id]
      );
  
      res.json({ mensaje: 'Inscripción cancelada correctamente.' });
    } catch (error) {
      console.error('Error al borrar inscripción:', error);
      res.status(500).json({ error: 'Error interno al cancelar la inscripción.' });
    }
  };

  exports.eliminarClase = async (req, res) => {
    const { id } = req.params;
  
    try {
      // Primero elimina las inscripciones asociadas
      await db.query('DELETE FROM inscripciones WHERE clase_id = ?', [id]);
  
      // Luego elimina la clase
      await db.query('DELETE FROM clases WHERE id = ?', [id]);
  
      res.json({ mensaje: 'Clase eliminada correctamente' });
    } catch (error) {
      console.error('Error al eliminar clase:', error);
      res.status(500).json({ error: 'Error al eliminar la clase' });
    }
  };
  
  