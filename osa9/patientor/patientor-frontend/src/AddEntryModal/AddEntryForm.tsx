import React, { useState } from "react";
import { useStateValue } from "../state";
import { Field, Form, Formik } from "formik";
import { HealthCheckEntry, HospitalEntry, OccupationalHealthCareEntry } from "../types";
import { DiagnosisSelection, EntryOption, EntrySelectField, NumberField, TextField } from "../AddPatientModal/FormField";
import { Button } from "semantic-ui-react";

export type EntryFormValues = OccupationalHealthCareEntry | HospitalEntry | HealthCheckEntry;

interface Props {
    onSubmit: (values: any) => void;
    onCancel: () => void;
}

const entryOptions: EntryOption[] = [
    { value: "OccupationalHealthcare", label: "Occupational HealthCareEntry" },
    { value: "Hospital", label: "HospitalEntry" },
    { value: "HealthCheck", label: "HealthCheck Entry" }
];
const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
    const [{ diagnoses }] = useStateValue();
    const [entryType, setEntryType] = useState("OccupationalHealthcare");

    return (
        <Formik
            initialValues={{
                type: "OccupationalHealthcare",
                date: "",
                specialist: "",
                description: "",
                employerName: "",
                diagnosisCodes: [],
                dischargeDetails: {
                    date: "",
                    criteria: ""
                },
                sickLeave: {
                    startDate: "",
                    endDate: ""
                },
                healthCheckRating: 1
            }
            }
            onSubmit={onSubmit}
            validate={values => {
                console.log("n validate values", values);
                const requiredError = "Field is required";
                const errors: { [field: string]: string } = {};
                if (!values.date) {
                    errors.date = requiredError;
                }
                if (!values.specialist) {
                    errors.specialist = requiredError;
                }
                if (!values.description) {
                    errors.description = requiredError;
                }
                if (!values.diagnosisCodes) {
                    errors.diagnosisCodes = requiredError;
                }
                console.log("errors", errors);
                return errors;
            }}
        >
            {({ isValid, dirty, setFieldValue, setFieldTouched }) => {

                console.log("IsDirty", dirty);
                console.log("IsValid", isValid);
                console.log("IsValid", setFieldValue);
                console.log("IsValid", setFieldTouched);
                return (
                    <Form className="form ui" >
                        <EntrySelectField
                            label="Entry type"
                            name="entrytype"
                            options={entryOptions}
                            onChange={(e) => setEntryType(e.target.value)}
                        />
                        <DiagnosisSelection
                            setFieldValue={setFieldValue}
                            setFieldTouched={setFieldTouched}
                            diagnoses={Object.values(diagnoses)}
                        />
                        <Field
                            label="date"
                            placeholder="date"
                            name="date"
                            component={TextField}
                        />
                        <Field
                            label="specialist"
                            placeholder="specialist"
                            name="specialist"
                            component={TextField}
                        />
                        <Field
                            label="description"
                            placeholder="description"
                            name="description"
                            component={TextField}
                        />
                        <EntrySpecificForms entryType={entryType} />

                        <Button type="button" onClick={onCancel} color="red">
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            floated="right"
                            color="green"
                            disabled={!dirty || !isValid}
                        >
                            Add entry
                       </Button>
                    </Form>
                );
            }}
        </Formik >
    );
};



const EntrySpecificForms: React.FC<{ entryType: string }> = ({ entryType }) => {
    switch (entryType) {
        case "Hospital":
            return (
                <div>
                    <h2>Discharge details</h2>
                    <Field
                        label="Discharge Date"
                        placeholder="date"
                        name="dischargeDetails.date"
                        component={TextField}
                    />
                    <Field
                        label="Criteria"
                        placeholder="criteria"
                        name="dischargeDetails.criteria"
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

export default AddEntryForm;