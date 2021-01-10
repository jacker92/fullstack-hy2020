import express from 'express';
import patientService from './../services/patientService';
import toNewPatientEntry from './../utils';

const router = express.Router();

router.get('/', (_req, res) => {
    const patients = patientService.getEntries();
    res.send(patients);
});

router.post('/', (req, res) => {
    const newPatientEntry = toNewPatientEntry(req.body);
    const patients = patientService.addPatient(newPatientEntry);
    res.send(patients);
});

export default router;