import { Diagnose } from '../types';
import diagnoses from './../data/diagnoses.json';

const getEntries = (): Diagnose[] => {
    return diagnoses;
};

export default {
    getEntries
};