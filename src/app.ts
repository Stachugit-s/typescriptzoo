import express, { Request, Response } from 'express';
import AnimalsController from './controllers/AnimalsController';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());