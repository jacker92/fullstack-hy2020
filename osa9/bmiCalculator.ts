export const calculateBmi = (heightInCentimeters: number, weightInKilograms: number): String => {

    if (isNaN(Number(heightInCentimeters)) || isNaN(Number(weightInKilograms))) {
        throw new Error('Provided values were not numbers!');
    }

    const bmi = weightInKilograms / (heightInCentimeters / 100) ** 2
    if (bmi < 18.5) {
        return "Underweight"
    } else if (bmi < 25) {
        return "Normal weight"
    } else if (bmi < 30) {
        return "Overweight"
    } else if (bmi < 35) {
        "Obese"
    } else if (bmi < 40) {
        return "Very Obese"
    }
    return "Extremely Obese";
}

const validateArgs = () => {
    if (process.argv.length < 4) throw new Error('Not enough arguments');
    if (process.argv.length > 4) throw new Error('Too many arguments');
    calculateBmi(Number(process.argv[2]), Number(process.argv[3]))
}

const wasCalledFromCommandLine = !module.parent

if (wasCalledFromCommandLine) {
    validateArgs()
}