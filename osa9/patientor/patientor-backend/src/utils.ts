/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Entry, Gender, NewPatientEntry } from './types';

const toNewPatientEntry = (entry: any): NewPatientEntry => {
    return {
        name: parseName(entry.name),
        dateOfBirth: parseDateOfBirth(entry.dateOfBirth),
        ssn: parseSSN(entry.ssn),
        gender: parseGender(entry.gender),
        occupation: parseOccupation(entry.occupation),
        entries: parseEntries(entry.entries)
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

const parseDateOfBirth = (date: string): string => {
    validate(date, 'Date Of Birth');
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

export default toNewPatientEntry;