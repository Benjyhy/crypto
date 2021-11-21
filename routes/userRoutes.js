import express from "express";
import * as userController from "../controllers/userController.js"

const router = express.Router();

router.post("/register", userController.user_register);

router.post("/login", userController.user_login);

router.get("/auth/:provider", userController.user_authProvider);

router.get(
    "/auth/:provider/callback",
    userController.user_authProviderCallback
);

router.post("/logout", userController.user_logout);

router.get("/profile", userController.user_getProfile);

router.put("/profile", userController.user_updateProfile);

export default router;
