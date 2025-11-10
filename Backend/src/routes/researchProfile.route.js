import { 
    createResearchProfile, 
    getAllResearchProfiles, 
    getResearchProfileById, 
    getResearchProfileByDesignation, 
    getResearchProfileByFacultyId,
    updateResearchProfile,
    deleteResearchProfile
} from "../controllers/researchProfile.controller.js";
import { Router } from "express";

const router = Router();

router.route("/")
    .post(createResearchProfile)
    .get(getAllResearchProfiles);

router.route("/:id")
    .get(getResearchProfileById)
    .put(updateResearchProfile)
    .delete(deleteResearchProfile);

router.route("/designation/:designation")
    .get(getResearchProfileByDesignation);

router.route("/faculty/:facultyId")
    .get(getResearchProfileByFacultyId);

export default router;