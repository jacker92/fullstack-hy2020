import { NewEntry, NewPatientEntry, Patient, PublicPatientResponse, SinglePatientResponse } from '../types';
import pats from '../data/patients';
import { v4 as uuidv4 } from 'uuid';
import { toNewPatientEntry } from '../utils';

const patients: Patient[] = pats.map(obj => {
    console.log(pats);
    const object = toNewPatientEntry(obj) as Patient;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    object.id = obj.id;
    return object;
});

const getEntries = (): PublicPatientResponse[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
};

const addPatient = (patient: NewPatientEntry): PublicPatientResponse => {
    const newPatientEntry = {
        id: uuidv4(),
        ...patient
    };

    console.log("Adding patient", newPatientEntry);
    patients.push(newPatientEntry);
    return newPatientEntry;
};

const findByID = (id: string): SinglePatientResponse | undefined => {
    const result = patients.find(x => x.id === id);
    console.log(patients);
    if (!result) {
        return result;
    }
    else if (!result?.entries) {
        result.entries = [];
    }
    return result;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const addEntryForPatient = (id: string, newEntry: NewEntry): Patient => {
    const result = patients.find(x => x.id === id);
    if (!result) {
        throw new Error("could not find patient");
    }
    result.entries.push({
        ...newEntry,
        id: uuidv4()
    });

    console.log("Returning result", result);
    return result;
};

export default {
    getEntries,
    addPatient,
    findByID,
    addEntryForPatient
};