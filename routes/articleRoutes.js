import express from "express";
import * as articleController from "../controllers/articleController.js";

const router = express.Router();

router.get("/", articleController.article_perso);
router.get("/:id", articleController.article_getById);

export default router;