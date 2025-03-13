const router = require("express").Router();
const { saludarController } = require("../controller/greet.controller");

router.get("/", saludarController);

module.exports = router;
