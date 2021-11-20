const express = require("express");
const articleController = require("../controllers/articleController");
const router = express.Router();

router.get("/", articleController.article_perso);
router.get("/:id", articleController.article_getById);

module.exports = router;