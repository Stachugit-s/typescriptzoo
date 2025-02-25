"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnimalsController = void 0;
const AnimalService_1 = require("../services/AnimalService");
const animalService = new AnimalService_1.AnimalService();
class AnimalsController {
    async getAnimalById(req, res) {
        try {
            const animal = await animalService.getAnimalById(req.params.id);
            if (!animal) {
                res.status(404).json({ error: 'Animal not found' });
            }
            else {
                res.json(animal);
            }
        }
        catch (error) {
            if (error instanceof Error && error.message.includes('not found')) {
                res.status(404).json({ error: error.message });
            }
            else {
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    }
    async getEndangeredAnimals(req, res) {
        try {
            const animals = await animalService.getEndangeredAnimals();
            res.json(animals);
        }
        catch (error) {
            if (error instanceof Error && error.message.includes('not found')) {
                res.status(404).json({ error: error.message });
            }
            else {
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    }
}
exports.AnimalsController = AnimalsController;
