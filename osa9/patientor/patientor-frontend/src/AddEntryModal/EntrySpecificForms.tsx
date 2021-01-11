import { Field } from "formik";
import React from "react";
import { NumberField, TextField } from "../AddPatientModal/FormField";

export const EntrySpecificForms: React.FC<{ entryType: string }> = ({ entryType }) => {
    switch (entryType) {
        case "Hospital":
            return (
                <div>
                    <h2>Discharge details</h2>
                    <Field
                        label="Discharge Date"
                        placeholder="date"
                        name="discharge.date"
                        component={TextField}
                    />
                    <Field
                        label="Criteria"
                        placeholder="criteria"
                        name="discharge.criteria"
                        component={TextField}
                    />
                </div>
            );

        case "HealthCheck":
            return (
                <div>
                    <Field
                        label="Health Check Rating"
                        name="healthCheckRating"
                        min={1}
                        max={4}
                        component={NumberField}
                    />
                </div>
            );

        case "OccupationalHealthcare":
            return (
                <div>
                    <Field
                        label="Employer Name"
                        placeholder="employerName"
                        name="employerName"
                        component={TextField}
                    />
                    <h2>SickLeave details</h2>
                    <Field
                        label="Start Date"
                        placeholder="startDate"
                        name="sickLeave.startDate"
                        component={TextField}
                    />
                    <Field
                        label="End Date"
                        placeholder="endDate"
                        name="sickLeave.endDate"
                        component={TextField}
                    />
                </div>
            );
        default:
            throw new Error("Invalid value");
    }

};