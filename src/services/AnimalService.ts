import fsPromises from 'fs/promises';
import path from 'path';

const filePath = path.resolve("data", "zoo.json");

interface Animal {
    id: number;
    species: string;
    isEndangered: boolean;
    habitat: string;
    [key: string]: any;
}

const AnimalsService = {
    async getAnimals(): Promise<Animal[]> {
        const data = await fsPromises.readFile(filePath, "utf-8");
        return JSON.parse(data) as Animal[];
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
        const animal = { id, ...newAnimal };
        animals.push(animal);
        await fsPromises.writeFile(filePath, JSON.stringify(animals, null, 2), "utf-8");
        return animal;
    },

    async updateAnimal(id: number, updates: Partial<Animal>): Promise<Animal> {
        const animals = await this.getAnimals();
        const index = animals.findIndex(animal => animal.id === id);
        if (index === -1) {
            throw new Error(`Animal with id ${id} not found.`);
        }
        const updatedAnimal = { ...animals[index], ...updates };
        animals[index] = updatedAnimal;
        await fsPromises.writeFile(filePath, JSON.stringify(animals, null, 2), "utf-8");
        return updatedAnimal;
    },

    async deleteAnimal(id: number): Promise<{ message: string }> {
        const animals = await this.getAnimals();
        const index = animals.findIndex(animal => animal.id === id);
        if (index === -1) {
            throw new Error(`Animal with id ${id} not found.`);
        }
        animals.splice(index, 1);
        await fsPromises.writeFile(filePath, JSON.stringify(animals, null, 2), "utf-8");
        return { message: `Animal with id ${id} deleted.` };
    }
};

export default AnimalsService;