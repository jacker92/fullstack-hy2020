import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Icon } from "semantic-ui-react";
import { setDiagnoseList, useStateValue } from "../state";
import { Diagnose, Entry, HealthCheckEntry, HospitalEntry, OccupationalHealthCareEntry, Patient } from "../types";
import { assertNever } from "../utils";
import { apiBaseUrl } from "./../constants";

const SinglePatientPage: React.FC = () => {
  const [patient, setPatient] = useState<Patient>()
  const [, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    axios.get<void>(`${apiBaseUrl}/ping`);
    const fetchPatient = async () => {
      try {
        const { data: receivedPatient } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        const { data: diagnoseListFromApi } = await axios.get<Diagnose[]>(
          `${apiBaseUrl}/diagnoses`)
        setPatient(receivedPatient)
        dispatch(setDiagnoseList(diagnoseListFromApi))
      } catch (e) {
        console.error(e);
      }
    };
    fetchPatient();
  }, [dispatch, id])

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
    </div>
  );
};

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case "Hospital":
      return <Hospital entry={entry} />
    case "OccupationalHealthcare":
      return <OccupationalHealthCare entry={entry} />
    case "HealthCheck":
      return <HealthCheck entry={entry} />
    default:
      return assertNever(entry)
  }
}

const Hospital: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {
  const [{ diagnoses },] = useStateValue();
  return (
    <div>
      <Icon name="doctor" />
      <div key={entry.id}>
        <p>{entry.date} <em>{entry.description}</em></p>
        <ul>
          {entry.diagnosisCodes?.map(diagnosis => (
            <li key={diagnosis}>{diagnosis} {diagnoses[diagnosis]?.name}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

const OccupationalHealthCare: React.FC<{ entry: OccupationalHealthCareEntry }> = ({ entry }) => {
  const [{ diagnoses },] = useStateValue();
  return (
    <div>
      <Icon name="heart outline" />
      <div key={entry.id}>
        <p>{entry.date} <em>{entry.description}</em></p>
        <ul>
          {entry.diagnosisCodes?.map(diagnosis => (
            <li key={diagnosis}>{diagnosis} {diagnoses[diagnosis]?.name}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

const HealthCheck: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => {
  const [{ diagnoses },] = useStateValue();
  return (
    <div>
      <div key={entry.id}>
        <Icon name="heart" />
        <p>{entry.date} <em>{entry.description}</em></p>
        <ul>
          {entry.diagnosisCodes?.map(diagnosis => (
            <li key={diagnosis}>{diagnosis} {diagnoses[diagnosis]?.name}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default SinglePatientPage;
