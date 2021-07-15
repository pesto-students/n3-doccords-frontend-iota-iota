/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect, useSelector, useDispatch } from "react-redux";
import { Paper, makeStyles, Grid, Typography, Button } from "@material-ui/core";
import Controls from "../../../components/Form/controls/Controls";
import { Form } from "../../../components/Form/useForm";
import { fetchAllHealthTopics } from "apiRequests/common";
import { createNewProfile, updateProfile } from "apiRequests/user";
import { useHistory, useLocation } from "react-router-dom";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import UploadAvatar from "components/shared/upload/uploadAvatar";

import { setUploadedImageURL } from "redux/actions/common";

const genderItems = [
  { id: "male", title: "Male" },
  { id: "female", title: "Female" },
  { id: "other", title: "Other" },
];

const getRelationshipCollection = () => [
  { id: 1, title: "Self" },
  { id: 2, title: "Spouse" },
  { id: 3, title: "Father" },
  { id: 4, title: "Mother" },
  { id: 5, title: "Brother" },
  { id: 6, title: "Sister" },
  { id: 7, title: "Child" },
  { id: 8, title: "Others" },
];

const useStyles = makeStyles((theme) => ({
  pageContent: {
    marginTop: "3rem",
    margin: theme.spacing(3),
    padding: theme.spacing(3),
  },
}));

