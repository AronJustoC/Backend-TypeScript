import express from "express";
import AuthController from "../controllers/auth.controller";

const router = express.Router();

router.post("/login", AuthController.login);
router.post("/register", AuthController.register);
router.post("/refreshToken", AuthController.refreshToken);
router.post("/resend_otp", AuthController.generateNewOtp);
router.post("/validate", AuthController.validateOtp);

export default router;
