export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Entry[]
}

export type Entry = OccupationalHealthCareEntry | HospitalEntry | HealthCheck;

export interface BaseEntry {
  id: string,
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

export interface DischargeDetails {
  date: string,
  criteria: string
}

export interface SickLeaveDetails {
  startDate: string,
  endDate: string
}