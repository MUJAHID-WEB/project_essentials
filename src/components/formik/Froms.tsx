import {
  Button,
  Card,
  CardContent,
  Checkbox,
  CheckboxProps,
  FormControl,
  FormControlLabel,
  FormGroup,
  MenuItem,
  TextField,
  Typography,
  FormLabel,
  Radio,
  RadioGroup,
  TextareaAutosize,
} from "@mui/material";
import { ErrorMessage, Field, Form, Formik, useField } from "formik";
import React from "react";
import { array, boolean, mixed, number, object, string } from "yup";
import * as Yup from "yup";

function Froms() {
  const validationSchema = Yup.object().shape({
    fullName: string().required("Your name is required!!!").min(2).max(100),
    initialInvesment: number().required().min(1),

    invesmentRisk: array(string().oneOf(["High", "Medium", "Low"])).min(1),

    commentAboutInvementRisk: mixed().when(
      "invesmentRisk",
      (invesmentRisk, schema) => {
        return invesmentRisk && invesmentRisk.includes("High")
          ? schema.required()
          : schema.nullable().notRequired();
      },
    ),
    gender: string().oneOf(["Female", "Male", "Other"]).required(),
    otherGernder: mixed().when("gender", (gender, schema) => {
      return gender && gender.includes("Other")
        ? schema.required()
        : schema.nullable().notRequired();
    }),
    // otherGender: mixed().when("gender", {
    //   is: "Other",
    //   then: string().required().min(2).max(100),
    //   otherwise: string().nullable().notRequired(),
    // }),
    dependents: number().required().min(0).max(5),
    acceptTnC: boolean().oneOf([true]),
    reason: string().oneOf([
      "Not using the app",
      "Inconvenient to use due to errors",
      "Difficult to use",
      "Direct input",
    ]),
    reasonText: mixed().when("gender", (gender, schema) => {
      return gender && gender.includes("Other")
        ? schema.required()
        : schema.nullable().notRequired();
    }),
  });
  return (
    <div className="flex flex-col justify-start ">
      <Card>
        <CardContent>
          <Typography> New Account</Typography>

          <Formik
            validationSchema={validationSchema}
            initialValues={{
              reason: "",
              reasonText: "",
              fullName: "",
              initialInvesment: 0,
              invesmentRisk: [],
              commentAboutInvementRisk: "",
              gender: "",
              otherGernder: "",
              dependents: -1,
              acceptTnC: false,
            }}
            onSubmit={(values, FormikHelpers) => {
              console.log(values);
              console.log(FormikHelpers);
              console.log(values);
            }}
          >
            {({ values, errors }) => (
              <Form>
                <div className="flex flex-col justify-start gap-3">
                  <FormControl>
                    
                    <Field as={RadioGroup} name="reason">
                      <FormControlLabel
                        value="Not using the app"
                        control={<Radio />}
                        label="user_withdrawal_reason_1"
                      />

                      <FormControlLabel
                        value="Inconvenient to use due to errors"
                        control={<Radio />}
                        label="user_withdrawal_reason_2"
                      />

                      <FormControlLabel
                        value="Difficult to use"
                        control={<Radio />}
                        label="user_withdrawal_reason_3"
                      />

                      <FormControlLabel
                        value="Direct input"
                        control={<Radio />}
                        label="user_withdrawal_direct_input"
                      />
                    </Field>
                    <ErrorMessage name="reason" />
                  </FormControl>
                  <FormGroup>
                    <Field
                      name="reasonText"
                      as={TextareaAutosize}
                      minRows={3}
                      disabled={values.reason !== "Direct input"}
                    />
                    <ErrorMessage name="reasonText" />
                  </FormGroup>

                  <FormGroup>
                    <Field
                      name="fullName"
                      placeholder="Full Name"
                      as={TextField}
                      label="Full Name"
                      variant="standard"
                    />
                    <ErrorMessage name="fullName" />
                  </FormGroup>

                  <FormGroup>
                    <Field
                      name="initialInvesment"
                      type="number"
                      as={TextField}
                      label="Initial Invesment"
                      variant="standard"
                      placeholder="Initial Invesment"
                    />
                    <ErrorMessage name="initialInvesment" />
                  </FormGroup>

                  <FormGroup>
                    <MyCheckbox
                      name="invesmentRisk"
                      value="High"
                      label="High"
                    />
                    <MyCheckbox
                      name="invesmentRisk"
                      value="Medium"
                      label="Medium"
                    />
                    <MyCheckbox name="invesmentRisk" value="Low" label="Low" />
                  </FormGroup>
                  <ErrorMessage name="invesmentRisk" />

                  <FormGroup>
                    <Field
                      name="commentAboutInvementRisk"
                      as={TextField}
                      multiline
                      rows={3}
                      rowsMax={10}
                    />
                    <ErrorMessage name="commentAboutInvementRisk" />
                  </FormGroup>

                  <FormControl>
                    <FormLabel component="legend">Gender</FormLabel>
                    <Field as={RadioGroup} name="gender">
                      <FormControlLabel
                        value="Female"
                        control={<Radio />}
                        label="Female"
                      />
                      <FormControlLabel
                        value="Male"
                        control={<Radio />}
                        label="Male"
                      />
                      <FormControlLabel
                        value="Other"
                        control={<Radio />}
                        label="Other"
                      />
                    </Field>
                    <ErrorMessage name="gender" />
                  </FormControl>

                  <FormGroup>
                    <Field
                      name="otherGernder"
                      as={TextField}
                      multiline
                      rows={3}
                      rowsMax={10}
                      disabled={values.gender !== "Other"}
                    />
                    <ErrorMessage name="otherGernder" />
                  </FormGroup>

                  <FormGroup>
                    <Field
                      name="dependents"
                      value=""
                      type=""
                      as={TextField}
                      select
                    >
                      <MenuItem value={-1}>Select...</MenuItem>
                      <MenuItem value={0}>0</MenuItem>
                      <MenuItem value={1}>1</MenuItem>
                      <MenuItem value={2}>2</MenuItem>
                      <MenuItem value={3}>3</MenuItem>
                      <MenuItem value={4}>4</MenuItem>
                      <MenuItem value={5}>5</MenuItem>
                    </Field>
                    <ErrorMessage name="dependents" />
                  </FormGroup>

                  <FormGroup>
                    <MyCheckbox name="acceptTnC" label="Accept T & C" />
                    <ErrorMessage name="acceptTnC" />
                  </FormGroup>

                  <Button variant="outlined" type="submit">
                    Submit
                  </Button>
                </div>

                <pre>{JSON.stringify(errors, null, 4)}</pre>
                <pre>{JSON.stringify(values, null, 4)}</pre>
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </div>
  );
}

export default Froms;

export interface MyCheckboxProps extends CheckboxProps {
  name: string;
  value?: string | number;
  label?: string;
}

export function MyCheckbox(props: MyCheckboxProps) {
  const [field] = useField({
    name: props.name,
    type: "checkbox",
    value: props.value,
  });
  return (
    <FormControlLabel
      control={<Checkbox {...props} {...field} />}
      label={props.label}
    />
  );
}
