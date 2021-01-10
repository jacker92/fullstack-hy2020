import { NewPatientEntry, Patient, PatientResponse } from '../types';
import patients from '../data/patients.json';
import { v4 as uuidv4 } from 'uuid';

const getEntries = (): Array<PatientResponse> => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const addPatient = (patient: NewPatientEntry): Patient => {
    const newPatientEntry = {
        id: uuidv4(),
        ...patient
    };

    console.log("Adding patient", newPatientEntry);
    patients.push(newPatientEntry);
    return newPatientEntry;
};

export default {
    getEntries,
    addPatient
};