"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnimalService = void 0;
const animals = [
// Sample data
];
class AnimalService {
    async getAnimalById(id) {
        return animals.find(animal => animal.id === id);
    }
    async getEndangeredAnimals() {
        return animals.filter(animal => animal.isEndangered);
    }
    async getAnimalsByHabitat(habitat) {
        return animals.filter(animal => animal.habitat === habitat);
    }
    async getAnimalsBySpecies(species) {
        return animals.filter(animal => animal.species === species);
    }
    async addAnimal(newAnimal) {
        animals.push(newAnimal);
    }
    async updateAnimal(id, updates) {
        const index = animals.findIndex(animal => animal.id === id);
        if (index !== -1) {
            animals[index] = { ...animals[index], ...updates };
        }
    }
    async deleteAnimal(id) {
        const index = animals.findIndex(animal => animal.id === id);
        if (index !== -1) {
            animals.splice(index, 1);
        }
    }
}
exports.AnimalService = AnimalService;
