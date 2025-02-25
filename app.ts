import express from 'express';
import AnimalsController from './controllers/AnimalsController.ts';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => res.send('Zoo Keeper API is running.'));
//Pobieranie
app.get('/animals', AnimalsController.getAllAnimals);
app.get('/animals/:id', AnimalsController.getAnimalById);
app.get('/animals/endangered', AnimalsController.getEndangeredAnimals);
app.get('/animals/habitat/:habitat', AnimalsController.getAnimalsByHabitat);
app.get('/animals/species', AnimalsController.getAnimalsBySpecies);
//Dodawanie
app.post('/animals', AnimalsController.addAnimal);
app.put('/animals/:id', AnimalsController.updateAnimal);
app.delete('/animals/:id', AnimalsController.deleteAnimal);



app.listen(port, () => console.log(`Server is running on port ${port}`));
