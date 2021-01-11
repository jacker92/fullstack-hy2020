import express from 'express';
import patientService from './../services/patientService';
import { toNewPatientEntry, toNewEntry } from './../utils';

const router = express.Router();

router.get('/', (_req, res) => {
    const patients = patientService.getEntries();
    res.send(patients);
});

router.get('/:id', (req, res) => {
    const patient = patientService.findByID(req.params.id);
    if (!patient) {
        res.status(404).send({ error: `Could not find user with id: ${req.params.id}` });
    }
    res.send(patient);
});

router.post('/:id/entries', (req, _res): void => {
    const id = req.params.id;
    console.log("In id entries", req.params.id);
    const newEntry = toNewEntry(req.body);
    const entry = patientService.addEntryForPatient(id, newEntry);
    _res.send(entry);
});

router.post('/', (req, res) => {
    const newPatientEntry = toNewPatientEntry(req.body);
    const patients = patientService.addPatient(newPatientEntry);
    res.send(patients);
});

export default router;