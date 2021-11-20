const express = require("express");
const cryptoController = require("../controllers/cryptoController");
const router = express.Router();

router.get("/", cryptoController.crypto_getAll);
router.get("/:cmid", cryptoController.crypto_getById);
router.get("/cmid/hisotry/:period", cryptoController.crypto_history);
router.post("/", cryptoController.crypto_add);
router.delete("/:cmid", cryptoController.crypto_delete);

module.exports = router;