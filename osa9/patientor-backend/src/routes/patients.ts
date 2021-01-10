import express from 'express';
import { NewPatientEntry } from '../types';
import patientService from './../services/patientService';

const router = express.Router();

router.get('/', (_req, res) => {
    const patients = patientService.getEntries();
    res.send(patients);
});

router.post('/', (req, res) => {
    const patient = req.body as NewPatientEntry;
    const patients = patientService.addPatient(patient);
    res.send(patients);
});

export default router;