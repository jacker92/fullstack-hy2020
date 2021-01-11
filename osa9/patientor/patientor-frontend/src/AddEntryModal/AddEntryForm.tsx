import React from "react";
import { useStateValue } from "../state";
import { Field, Form, Formik } from "formik";
import { Entry } from "../types";
import { DiagnosisSelection, EntryOption, EntrySelectField, TextField } from "../AddPatientModal/FormField";
import { Button } from "semantic-ui-react";

export type EntryFormValues = Omit<Entry, "id">;

interface Props {
    onSubmit: (values: EntryFormValues) => void;
    onCancel: () => void;
}

const entryOptions: EntryOption[] = [
    { value: "OccupationalHealthcare", label: "Occupational HealthCareEntry" },
    { value: "Hospital", label: "HospitalEntry" },
    { value: "HealthCheck", label: "HealthCheck Entry" }
];
const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
    const [{ diagnoses }] = useStateValue();

    return (
        <Formik
            initialValues={{
                type: "Hospital",
                date: "",
                specialist: "",
                description: ""
            }
            }
            onSubmit={onSubmit}
            validate={values => {
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
                return errors;
            }}
        >
            {({ isValid, dirty, setFieldValue, setFieldTouched }) => {

                return (
                    <Form className="form ui" >
                        <EntrySelectField
                            label="Entry type"
                            name="entrytype"
                            options={entryOptions}
                        />
                        <DiagnosisSelection
                            setFieldValue={setFieldValue}
                            setFieldTouched={setFieldTouched}
                            diagnoses={Object.values(diagnoses)}
                        />
                        <Field
                            label="Date"
                            placeholder="Date"
                            name="Date"
                            component={TextField}
                        />
                        <Field
                            label="Specialist"
                            placeholder="Specialist"
                            name="Specialist"
                            component={TextField}
                        />
                        <Field
                            label="Description"
                            placeholder="Description"
                            name="Description"
                            component={TextField}
                        />
                        <Button type="button" onClick={onCancel} color="red">
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            floated="right"
                            color="green"
                            disabled={!dirty || !isValid}
                        >
                            Add
                       </Button>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default AddEntryForm;