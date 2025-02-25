import express, { Request, Response } from 'express';
import { AnimalsController } from './controllers/AnimalsController';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req: Request, res: Response) => res.send('Zoo Keeper API is running.'));

// Pobieranie
app.get('/animals', (req: Request, res: Response) => AnimalsController.getAllAnimals(req, res));
app.get('/animals/:id', (req: Request, res: Response) => AnimalsController.getAnimalById(req, res));
app.get('/animals/endangered', (req: Request, res: Response) => AnimalsController.getEndangeredAnimals(req, res));
app.get('/animals/habitat/:habitat', (req: Request, res: Response) => AnimalsController.getAnimalsByHabitat(req, res));
app.get('/animals/species', (req: Request, res: Response) => AnimalsController.getAnimalsBySpecies(req, res));

// Dodawanie
app.post('/animals', (req: Request, res: Response) => AnimalsController.addAnimal(req, res));
app.put('/animals/:id', (req: Request, res: Response) => AnimalsController.updateAnimal(req, res));
app.delete('/animals/:id', (req: Request, res: Response) => AnimalsController.deleteAnimal(req, res));

export default app;