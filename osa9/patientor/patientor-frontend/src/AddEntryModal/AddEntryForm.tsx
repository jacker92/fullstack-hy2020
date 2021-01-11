import React, { useState } from "react";
import { useStateValue } from "../state";
import { Field, Form, Formik } from "formik";
import { DiagnosisSelection, EntryOption, EntrySelectField, TextField } from "../AddPatientModal/FormField";
import { Button } from "semantic-ui-react";
import { Diagnose, DischargeDetails, SickLeaveDetails } from "../types";
import { EntrySpecificForms } from "./EntrySpecificForms";

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

const validate = (values: EntryFormValues) => {
    const requiredError = "Field is required";
    const invalidFormatError = "Field is not in correct format";
    const errors: { [field: string]: string } = {};

    if (!values.date) {
        errors.date = requiredError;
    }
    if (values.date.length !== 10) {
        errors.date = invalidFormatError;
    }
    if (!values.specialist) {
        errors.specialist = requiredError;
    }
    if (!values.description) {
        errors.description = requiredError;
    }
    if (!values.diagnosisCodes || values.diagnosisCodes.length === 0) {
        errors.diagnosisCodes = requiredError;
    }
    if (!values.type) {
        errors.type = requiredError;
    }

    switch (values.type) {
        case "Hospital":
            if (!values.discharge.date ||
                !values.discharge.criteria) {
                errors.discharge = requiredError;
            }
            if (values.discharge.date.length !== 10) {
                errors.discharge = invalidFormatError;
            }
            break;
        case "OccupationalHealthcare":
            if (!values.employerName) {
                errors.employerName = requiredError;
            }
            if (!values.sickLeave.startDate ||
                !values.sickLeave.endDate) {
                errors.sickLeave = requiredError;
            }
            if (values.sickLeave.startDate.length !== 10 ||
                values.sickLeave.endDate.length !== 10) {
                errors.sickLeave = invalidFormatError;
            }
            break;
        case "HealthCheck":
            if (!values.healthCheckRating) {
                errors.healthCheckRating = requiredError;
            }
            if (isNaN(Number(values.healthCheckRating))) {
                errors.healthCheckRating = invalidFormatError;
            }
            break;
        default:
            errors.type = "Invalid type";
    }
    return errors;
};
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
                return validate(values);
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


export default AddEntryForm;