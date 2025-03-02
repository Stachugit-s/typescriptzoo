import fsPromises from 'fs/promises';
import path from 'path';
import { Animal } from '../models/animal';

const projectRoot = process.cwd();
const filePath = path.join(projectRoot, 'src', 'data', 'zoo.json');

const AnimalsService = {
    async getAnimals(): Promise<Animal[]> {
        try {
            const data = await fsPromises.readFile(filePath, "utf-8");
            return JSON.parse(data) as Animal[];
        } catch (error) {
            console.error(`Error reading zoo.json: ${error instanceof Error ? error.message : String(error)}`);
            console.error(`File path used: ${filePath}`);
            throw error;
        }
    },

    async getAnimalById(id: number): Promise<Animal | undefined> {
        const animals = await this.getAnimals();
        return animals.find(animal => animal.id === id);
    },

    async getEndangeredAnimals(): Promise<Animal[]> {
        const animals = await this.getAnimals();
        return animals.filter(animal => animal.isEndangered);
    },

    async getAnimalsByHabitat(habitat: string): Promise<Animal[]> {
        const animals = await this.getAnimals();
        return animals.filter(animal => animal.habitat === habitat);
    },

    async getAnimalsBySpecies(species: string): Promise<Animal[]> {
        const animals = await this.getAnimals();
        return animals.filter(animal => animal.species === species);
    },

    async addAnimal(newAnimal: Omit<Animal, 'id'>): Promise<Animal> {
        const animals = await this.getAnimals();
        const id = animals.length ? animals[animals.length - 1].id + 1 : 1;
        const animal: Animal = { id, ...newAnimal };
        animals.push(animal);

        try {
            await fsPromises.writeFile(filePath, JSON.stringify(animals, null, 2), "utf-8");
            return animal;
        } catch (error) {
            console.error(`Error writing to zoo.json: ${error instanceof Error ? error.message : String(error)}`);
            throw error;
        }
    },

    async updateAnimal(id: number, updates: Partial<Animal>): Promise<Animal> {
        const animals = await this.getAnimals();
        const index = animals.findIndex(animal => animal.id === id);
        if (index === -1) {
            throw new Error(`Animal with id ${id} not found.`);
        }
        const updatedAnimal: Animal = { ...animals[index], ...updates };
        animals[index] = updatedAnimal;

        try {
            await fsPromises.writeFile(filePath, JSON.stringify(animals, null, 2), "utf-8");
            return updatedAnimal;
        } catch (error) {
            console.error(`Error writing to zoo.json: ${error instanceof Error ? error.message : String(error)}`);
            throw error;
        }
    },

    async deleteAnimal(id: number): Promise<{ message: string }> {
        const animals = await this.getAnimals();
        const index = animals.findIndex(animal => animal.id === id);
        if (index === -1) {
            throw new Error(`Animal with id ${id} not found.`);
        }
        animals.splice(index, 1);

        try {
            await fsPromises.writeFile(filePath, JSON.stringify(animals, null, 2), "utf-8");
            return { message: `Animal with id ${id} deleted.` };
        } catch (error) {
            console.error(`Error writing to zoo.json: ${error instanceof Error ? error.message : String(error)}`);
            throw error;
        }
    }
};

export default AnimalsService;