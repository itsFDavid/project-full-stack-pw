const { despedir } = require("../services/despedir.service");

const despedirController = (req, res) => {
  const adios = despedir();
  res.json(adios);
};

module.exports = {
  despedirController,
};
