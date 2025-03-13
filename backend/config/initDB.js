const mysql = require("mysql2");
const { envs } = require("./envs");
const logger = require("../utils/logger");

const pool = mysql.createPool({
  user: envs.mysql_user,
  password: envs.mysql_user_password,
  database: envs.mysql_db,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const dropTable = `
DROP TABLE IF EXISTS productos;
`;

const createTable = `
CREATE TABLE IF NOT EXISTS productos (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(255) NOT NULL,
  precio DECIMAL(10, 2),
  stock INT
);
`;

const checkTable = `
SELECT COUNT(*) as count
FROM information_schema.tables
WHERE table_schema = '${envs.mysql_db}'
AND table_name = 'productos';
`;

const insertProducts = `
INSERT INTO productos (nombre, precio, stock)
VALUES ?
`;

const initDB = async () => {
  try {
    logger.info("Initializing DB");
    const connection = await pool.promise().getConnection();
    await connection.query(dropTable);
    logger.warning("Table dropped");
    await connection.query(createTable);
    logger.success("Table created");
    const [rows] = await connection.query(checkTable);
    if (rows[0].count === 1) {
      logger.info("Inserting products");
      await insertManyProducts();
    }
    connection.release();
  } catch (error) {
    logger.error("Error initializing DB " + error);
  }
};

const insertManyProducts = async () => {
  const products = [
    { nombre: "Producto 1", precio: 100, stock: 10 },
    { nombre: "Producto 2", precio: 200, stock: 20 },
    { nombre: "Producto 3", precio: 300, stock: 30 },
  ];

  try {
    const connection = await pool.promise().getConnection();
    await connection.query(insertProducts, [
      products.map((product) => Object.values(product)),
    ]);
    connection.release();
  } catch (error) {
    logger.error("Error inserting products " + error);
  }
};

const closeDB = async () => {
  logger.warning("Closing DB");
  await pool.end();
};

process.on("exit", closeDB);
process.on("SIGINT", () => {
  closeDB().then(() => process.exit(0));
});

module.exports = { initDB };
