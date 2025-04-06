<--database/schema.sql-->
CREATE TABLE `clases` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  `hora` time DEFAULT NULL,
  `plazas_totales` int DEFAULT NULL,
  `plazas_ocupadas` int DEFAULT '0',
  PRIMARY KEY (`id`)
)
CREATE TABLE `inscripciones` (
  `id` int NOT NULL AUTO_INCREMENT,
  `usuario_id` int DEFAULT NULL,
  `clase_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `usuario_id` (`usuario_id`,`clase_id`),
  KEY `clase_id` (`clase_id`),
  CONSTRAINT `inscripciones_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE,
  CONSTRAINT `inscripciones_ibfk_2` FOREIGN KEY (`clase_id`) REFERENCES `clases` (`id`) ON DELETE CASCADE
)
CREATE TABLE `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) DEFAULT NULL,
  `correo` varchar(100) DEFAULT NULL,
  `contraseña` varchar(255) DEFAULT NULL,
  `rol` enum('deportista','gerente') DEFAULT 'deportista',
  PRIMARY KEY (`id`),
  UNIQUE KEY `correo` (`correo`)
)

--Sentencia para crear usuario admin
INSERT INTO usuarios (nombre, correo, contraseña, rol)
VALUES ('admin principal', 'admin@admin.es', '$2a$10$qQbEFoX2UhOlRH8EkV7W8OCtrj0EZeK8qfEQ0P6ViHzF1Rh3iFgvu', 'gerente');<--aquie hay que introducir el resultado del node generataHash.js
*/Para obtener la contraseña hash