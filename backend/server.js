// backend/server.js
require('dotenv').config({ path: __dirname + '/.env' });
console.log("JWT_SECRET:", process.env.JWT_SECRET);
const express = require('express');
const cors = require('cors');
const app = express();

// Middlewares globales
app.use(cors());
app.use(express.json());

// Rutas principales
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/clases', require('./routes/claseRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

// Puerto de escucha
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
