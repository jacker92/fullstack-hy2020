import React from "react";
import { Icon } from "semantic-ui-react";
import { useStateValue } from "../state";
import { OccupationalHealthCareEntry } from "../types";

export const OccupationalHealthCare: React.FC<{ entry: OccupationalHealthCareEntry }> = ({ entry }) => {
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
    );
};