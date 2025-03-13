const chalk = require("chalk");
const path = require("path");

// Función para obtener el nombre del archivo que llama al logger
const getCallerModule = () => {
  const stack = new Error().stack.split("\n"); // Obtenemos toda la pila de errores
  // Recorremos la pila para encontrar la línea que llamo al logger
  for (let i = 3; i < stack.length; i++) {
    const match = stack[i].match(/\((.*):\d+:\d+\)/);
    if (match) {
      return path.basename(match[1]); // Devolvemos solo el nombre del archivo
    }
  }
  return "unknown"; // Si no se encuentra, devolvemos 'unknown'
};

// Función de logger mejorado
const logger = {
  info: (message, ...others) => {
    const othersMessage = others.length > 0 ? `, ${JSON.stringify(others)}` : "";
    console.log(
      chalk.blue(
        `[INFO] [${getCallerModule()}] ${message}${othersMessage}`
      )
    );
  },
  success: (message, ...others) => {
    const othersMessage = others.length > 0 ? `, ${JSON.stringify(others)}` : "";
    console.log(
      chalk.green(
        `[SUCCESS] [${getCallerModule()}] ${message}${othersMessage}`
      )
    );
  },
  warning: (message, ...others) => {
    const othersMessage = others.length > 0 ? `, ${JSON.stringify(others)}` : "";
    console.log(
      chalk.yellow(
        `[WARNING] [${getCallerModule()}] ${message}${othersMessage}`
      )
    );
  },
  error: (message, ...others) => {
    const othersMessage = others.length > 0 ? `, ${JSON.stringify(others)}` : "";
    console.log(
      chalk.red(
        `[ERROR] [${getCallerModule()}] ${message}${othersMessage}`
      )
    );
  },
};

module.exports = logger;
