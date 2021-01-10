interface ExerciseCalculationResult {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

interface ExerciseCalculationResultRating {
    rating: number,
    description: string
}

const calculateRating = (average: number, target: number): ExerciseCalculationResultRating => {
    if (average > target) {
        return {
            rating: 3,
            description: "You exceeded all expectations!"
        };
    } else if (average / target > 0.75) {
        return {
            rating: 2,
            description: "You did pretty well!"
        };
    }
    else if (average / target > 0.5) {
        return {
            rating: 1,
            description: "You did ok, but new time you will do better!"
        };
    }
    return {
        rating: 0,
        description: "Please do better new time!"
    };
};

export const calculateExercises = (input: Array<number>, targetAmount: number): ExerciseCalculationResult => {
    const average = input.reduce((a, b) => a + b, 0) / input.length;
    const resultRating = calculateRating(average, targetAmount);

    return {
        periodLength: input.length,
        trainingDays: input.filter(x => x != 0).length,
        success: average > targetAmount,
        rating: resultRating.rating,
        ratingDescription: resultRating.description,
        target: targetAmount,
        average: average
    };
};

const validateArgs = () => {
    if (process.argv.length < 4) throw new Error('Not enough arguments');

    const spliced = process.argv.splice(2);
    spliced.forEach(x => {
        if (isNaN(Number(x))) {
            throw new Error('All Provided values were not numbers!');
        }
    });

    const target = Number(spliced.shift());
    const result = calculateExercises(spliced.map(Number), target);

    console.log(result);
};

const wasCalledFromCommandLine = !module.parent;

if (wasCalledFromCommandLine) {
    validateArgs();
}