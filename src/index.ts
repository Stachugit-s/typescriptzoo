import express from 'express';
import animalRoutes from './routes/animalRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/animals', animalRoutes);

app.get('/', (req, res) => {
    res.send('Animal API is running');
});

app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Access the API at http://localhost:${PORT}/animals`);
});