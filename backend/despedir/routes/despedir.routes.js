const { despedirController } = require("../controller/despedir.controler");

const router = require("express").Router();

router.get("/", despedirController);

module.exports = router;
