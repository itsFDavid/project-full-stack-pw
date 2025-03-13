const express = require("express");
const cors = require("cors");
const { envs } = require("./config/envs");
const { initDB } = require("./config/initDB");
// const saludarRoutes = require("./greet/routes/greet.routes");
// const despedirRoutes = require("./despedir/routes/despedir.routes");
const productRoutes = require("./routes/products.routes");
const { AppDataSource } = require("./data/source");
const logger = require("./utils/logger");

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

async function start() {
  try {
    await AppDataSource.initialize();
    await initDB();
    logger.info("Conexión a la base de datos exitosa");
  } catch (error) {
    logger.error("Error al conectar a la base de datos ", error);
  }
}
// Rutas
// app.use("/saludar", saludarRoutes);
// app.use("/despedir", despedirRoutes);
app.use("/api/v1/products", productRoutes);

app.listen(envs.port, async () => {
  // console.log({ envs });
  await start();
  logger.success(`Server running on port ${envs.port}`);
});
