import { Router } from "express";
import contactsCtrl from "../controllers/contact.controller.js";

const router = Router();

router.param("contactId", contactsCtrl.contactByID);

router.get("/api/contacts", contactsCtrl.list);
router.get("/api/contacts/:contactId", contactsCtrl.read);
router.post("/api/contacts", contactsCtrl.create);
router.put("/api/contacts/:contactId", contactsCtrl.update);
router.delete("/api/contacts/:contactId", contactsCtrl.remove);
router.delete("/api/contacts", contactsCtrl.removeAll);

export default router;
