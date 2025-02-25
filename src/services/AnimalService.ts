import fsPromises from 'fs/promises';
import path from 'path';

const filePath = path.resolve("data", "zoo.json");

const AnimalsService = {
    async getAnimals() {
        const data = await fsPromises.readFile(filePath, "utf-8");
        return JSON.parse(data);
    },
    async getAnimalById(id) {
        const animals = await this.getAnimals();
        return animals.find(animal => animal.id === id);
    },

    async getEndangeredAnimals() {
        const animals = await this.getAnimals();
        return animals.filter(animal => animal.isEndangered);
    },
    async getAnimalsByHabitat(habitat) {
        const animals = await this.getAnimals();
        return animals.filter(animal => animal.habitat === habitat);
    },

    async getAnimalsBySpecies(species) {
        const animals = await this.getAnimals();
        return animals.filter(animal => animal.species === species);
    },

    async addAnimal(newAnimal) {
        const animals = await this.getAnimals();
        const id = animals.length ? animals[animals.length - 1].id + 1 : 1;
        const animal = { id, ...newAnimal };
        animals.push(animal);
        await fsPromises.writeFile(filePath, JSON.stringify(animals, null, 2), "utf-8");
        return animal;
    },

    async updateAnimal(id, updates) {
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

    async deleteAnimal(id) {
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
