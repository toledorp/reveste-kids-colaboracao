import express from "express";
import interestController from "../controllers/interestController.js";
import Auth from "../middleware/Auth.js";

const router = express.Router();

router.post("/like/:clothingId", Auth.Authorization, interestController.like);
router.delete("/like/:clothingId", Auth.Authorization, interestController.unlike);
router.get("/matches", Auth.Authorization, interestController.getMatches);
router.get("/my-likes", Auth.Authorization, interestController.getMyLikes);

export default router;