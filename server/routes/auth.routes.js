// server/routes/auth.routes.js
import { Router } from "express";
import authCtrl from "../controllers/auth.controller.js";

const router = Router();

router.post("/signup", authCtrl.signup);
router.post("/signin", authCtrl.signin);
router.get("/signout", authCtrl.signout);
router.get("/me", authCtrl.requireSignin, authCtrl.me);

export default router;
