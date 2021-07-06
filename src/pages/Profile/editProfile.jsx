import React from "react";
import { Paper, makeStyles, Grid, Typography } from "@material-ui/core";
import Controls from "../../components/Form/controls/Controls";
import { useForm, Form } from "../../components/Form/useForm";

const genderItems = [
  { id: "male", title: "Male" },
  { id: "female", title: "Female" },
  { id: "other", title: "Other" },
];

const getRelationshipCollection = () => [
  { id: "1", title: "Self" },
  { id: "2", title: "Spouse" },
  { id: "3", title: "Father" },
  { id: "4", title: "Mother" },
  { id: "5", title: "Brother" },
  { id: "6", title: "Sister" },
  { id: "7", title: "Child" },
];

const initialFValues = {
  id: 0,
  fullName: "Ramlal",
  email: "ramlal@gmail.com",
  mobile: "9876543210",
  age: "53",
  gender: "male",
  relationship: "Father",
  // creationDate: new Date(),
  cancer: false,
  bloodPressure: true,
  sugar: true,
  covid: false,
};

const useStyles = makeStyles((theme) => ({
  pageContent: {
    marginTop: "10vh",
    margin: theme.spacing(3),
    padding: theme.spacing(3),
  },
}));

const EditProfile = (props) => {
  // const { initialFValues } = props;
  const classes = useStyles();

  const validate = (fieldValues = values) => {
    const temp = { ...errors };
    if ("fullName" in fieldValues)
      temp.fullName = fieldValues.fullName ? "" : "This field is required.";
    if ("email" in fieldValues)
      temp.email = /$^|.+@.+..+/.test(fieldValues.email)
        ? ""
        : "Email is not valid.";
    // if ("mobile" in fieldValues)
    //   temp.mobile =
    //     fieldValues.mobile.length > 9 ? "" : "Minimum 10 numbers required.";
    if ("relationship" in fieldValues)
      temp.relationship =
        fieldValues.relationship !== null ? "" : "This field is required.";
    setErrors({
      ...temp,
    });

    if (fieldValues === values)
      return Object.values(temp).every((x) => x === "");
  };

  // const { values, setValues, errors, setErrors, handleInputChange, resetForm }
  const { values, errors, setErrors, handleInputChange, resetForm } = useForm(
    initialFValues,
    true,
    validate
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // Save data to backend and in local storge also
      console.log(values);
      resetForm();
    }
  };

  return (
    <Paper className={classes.pageContent}>
      <Form onSubmit={handleSubmit}>
        <Grid container>
          <Grid item xs={12} md={6}>
            <Controls.Input
              name="fullName"
              label="Full Name"
              value={values.fullName}
              onChange={handleInputChange}
              error={errors.fullName}
            />
            <Controls.Select
              name="relationship"
              label="Relationship"
              value={values.relationship}
              onChange={handleInputChange}
              options={getRelationshipCollection()}
              error={errors.relationship}
            />
            <Controls.Input
              label="Email"
              name="email"
              value={values.email}
              onChange={handleInputChange}
              error={errors.email}
            />
            <Controls.Input
              label="Mobile"
              name="mobile"
              value={values.mobile}
              onChange={handleInputChange}
              error={errors.mobile}
            />
            <Controls.Input
              name="age"
              label="Age"
              value={values.age}
              onChange={handleInputChange}
              error={errors.age}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Controls.RadioGroup
              name="gender"
              label="Gender"
              value={values.gender}
              onChange={handleInputChange}
              items={genderItems}
            />
            <Typography variant="subtitle1">Any Health Issues</Typography>
            <Grid>
              <Grid item xs={6} sm={3}>
                <Controls.Checkbox
                  name="cancer"
                  label="Cancer"
                  value={values.cancer}
                  onChange={handleInputChange}
                />
                <Controls.Checkbox
                  name="sugar"
                  label="Sugar"
                  value={values.sugar}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={6} sm={3}>
                <Controls.Checkbox
                  name="bloodPressure"
                  label="BloodPressure"
                  value={values.bloodPressure}
                  onChange={handleInputChange}
                />
                <Controls.Checkbox
                  name="covid"
                  label="Covid"
                  value={values.covid}
                  onChange={handleInputChange}
                />
              </Grid>
            </Grid>

            <div>
              <Controls.Button type="submit" text="Update" />
              {/* <Controls.Button
                text="Reset"
                color="default"
                onClick={resetForm}
              /> */}
            </div>
          </Grid>
        </Grid>
      </Form>
    </Paper>
  );
};

export default EditProfile;
