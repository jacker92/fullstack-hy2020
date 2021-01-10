import React from "react";
import { useParams } from "react-router-dom";
import { Icon } from "semantic-ui-react";
import { useStateValue } from "./../state";

const SinglePatientPage: React.FC = () => {
  const [{ patients }] = useStateValue();
  const { id } = useParams<{ id: string }>();
  const patient = patients[id];

  if (!patient) {
    return null;
  }

  const gender = patient.gender === "male" ? "mars" : patient.gender === "female" ? "venus" : "genderless";
  console.log("Patients", patient);
  return (
    <div className="App">
      <h2>{patient.name} <Icon name={gender} /></h2>
      <p>{patient.id}</p>
      <p>{patient.dateOfBirth}</p>
    </div>
  );
};

export default SinglePatientPage;
