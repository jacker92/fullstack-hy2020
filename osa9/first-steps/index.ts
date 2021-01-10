import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json());

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {

    if (!req.query.height || !req.query.weight) {
        return res.send({ error: 'malformatted parameters' }).status(400);
    }

    const height = Number(req.query.height);
    const weight = Number(req.query.weight);

    try {
        const result = calculateBmi(height, weight);
        return res.send(result);
    } catch (e) {
        return res.send(e).status(400);
    }
});

interface ExerciseRequestType {
    daily_exercises: number[],
    target: number
}

app.post('/exercises', (req, res) => {
    const body = req.body as ExerciseRequestType;
    if (!body.daily_exercises || !body.target) {
        return res.send({ error: 'parameters missing' }).status(400);
    }

    try {
        const result = calculateExercises(
            body.daily_exercises.map(Number),
            Number(body.target));
        return res.send(result);
    } catch (e) {
        return res.send({ error: 'malformatted parameters' }).status(400);
    }
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});