import { Router } from "express";
import * as projCtrl from "../controllers/project.controller.js";
import authCtrl from "../controllers/auth.controller.js";

const router = Router();
router.get("/", projCtrl.list);
router.get("/:id", projCtrl.read);
router.post("/", authCtrl.requireSignin, authCtrl.isAdmin, projCtrl.create);
router.put("/:id", authCtrl.requireSignin, authCtrl.isAdmin, projCtrl.update);
router.delete("/:id", authCtrl.requireSignin, authCtrl.isAdmin, projCtrl.remove);
router.delete("/", authCtrl.requireSignin, authCtrl.isAdmin, projCtrl.removeAll);

export default router;
