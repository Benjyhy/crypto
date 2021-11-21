import express from "express";
import * as cryptoController from "../controllers/cryptoController.js";

const router = express.Router();

router.get("/", cryptoController.crypto_getAll);
router.get("/:cmid", cryptoController.crypto_getById);
router.get("/cmid/hisotry/:period", cryptoController.crypto_history);
router.post("/", cryptoController.crypto_add);
router.delete("/:cmid", cryptoController.crypto_delete);

export default router;