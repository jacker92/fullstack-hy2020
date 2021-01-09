const calculateBmi = (heightInCentimeters: number, weightInKilograms: number): String => {
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

if (process.argv.length < 4) throw new Error('Not enough arguments');
if (process.argv.length > 4) throw new Error('Too many arguments');

if (!isNaN(Number(process.argv[2])) && !isNaN(Number(process.argv[3]))) {
    console.log(calculateBmi(Number(process.argv[2]), Number(process.argv[3])))
} else {
    throw new Error('Provided values were not numbers!');
}