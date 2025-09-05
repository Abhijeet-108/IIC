import { createJournal, getAllJournals, getJournalById , updateJournal, deleteJournal} from "../controllers/journal.controller.js";
import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/").post(upload.array("supportDocument"), createJournal).get(getAllJournals);
router.route("/user/:id").get(getJournalById);
router.route("/user/:id").put(upload.array("supportDocument"), updateJournal).delete(deleteJournal);

export default router;
