import express from 'express';
import AnimalsController from '../controllers/AnimalsController';

const router = express.Router();

router.get('/', AnimalsController.getAllAnimals);
router.get('/endangered', AnimalsController.getEndangeredAnimals);
router.get('/habitat/:habitat', AnimalsController.getAnimalsByHabitat);
router.get('/species', AnimalsController.getAnimalsBySpecies);
router.get('/:id', AnimalsController.getAnimalById);
router.post('/', AnimalsController.addAnimal);
router.put('/:id', AnimalsController.updateAnimal);
router.delete('/:id', AnimalsController.deleteAnimal);

export default router;