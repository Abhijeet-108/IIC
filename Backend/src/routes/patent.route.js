import { createPatent, getAllPatents, getPatentByUser, updatePatent, deletePatent } from "../controllers/patent.controller.js";
import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/").post(upload.array("supportDocument"), createPatent);
router.route("/").get(getAllPatents);
router.route("/user/:id").get(getPatentByUser);
router.route("/user/:id").put(upload.array("supportDocument"), updatePatent).delete(deletePatent);

export default router;