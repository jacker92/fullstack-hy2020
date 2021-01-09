interface ExerciseCalculationResult {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: String,
    target: number,
    average: number
}

interface ExerciseCalculationResultRating {
    rating: number,
    description: String
}

const calculateRating = (average: number, target: number): ExerciseCalculationResultRating => {
    if (average > target) {
        return {
            rating: 3,
            description: "You exceeded all expectations!"
        }
    } else if (average / target > 0.75) {
        return {
            rating: 2,
            description: "You did pretty well!"
        }
    }
    else if (average / target > 0.5) {
        return {
            rating: 1,
            description: "You did ok, but new time you will do better!"
        }
    }
    return {
        rating: 0,
        description: "Please do better new time!"
    }
}

const calculateExercise = (input: Array<number>, targetAmount: number): ExerciseCalculationResult => {
    const average = input.reduce((a,b) => a + b, 0) / input.length 
    const resultRating = calculateRating(average, targetAmount)

    return {
        periodLength: input.length,
        trainingDays: input.filter(x => x != 0).length,
        success: average > targetAmount,
        rating: resultRating.rating,
        ratingDescription: resultRating.description,
        target: targetAmount,
        average: average
    }
}

const testData = [3, 0, 2, 4.5, 0, 3, 1]
const result = calculateExercise(testData, 2)

console.log(result)