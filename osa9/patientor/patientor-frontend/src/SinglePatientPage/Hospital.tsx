import React from "react";
import { Icon } from "semantic-ui-react";
import { useStateValue } from "../state";
import { HospitalEntry } from "../types";

export const Hospital: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {
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
    );
};