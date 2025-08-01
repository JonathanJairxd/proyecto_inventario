CREATE DATABASE inventario;

USE inventario;

CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50),
  password VARCHAR(50)
);

CREATE TABLE productos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  codigo VARCHAR(50) UNIQUE,
  nombre VARCHAR(100),
  descripcion TEXT,
  unidad VARCHAR(50),
  categoria VARCHAR(50)
);

-- Usuario de prueba
INSERT INTO usuarios (username, password) VALUES ('admin', '1234');
