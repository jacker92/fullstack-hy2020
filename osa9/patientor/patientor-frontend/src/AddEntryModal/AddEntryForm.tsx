import React, { useState } from "react";
import { useStateValue } from "../state";
import { Field, Form, Formik } from "formik";
import { DiagnosisSelection, EntryOption, EntrySelectField, NumberField, TextField } from "../AddPatientModal/FormField";
import { Button } from "semantic-ui-react";
import { Diagnose, DischargeDetails, SickLeaveDetails } from "../types";

interface Props {
    onSubmit: (values: EntryFormValues) => void;
    onCancel: () => void;
}

export type EntryFormValues = {
    type: string;
    date: string;
    specialist: string;
    description: string;
    employerName: string;
    diagnosisCodes: Diagnose[];
    discharge: DischargeDetails;
    sickLeave: SickLeaveDetails;
    healthCheckRating: 1;
};


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
                discharge: {
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
                if (!values.type) {
                    errors.type = requiredError;
                }

                switch (values.type) {
                    case "Hospital":
                        if (!values.discharge.date || !values.discharge.criteria) {
                            errors.discharge = requiredError;
                        }
                        break;
                    case "OccupationalHealthcare":
                        if (!values.employerName) {
                            errors.employerName = requiredError;
                        }
                        if (!values.sickLeave.startDate || !values.sickLeave.startDate) {
                            errors.sickLeave = requiredError;
                        }
                        break;
                    case "HealthCheck":
                        if (!values.healthCheckRating) {
                            errors.healthCheckRating = requiredError;
                        }
                        break;
                    default:
                        errors.type = "Invalid type";
                }
                return errors;
            }}
        >
            {({ isValid, dirty, setFieldValue, setFieldTouched }) => {

                return (
                    <Form className="form ui" >
                        <EntrySelectField
                            label="Entry type"
                            name="type"
                            options={entryOptions}
                            onChange={(e) => setEntryType(e)}
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

export default AddEntryForm;