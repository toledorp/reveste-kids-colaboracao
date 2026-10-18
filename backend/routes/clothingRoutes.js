import express from "express";
import clothingController from "../controllers/clothingController.js";
import Auth from "../middleware/Auth.js";

const router = express.Router();

router.get("/clothes", clothingController.getAllClothes);
router.get("/clothes/:id", clothingController.getClothingById);
router.get("/my-clothes", Auth.Authorization, clothingController.getMyClothes);
router.post("/clothes", Auth.Authorization, clothingController.createClothing);
router.put("/clothes/:id", Auth.Authorization, clothingController.updateClothing);
router.delete("/clothes/:id", Auth.Authorization, clothingController.deleteClothing);

export default router;