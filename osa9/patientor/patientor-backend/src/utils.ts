/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseNewEntry, DischargeDetails, Entry, Gender, NewEntry, NewHealthCheck, NewHospitalEntry, NewOccupationalHealthCareEntry, NewPatientEntry, SickLeaveDetails } from './types';

const toNewPatientEntry = (entry: any): NewPatientEntry => {
    return {
        name: parseName(entry.name),
        dateOfBirth: parseDate(entry.dateOfBirth, 'Date of birth'),
        ssn: parseSSN(entry.ssn),
        gender: parseGender(entry.gender),
        occupation: parseOccupation(entry.occupation),
        entries: parseEntries(entry.entries)
    };
};

const toNewEntry = (entry: any): NewEntry => {
    const baseEntry = {
        date: parseDate(entry.date, 'date'),
        specialist: parseName(entry.specialist),
        description: parseName(entry.description),
        type: parseName(entry.type),
        diagnosisCodes: parseDiagnosisCodes(entry.diagnosisCodes)
    };
    switch (entry.type) {
        case "Hospital":
            return toNewHospitalEntry(baseEntry, entry);
        case "HealthCheck":
            return toNewHealthCheckEntry(baseEntry, entry);
        case "OccupationalHealthcare":
            return toNewOccupationalHealthCareEntry(baseEntry, entry);
        default:
            throw new Error(`Invalid type: ${entry.type}`);
    }
};

const toNewHospitalEntry = (baseEntry: BaseNewEntry, newEntry: NewHospitalEntry): NewEntry => {
    return {
        ...baseEntry,
        type: "Hospital",
        discharge: parseDischarge(newEntry.discharge)
    };
};

const toNewHealthCheckEntry = (baseEntry: BaseNewEntry, newEntry: NewHealthCheck): NewEntry => {
    return {
        ...baseEntry,
        type: "HealthCheck",
        healthCheckRating: parseHealthCheckRating(newEntry.healthCheckRating)
    };
};

const toNewOccupationalHealthCareEntry = (baseEntry: BaseNewEntry, newEntry: NewOccupationalHealthCareEntry): NewEntry => {
    return {
        ...baseEntry,
        type: "OccupationalHealthcare",
        employerName: parseName(newEntry.employerName),
        sickLeave: parseSickLeaveDetails(newEntry.sickLeave)
    };
};
const parseHealthCheckRating = (healthCheckRating: number): number => {
    if (!healthCheckRating || isNaN(Number(healthCheckRating))) {
        throw new Error("healthCheckRating is missing or is invalid");
    }
    return Number(healthCheckRating);
};

const parseSickLeaveDetails = (sickLeaveDetails: any): SickLeaveDetails => {
    if (!sickLeaveDetails) {
        throw new Error("SickLeaveDetails are missing");
    }
    return {
        startDate: parseDate(sickLeaveDetails.startDate, "start date"),
        endDate: parseDate(sickLeaveDetails.endDate, "end date")
    };
};

const parseDiagnosisCodes = (diagnosisCodes: string[]): string[] => {
    if (!diagnosisCodes) {
        return [];
    }
    return diagnosisCodes;
};

const parseDischarge = (discharge: any): DischargeDetails => {
    if (!discharge) {
        throw new Error("Discharge info is missing");
    }

    return {
        date: parseDate(discharge.date, "Discharge date"),
        criteria: parseName(discharge.criteria)
    };
};

const parseEntries = (entries: Entry[]): Entry[] => {
    if (!entries) {
        return [];
    }
    return entries;
};
const parseName = (name: string): string => {
    validate(name, 'Name');
    return name.trim();
};

const parseDate = (date: string, attributeName: string): string => {
    validate(date, attributeName);
    const parsedDate = date.trim();
    if (parsedDate.length !== 10) {
        throw new Error("Date Of Birth must be provided in format: YYYY-MM-DD");
    }
    if (!isDate(parsedDate)) {
        throw new Error("Invalid date");
    }
    return parsedDate;
};

const parseSSN = (ssn: string): string => {
    validate(ssn, 'SSN');
    const parsedSSN = ssn.trim();
    if (parsedSSN.length !== 11) {
        throw new Error("SSN was invalid");
    }
    return parsedSSN;
};

const parseGender = (gender: any): Gender => {
    validate(gender, 'Gender');
    if (!isGender(gender)) {
        throw new Error(`Incorrect or missing gender`);
    }
    return gender;
};

const parseOccupation = (occupation: string): string => {
    validate(occupation, 'Occupation');
    if (!occupation) {
        throw new Error("Gender cannot be null");
    }
    return occupation.trim();
};

const validate = (str: string, attributeName: string): void => {
    if (!str) {
        throw new Error(`${attributeName} cannot be null`);
    }

    if (!isString(str)) {
        throw new Error(`${attributeName} must be type of string`);
    }

    const whitespaceRemoved = str.trim();
    if (whitespaceRemoved.length == 0) {
        throw new Error(`${attributeName} cannot be only whitespace`);
    }
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const isString = (text: any): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isGender = (param: any): param is Gender => {
    return Object.values(Gender).includes(param);
};

export { toNewPatientEntry, toNewEntry };