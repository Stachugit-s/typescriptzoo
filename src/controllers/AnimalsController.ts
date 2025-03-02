import { Request, Response } from 'express';
import AnimalsService from '../services/AnimalService';
import { Animal } from '../models/animal';

const animalsService = AnimalsService;

const AnimalsController = {
    async getAllAnimals(req: Request, res: Response): Promise<void> {
        try {
            const animals: Animal[] = await animalsService.getAnimals();
            res.status(200).json(animals);
        } catch (error) {
            res.status(500).json({ error: "Failed to retrieve animals." });
        }
    },

    async getAnimalById(req: Request, res: Response): Promise<void> {
        const id: number = parseInt(req.params.id);
        try {
            // Change Animal | null to Animal | undefined to match service return type
            const animal: Animal | undefined = await animalsService.getAnimalById(id);
            if (!animal) {
                res.status(404).json({ error: `Animal with id ${id} not found.` });
                return;
            }
            res.status(200).json(animal);
        } catch (error) {
            res.status(500).json({ error: "Failed to retrieve animal." });
        }
    },

    async getEndangeredAnimals(req: Request, res: Response): Promise<void> {
        try {
            const animals: Animal[] = await animalsService.getEndangeredAnimals();
            res.status(200).json(animals);
        } catch (error) {
            res.status(500).json({ error: "Failed to retrieve endangered animals." });
        }
    },

    async getAnimalsByHabitat(req: Request, res: Response): Promise<void> {
        const habitat: string = req.params.habitat;
        try {
            const animals: Animal[] = await animalsService.getAnimalsByHabitat(habitat);
            res.status(200).json(animals);
        } catch (error) {
            res.status(500).json({ error: "Failed to retrieve animals by habitat." });
        }
    },

    async getAnimalsBySpecies(req: Request, res: Response): Promise<void> {
        const species: string = req.query.species as string;
        try {
            const animals: Animal[] = await animalsService.getAnimalsBySpecies(species);
            res.status(200).json(animals);
        } catch (error) {
            res.status(500).json({ error: "Failed to retrieve animals by species." });
        }
    },

    async addAnimal(req: Request, res: Response): Promise<void> {
        const newAnimal: Omit<Animal, 'id'> = req.body;
        try {
            const animal: Animal = await animalsService.addAnimal(newAnimal);
            res.status(201).json(animal);
        } catch (error) {
            res.status(500).json({ error: "Failed to add animal." });
        }
    },

    async updateAnimal(req: Request, res: Response): Promise<void> {
        const id: number = parseInt(req.params.id);
        const updates: Partial<Animal> = req.body;
        try {
            const updatedAnimal: Animal = await animalsService.updateAnimal(id, updates);
            res.status(200).json(updatedAnimal);
        } catch (error: any) {
            if (error.message && error.message.includes('not found')) {
                res.status(404).json({ error: error.message });
            } else {
                res.status(500).json({ error: "Failed to update animal." });
            }
        }
    },

    async deleteAnimal(req: Request, res: Response): Promise<void> {
        const id: number = parseInt(req.params.id);
        try {
            const result: { message: string } = await animalsService.deleteAnimal(id);

            const response = { success: true, ...result };
            res.status(200).json(response);
        } catch (error: any) {
            if (error.message && error.message.includes('not found')) {
                res.status(404).json({ error: error.message });
            } else {
                res.status(500).json({ error: "Failed to delete animal." });
            }
        }
    }
};

export default AnimalsController;