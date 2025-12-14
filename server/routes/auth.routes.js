import express from "express";
import authCtrl from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", authCtrl.signup);
router.post("/signin", authCtrl.signin);
router.get("/signout", authCtrl.signout);
router.get("/me", authCtrl.requireSignin, authCtrl.me);

export default router;
