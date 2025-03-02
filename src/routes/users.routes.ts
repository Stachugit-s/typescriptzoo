import express from 'express';
import AnimalsController from "../controllers/AnimalsController";

const animalsRouter = express.Router();

animalsRouter.get("/animals", AnimalsController.getAllAnimals);
animalsRouter.get("/animals/endangered", AnimalsController.getEndangeredAnimals);
animalsRouter.get("/animals/habitat/:habitat", AnimalsController.getAnimalsByHabitat);
animalsRouter.get("/animals/species/:species", AnimalsController.getAnimalsBySpecies);
animalsRouter.post("/animals", AnimalsController.addAnimal);
animalsRouter.put("/animals/:id", AnimalsController.updateAnimal);
animalsRouter.delete("/animals/:id", AnimalsController.deleteAnimal);
animalsRouter.get("/animals/:id", AnimalsController.getAnimalById);

export default animalsRouter;