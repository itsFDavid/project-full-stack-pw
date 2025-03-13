const { saludar } = require("../services/greet.service");

const saludarController = (req, res) => {
  const mensajeSaludo = saludar();
  res.json(mensajeSaludo);
};

module.exports = {
  saludarController,
};
