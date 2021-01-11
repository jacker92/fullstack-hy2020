import React from "react";
import { Icon } from "semantic-ui-react";
import { useStateValue } from "../state";
import { HealthCheckEntry } from "../types";

export const HealthCheck: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => {
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
    );
};