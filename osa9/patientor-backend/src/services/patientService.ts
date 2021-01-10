import { PatientResponse } from '../types';
import patients from '../data/patients.json';

const getEntries = (): Array<PatientResponse> => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

export default {
    getEntries
};