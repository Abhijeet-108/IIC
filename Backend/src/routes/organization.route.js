import { createOrganization, getOrganizations, getOrganizationById, deleteOrganization, updateOrganization, getIncubators, getByCity, getByStage, getByThrustArea, getStartups } from "../controllers/organization.controller";
import { Router } from "express";

const router = Router();

router.route("/").post(createOrganization).get(getOrganizations);
router.route("/:id").get(getOrganizationById).put(updateOrganization).delete(deleteOrganization);

router.route("/filter/incubators").get(getIncubators);
router.route("/filter/startups").get(getStartups);
router.route("/filter/city/:city").get(getByCity);
router.route("/filter/stage/:stage").get(getByStage);
router.route("/filter/thrust/:area").get(getByThrustArea);

export default router;