import express from 'express'
import { calculateBmi } from './bmiCalculator'

const app = express();

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {

    if (!req.query.height || !req.query.weight) {
        return res.send({ error: 'malformatted parameters' }).status(400)
    }

    const height = Number(req.query.height)
    const weight = Number(req.query.weight)

    try {
        const result = calculateBmi(height, weight)
        return res.send(result)
    } catch (e) {
        return res.send(e.message).status(400)
    }
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});