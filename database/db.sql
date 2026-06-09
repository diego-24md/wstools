CREATE DATABASE constructora;
USE constructora;

CREATE TABLE herramientas
(
  idherramienta  INT AUTO_INCREMENT PRIMARY KEY,
  nombre         VARCHAR(50)   NOT NULL,
  marca          VARCHAR(50)   NOT NULL,
  descripcion    VARCHAR(100)  NOT NULL,
  fotografia     VARCHAR(200)  NULL,
  condicion      ENUM('Bueno','Regular','Malo')  NOT NULL DEFAULT 'Bueno',
  tipo           ENUM('Herramienta', 'Instrumento')
)ENGINE = INNODB;

INSERT INTO herramientas
  (nombre, marca, descripcion, tipo)  VALUES
  ('Alicates', 'Kamasa', 'Para trabajos eléctricos', 'Manual'),
  ('Destornillador', 'PB', 'Tipo cruz imantado', 'Manual');

INSERT INTO herramientas
  (nombre, marca, descripcion) VALUES
  ('Amoladora', 'Bosch', '500 Watts'),
  ('Taladro', 'DeWalt', 'Inalámbrico 18V');

  SELECT * FROM herramientas;

DELIMITER $$
CREATE PROCEDURE spu_herramientas_listar()
BEGIN
  SELECT * FROM herramientas ORDER BY idherramienta DESC;
END $$