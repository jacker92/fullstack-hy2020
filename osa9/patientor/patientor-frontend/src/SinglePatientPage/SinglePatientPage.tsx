import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Icon } from "semantic-ui-react";
import { Patient } from "../types";
import { apiBaseUrl } from "./../constants";

const SinglePatientPage: React.FC = () => {
  const [patient, setPatient] = useState<Patient>()
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    axios.get<void>(`${apiBaseUrl}/ping`);
    const fetchPatient = async () => {
      try {
        const { data: receivedPatient } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        setPatient(receivedPatient)
      } catch (e) {
        console.error(e);
      }
    };
    fetchPatient();
  }, [id])

  if (!patient) {
    return null;
  }

  const gender = patient.gender === "male" ? "mars" : patient.gender === "female" ? "venus" : "genderless";
  console.log("Patients", patient);
  return (
    <div className="App">
      <h2>{patient.name} <Icon name={gender} /></h2>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
      <h4>Entries</h4>
      {patient.entries.map(entry => (
        <div key={entry.id}>
          <p>{entry.date} <em>{entry.description}</em></p>
          <ul>
            {entry.diagnosisCodes?.map(diagnosis => (
              <li key={diagnosis}>{diagnosis}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default SinglePatientPage;