const CreateProfile = ({
  fetchAllHealthTopics,
  healthTopics,
  createNewProfile,
  updateProfile,
}) => {
  const [profileId, setProfileId] = useState("");
  const [profileName, setProfileName] = useState("");
  const [relationshipId, setRelationshipId] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [errors, setErrors] = useState({
    profileName: {
      status: false,
      text: "",
    },
  });
  const uploadedLink = useSelector((state) => state.common.uploadedLink);
  const [healthTopicsList, setHealthTopicsList] = useState([]);
  const [knownIssues, setKnownIssues] = useState([]);
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    fetchAllHealthTopics();
    if (location.state) {
      const {
        profileId,
        profileName,
        relationshipId,
        email,
        phone,
        age,
        gender,
        picture,
      } = location.state;
      console.log("<<Inside", relationshipId.toString());
      setProfileId(profileId);
      setProfileName(profileName);
      setRelationshipId(relationshipId.toString());
      setEmail(email);
      setPhone(phone);
      setAge(age);
      setGender(gender);
      dispatch(setUploadedImageURL(picture));
    } else {
      setGender(genderItems[0].id);
      setRelationshipId(getRelationshipCollection()[0].id);
    }
  }, []);

  const generateHealthTopics = (topics) => {
    const healthTopicsArr = topics.map((topic) => ({
      id: topic.healthTopicId,
      title: topic.title,
    }));
    return healthTopicsArr;
  };
  // useEffect(() => {
  //   fetchAllHealthTopics();
  //   setGender(genderItems[0].id);
  //   setRelationshipId(getRelationshipCollection()[0].id);
  // }, []);
  useEffect(() => {
    if (healthTopics.length > 0) {
      setHealthTopicsList(generateHealthTopics(healthTopics));
    }
    if (healthTopics.length > 0 && location.state) {
      const { knownIssues } = location.state;
      const knownIssuesList = knownIssues.map((issue) => {
        let topicData = {};
        healthTopics.forEach((topic) => {
          if (topic.healthTopicId === issue) {
            topicData = topic;
          }
        });
        return topicData;
      });
      setKnownIssues(generateHealthTopics(knownIssuesList));
    }
  }, [healthTopics]);

  const onSubmit = () => {
    if (profileName.trim() === "") {
      setErrors({
        profileName: {
          status: true,
          text: "Please enter name",
        },
      });
    } else {
      const knownIssueIds = knownIssues.map((issue) => issue.id);
      if (profileId.length > 0) {
        updateProfile(
          {
            profileId,
            picture: uploadedLink,
            relationshipId,
            profileName,
            age,
            email,
            phone,
            gender,
            knownIssues: knownIssueIds,
          },
          history
        );
      } else {
        createNewProfile(
          {
            picture: uploadedLink,
            relationshipId,
            profileName,
            age,
            email,
            phone,
            gender,
            knownIssues: knownIssueIds,
          },
          history
        );
      }
    }
  };

  const handleInputChange = (e) => {
    if (e.target.name === "relationship") {
      setRelationshipId(e.target.value);
    }
    if (e.target.name === "profileName") {
      setProfileName(e.target.value);
      if (e.target.value.length > 0) {
        setErrors({
          ...errors,
          profileName: {
            status: false,
            text: "",
          },
        });
      }
    }
    if (e.target.name === "email") {
      setEmail(e.target.value);
    }
    if (e.target.name === "phone") {
      setPhone(e.target.value);
    }
    if (e.target.name === "age") {
      setAge(e.target.value);
    }
    if (e.target.name === "gender") {
      setGender(e.target.value);
    }
  };
  console.log("<<<Relation>>", relationshipId);
  return (
    <>
      <Button
        variant="contained"
        color="secondary"
        style={{
          color: "#ffffff",
          textTransform: "none",
          width: "fit-content",
          margin: "1rem 1.5rem",
        }}
        onClick={() => {
          history.goBack();
          dispatch(setUploadedImageURL(""));
        }}
      >
        Go back
      </Button>
      <Paper className={classes.pageContent}>
        <Grid container>
          <Grid
            item
            xs={12}
            md={12}
            lg={12}
            xl={12}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <UploadAvatar />
          </Grid>
        </Grid>
      </Paper>

      <Paper className={classes.pageContent}>
        <Form>
          <Grid container>
            <Grid item xs={12} md={6}>
              <Controls.Input
                name="profileName"
                label="Profile name *"
                value={profileName}
                onChange={handleInputChange}
                error={errors.profileName.status}
                helperText={errors.profileName.text}
              />
              <Controls.Select
                name="relationship"
                label="Relationship"
                value={relationshipId}
                onChange={handleInputChange}
                options={getRelationshipCollection()}
              />
              <Controls.Input
                label="Email"
                name="email"
                value={email}
                onChange={handleInputChange}
              />
              <Controls.Input
                label="Phone"
                name="phone"
                value={phone}
                onChange={handleInputChange}
              />
              <Controls.Input
                name="age"
                label="Age"
                value={age}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
              }}
            >
              <Controls.RadioGroup
                name="gender"
                label="Gender"
                value={gender}
                onChange={handleInputChange}
                items={genderItems}
              />
              <div className={classes.root}>
                <Typography variant="subtitle1">
                  Any known health issue
                </Typography>
                <Autocomplete
                  multiple
                  limitTags={2}
                  id="multiple-limit-tags"
                  options={healthTopicsList}
                  getOptionLabel={(option) => option.title}
                  defaultValue={knownIssues}
                  value={knownIssues}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="Health issues"
                      placeholder="Health issues"
                    />
                  )}
                  onChange={(event, value) => {
                    setKnownIssues(value);
                  }}
                />
              </div>

              <Controls.Button
                style={{ display: "block", margin: "0 auto" }}
                onClick={onSubmit}
                text={profileId ? "Update" : "Create"}
              />
            </Grid>
          </Grid>
        </Form>
      </Paper>
    </>
  );
};

CreateProfile.propTypes = {
  fetchAllHealthTopics: PropTypes.func,
  createNewProfile: PropTypes.func,
  updateProfile: PropTypes.func,
  healthTopics: PropTypes.array,
};

const mapStateToProps = (state) => ({
  healthTopics: state.common.healthTopics,
});
const mapDispatchToProps = (dispatch) => ({
  fetchAllHealthTopics: () => dispatch(fetchAllHealthTopics()),
  createNewProfile: (data, history) =>
    dispatch(createNewProfile(data, history)),
  updateProfile: (data, history) => dispatch(updateProfile(data, history)),
});
export default connect(mapStateToProps, mapDispatchToProps)(CreateProfile);
