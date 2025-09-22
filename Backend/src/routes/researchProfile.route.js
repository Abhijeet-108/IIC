import { 
    createResearchProfile, 
    getAllResearchProfiles,
    getResearchProfileByDesignation, 
    getResearchProfileByFacultyId,
    updateResearchProfile,
    deleteResearchProfile
} from "../controllers/researchProfile.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { Router } from "express";

const router = Router();

router.route("/")
    .post(upload.single("photograph"), createResearchProfile)
    .get(getAllResearchProfiles);

router.route("/:id")
    .get(getResearchProfileById)
    .put(upload.single("photograph"), updateResearchProfile)
    .delete(deleteResearchProfile);

router.route("/designation/:designation")
    .get(getResearchProfileByDesignation);

router.route("/faculty/:facultyId")
    .get(getResearchProfileByFacultyId);

export default router;