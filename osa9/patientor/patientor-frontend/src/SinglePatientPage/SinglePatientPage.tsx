import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Icon } from "semantic-ui-react";
import AddEntryModal from "../AddEntryModal";
import { EntryFormValues } from "../AddEntryModal/AddEntryForm";
import { addEntry, setDiagnoseList, useStateValue } from "../state";
import { Diagnose, Entry, Patient } from "../types";
import { apiBaseUrl } from "./../constants";
import { EntryDetails } from "./EntryDetails";

const SinglePatientPage: React.FC = () => {
  const [patient, setPatient] = useState<Patient>();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();
  const [error, setError] = React.useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  useEffect(() => {
    axios.get<void>(`${apiBaseUrl}/ping`);
    const fetchPatient = async () => {
      try {
        const { data: receivedPatient } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        const { data: diagnoseListFromApi } = await axios.get<Diagnose[]>(
          `${apiBaseUrl}/diagnoses`);
        setPatient(receivedPatient);
        dispatch(setDiagnoseList(diagnoseListFromApi));
      } catch (e) {
        console.error(e);
      }
    };
    fetchPatient();
  }, [dispatch, id, modalOpen]);

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      dispatch(addEntry(newEntry));
      closeModal();
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error);
    }
  };

  if (!patient) {
    return null;
  }

  const gender = patient.gender === "male" ? "mars" : patient.gender === "female" ? "venus" : "genderless";
  return (
    <div className="App">
      <h2>{patient.name} <Icon name={gender} /></h2>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
      <h4>Entries</h4>
      {patient.entries.map(entry => (
        <EntryDetails key={entry.id} entry={entry} />
      ))}

      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button onClick={() => openModal()}>Add New Entry</Button>
    </div>
  );
};


export default SinglePatientPage;
