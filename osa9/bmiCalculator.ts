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

console.log(calculateBmi(180, 74))