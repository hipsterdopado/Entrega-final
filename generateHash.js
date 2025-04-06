const bcrypt = require('bcrypt');

const password = 'admin123'; // La contraseña en texto plano que quieres hashear

bcrypt.hash(password, 10, (err, hash) => {
  if (err) {
    console.error('Error generando el hash:', err);
  } else {
    console.log('Hash generado:', hash);
  }
});
