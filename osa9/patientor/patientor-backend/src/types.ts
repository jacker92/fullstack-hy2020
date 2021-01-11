export type Entry = OccupationalHealthCareEntry | HospitalEntry | HealthCheck;
export type NewEntry = NewOccupationalHealthCareEntry | NewHospitalEntry | NewHealthCheck;

export interface BaseEntry {
    id: string,
    date: string,
    specialist: string,
    description: string,
    type: string,
    diagnosisCodes?: string[]
}

export interface BaseNewEntry {
    date: string,
    specialist: string,
    description: string,
    type: string,
    diagnosisCodes?: string[]
}

export interface Diagnose {
    code: string,
    name: string,
    latin?: string
}

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other'
}

export interface Patient {
    id: string,
    name: string,
    dateOfBirth: string,
    ssn: string,
    gender: Gender,
    occupation: string,
    entries: Entry[]
}

export interface OccupationalHealthCareEntry extends BaseEntry {
    type: "OccupationalHealthcare",
    employerName: string,
    sickLeave?: SickLeaveDetails
}

export interface HospitalEntry extends BaseEntry {
    type: "Hospital",
    discharge: DischargeDetails,
}

export interface HealthCheck extends BaseEntry {
    type: "HealthCheck",
    healthCheckRating: number
}

export interface NewOccupationalHealthCareEntry extends BaseNewEntry {
    type: "OccupationalHealthcare",
    employerName: string,
    sickLeave?: SickLeaveDetails
}

export interface NewHospitalEntry extends BaseNewEntry {
    type: "Hospital",
    discharge: DischargeDetails,
}

export interface NewHealthCheck extends BaseNewEntry {
    type: "HealthCheck",
    healthCheckRating: number
}

export interface DischargeDetails {
    date: string,
    criteria: string
}

export interface SickLeaveDetails {
    startDate: string,
    endDate: string
}

export type NewPatientEntry = Omit<Patient, 'id'>;

export type PublicPatientResponse = Omit<Patient, "ssn" | 'entries'>;
export type SinglePatientResponse = Omit<Patient, "ssn">;