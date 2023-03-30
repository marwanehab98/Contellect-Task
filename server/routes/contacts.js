import express from "express";
import { createContact, getContacts, editContact, deleteContact } from "../controllers/contacts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/create", verifyToken, createContact);
router.get("/get", verifyToken, getContacts);
router.post("/edit", verifyToken, editContact);
router.post("/delete", verifyToken, deleteContact);

export default router;
