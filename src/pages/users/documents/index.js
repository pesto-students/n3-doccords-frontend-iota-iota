/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Paper, makeStyles, Grid, Button, Typography } from "@material-ui/core";
import { useDispatch, connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

import UploadFile from "components/shared/upload/uploadFile";
import { setUploadedImageURL } from "redux/actions/common";
import { fetchAllHealthTopics } from "apiRequests/common";
import { fetchAllProfiles, createDoc } from "apiRequests/user";

const useStyles = makeStyles((theme) => ({
  pageContent: {
    marginTop: "3rem",
    margin: theme.spacing(3),
    padding: theme.spacing(3),
  },
}));
const Documents = ({
  fetchAllHealthTopics,
  healthTopics,
  uploadedLink,
  profiles,
  fetchAllProfiles,
  createDoc,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [document, setDocument] = useState("");
  const [showSuggested, setShowSuggested] = useState(false);
  const [selectedHealthTopic, setSelectedHealthTopic] = useState("");
  const [selectedProfile, setSelectedProfile] = useState("");
  const [suggestedTopic, setSuggestedTopic] = useState("");
  useEffect(() => {
    fetchAllHealthTopics();
    fetchAllProfiles();
  }, []);
  useEffect(() => {
    if (healthTopics.length > 0) {
      setSelectedHealthTopic(healthTopics[0].healthTopicId);
    }
  }, [healthTopics]);
  useEffect(() => {
    if (profiles.length > 0) {
      setSelectedProfile(profiles[0].profileId);
    }
  }, [profiles]);
  const handleChange = (e) => {
    if (e.target.name === "topic") {
      if (e.target.value === "none") {
        setShowSuggested(true);
      } else {
        setShowSuggested(false);
      }
    }
    if (e.target.name === "document_name") {
      setDocument(e.target.value);
    }
    if (e.target.name === "suggestion_name") {
      setSuggestedTopic(e.target.value);
    }
    if (e.target.name === "profile") {
      setSelectedProfile(e.target.value);
    }
  };

  const clickCreate = () => {
    const documentData = {
      name: document,
      link: uploadedLink,
      healthTopicId: selectedHealthTopic,
      profileId: selectedProfile,
    };
    createDoc(documentData);
  };

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
        <Typography variant="h5">Add a Document</Typography>
        <Grid container>
          <Grid item xs={12} md={6} lg={4} xl={4}>
            <UploadFile />
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            lg={8}
            xl={8}
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <FormControl variant="outlined" style={{ marginTop: "1rem" }}>
              <InputLabel id="simple-select-outlined-label">
                Select profile
              </InputLabel>
              <Select
                labelId="simple-select-outlined-label"
                // id="topic"
                inputProps={{
                  name: "profile",
                  id: "profile",
                }}
                value={selectedProfile}
                onChange={handleChange}
                label="Profile"
              >
                {profiles.map((profile) => (
                  <MenuItem key={profile.profileId} value={profile.profileId}>
                    {profile.profileName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              name="document_name"
              label="Document name"
              error={false}
              onChange={handleChange}
              value={document}
              // helperText="Some important text"
              variant="outlined"
              style={{ marginTop: "1rem" }}
            />
            <FormControl variant="outlined" style={{ marginTop: "1rem" }}>
              <InputLabel id="simple-select-outlined-label">
                Related health topic
              </InputLabel>
              <Select
                labelId="simple-select-outlined-label"
                // id="topic"
                inputProps={{
                  name: "topic",
                  id: "topic",
                }}
                value={selectedHealthTopic}
                onChange={handleChange}
                label="Health topic"
              >
                {healthTopics.map((topic) => (
                  <MenuItem
                    key={topic.healthTopicId}
                    value={topic.healthTopicId}
                  >
                    {topic.title}
                  </MenuItem>
                ))}
                <MenuItem value="none">
                  <em>None of above</em>
                </MenuItem>
              </Select>
            </FormControl>
            {showSuggested && (
              <TextField
                name="suggestion_name"
                label="Suggest health topic related to the above document"
                error={false}
                value={suggestedTopic}
                // helperText="Some important text"
                variant="outlined"
                style={{ marginTop: "1rem" }}
                onChange={handleChange}
              />
            )}
            <Button
              variant="contained"
              color="primary"
              style={{
                color: "#ffffff",
                textTransform: "none",
                width: "fit-content",
                margin: "1rem auto",
              }}
              onClick={clickCreate}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

Documents.propTypes = {
  fetchAllHealthTopics: PropTypes.func,
};

const mapStateToProps = (state) => ({
  healthTopics: state.common.healthTopics,
  profiles: state.user.profiles,
  uploadedLink: state.common.uploadedLink,
});
const mapDispatchToProps = (dispatch) => ({
  fetchAllHealthTopics: () => dispatch(fetchAllHealthTopics()),
  fetchAllProfiles: () => dispatch(fetchAllProfiles()),
  createDoc: (doc) => dispatch(createDoc(doc)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Documents);
