import { Diagnose } from '../types';
import diagnoses from './../data/diagnoses.json';

const getEntries = (): Array<Diagnose> => {
    return diagnoses;
};

export default {
    getEntries
};