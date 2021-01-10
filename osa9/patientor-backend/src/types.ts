// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {

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

export type NewPatientEntry = Omit<Patient, 'id'>;
export type PublicPatientResponse = Omit<Patient, "ssn" | 'entries'>;
export type SinglePatientResponse = Omit<Patient, "ssn">;