import { NewPatientEntry, Patient, PatientResponse } from '../types';
import patientsJSON from '../data/patients.json';
import { v4 as uuidv4 } from 'uuid';
import toNewPatientEntry from '../utils';

const patients: PatientResponse[] = patientsJSON.map(obj => {
    const object = toNewPatientEntry(obj) as PatientResponse;
    object.id = obj.id;
    return object;
});

const getEntries = (): PatientResponse[] => {
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