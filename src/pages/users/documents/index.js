/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Paper, makeStyles, Grid, Button, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useDispatch, connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import MaterialTable from "material-table";
import tableIcons from "components/shared/tableIcons";
import Modal from "@material-ui/core/Modal";

import UploadFile from "components/shared/upload/uploadFile";
import { setUploadedImageURL } from "redux/actions/common";
import { fetchAllHealthTopics } from "apiRequests/common";
import {
  fetchAllProfiles,
  createDoc,
  fetchAllProfilesAndDocuments,
} from "apiRequests/user";

const useStyles = makeStyles((theme) => ({
  pageContent: {
    marginTop: "3rem",
    margin: theme.spacing(3),
    padding: theme.spacing(3),
  },
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  button_yes: {
    backgroundColor: "#ed5e68",
    color: "#fff",
  },
  button_no: {
    backgroundColor: "#8388a4",
    marginLeft: "1rem",
    color: "#fff",
  },
}));

const getModalStyle = () => {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
};

const Documents = ({
  fetchAllHealthTopics,
  healthTopics,
  uploadedLink,
  profiles,
  createDoc,
  fetchAllProfilesAndDocuments,
  documents,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [row, setRow] = useState([]);
  const [document, setDocument] = useState("");
  const [showSuggested, setShowSuggested] = useState(false);
  const [selectedHealthTopic, setSelectedHealthTopic] = useState("");
  const [selectedProfile, setSelectedProfile] = useState("");
  const [suggestedTopic, setSuggestedTopic] = useState("");
  const [showUploadError, setShowUploadError] = useState(false);
  const history = useHistory();
  const [error, setError] = useState({
    document: {
      status: false,
      text: "",
    },
  });
  const [open, setOpen] = useState(false);
  const modalStyle = getModalStyle();
  const [shareData, setSharedata] = useState([]);
  useEffect(() => {
    fetchAllHealthTopics();
    fetchAllProfilesAndDocuments();
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

  useEffect(() => {
    const documentList = documents.map((document) => {
      profiles.forEach((profile) => {
        if (profile.profileId === document.profileId) {
          document.profileName = profile.profileName;
        }
      });
      healthTopics.forEach((topic) => {
        if (document.healthTopicId === topic.healthTopicId) {
          document.healthTopicTitle = topic.title;
        }
      });
      return document;
    });
    setRow(documentList);
  }, [documents]);

  const handleChange = (e) => {
    if (e.target.name === "topic") {
      if (e.target.value === "none") {
        setShowSuggested(true);
      } else {
        setShowSuggested(false);
        setSelectedHealthTopic(e.target.value);
      }
    }
    if (e.target.name === "document_name") {
      setDocument(e.target.value);
      if (e.target.value.length > 0) {
        setError({
          ...error,
          document: {
            status: false,
            text: "",
          },
        });
      }
    }
    if (e.target.name === "suggestion_name") {
      setSuggestedTopic(e.target.value);
    }
    if (e.target.name === "profile") {
      setSelectedProfile(e.target.value);
    }
  };

  const clickCreate = () => {
    setShowUploadError(true);

    if (document.trim() === "" || uploadedLink.length <= 0) {
      if (document.length <= 0) {
        setError({
          ...error,
          document: {
            status: true,
            text: "Should not be empty",
          },
        });
      }
    } else {
      const documentData = {
        name: document,
        link: uploadedLink,
        healthTopicId: selectedHealthTopic,
        profileId: selectedProfile,
      };
      createDoc(documentData);
      setSelectedProfile(profiles[0].profileId);
      setSelectedHealthTopic(healthTopics[0].healthTopicId);
      dispatch(setUploadedImageURL(""));
      setDocument("");
      setShowUploadError(false);
      setError({
        document: {
          status: false,
          text: "",
        },
      });
    }
  };
  const columns = [
    {
      title: "Doument name",
      field: "name",
    },
    {
      title: "Profile name",
      field: "profileName",
    },
    {
      title: "Health topic",
      field: "healthTopicTitle",
    },
    {
      title: "Shared list",
      field: "sharedList",
      // eslint-disable-next-line react/display-name
      render: (rowData) => {
        if (rowData.sharedList.length > 0) {
          return <p>{rowData.sharedList.join(",")}</p>;
        }
        return <p>None</p>;
      },
    },
  ];
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = () => {
    if (shareData.length > 0) {
      return (
        <div style={modalStyle} className={classes.paper}>
          <h2 id="simple-modal-documents">Sharing documnt</h2>
          <p id="simple-modal-description-documents">
            You are sharing {shareData.length} documents, please give the email
            id below
          </p>
          <div>
            <TextField
              id="email"
              name="email"
              label="Outlined"
              variant="outlined"
            />
          </div>
          <div>
            <Button
              variant="contained"
              className={classes.button_yes}
              // onClick={clickedYes}
            >
              Share
            </Button>
            <Button
              variant="contained"
              className={classes.button_no}
              // onClick={handleClose}
            >
              Cancel
            </Button>
          </div>
        </div>
      );
    }
    return <div>none</div>;
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
            {showUploadError &&
              (!uploadedLink.length ? (
                <Typography variant="subtitle2" color="error">
                  please upload a document
                </Typography>
              ) : (
                ""
              ))}
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
              error={error.document.status}
              onChange={handleChange}
              value={document}
              helperText={error.document.text}
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
      <Paper className={classes.pageContent}>
        <Grid container>
          <Grid item xs={12} md={12} lg={12} xl={12}>
            <MaterialTable
              title="Documents list"
              icons={tableIcons}
              columns={columns}
              data={row}
              options={{
                selection: true,
              }}
              actions={[
                {
                  tooltip: "Share All Selected documents",
                  icon: tableIcons.ShareIcon,
                  onClick: (evt, data) => {
                    handleOpen();
                    setSharedata(data);
                  },
                },
                {
                  tooltip: "Remove All Selected documents",
                  icon: tableIcons.Delete,
                  onClick: (evt, data) =>
                    alert("You want to delete " + data.length + " rows"),
                },
                // (rowData) => ({
                //   icon: tableIcons.Delete,
                //   tooltip: "Revoke permission",
                //   onClick: (event, rowData) =>
                //     confirm("You want to delete " + rowData.name),
                //   disabled: 4 < 3,
                // }),
              ]}
            />
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="simple-modal-documents"
              aria-describedby="simple-modal-description-documents"
            >
              {body()}
            </Modal>
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
  documents: state.user.documents,
});
const mapDispatchToProps = (dispatch) => ({
  fetchAllHealthTopics: () => dispatch(fetchAllHealthTopics()),
  fetchAllProfiles: () => dispatch(fetchAllProfiles()),
  createDoc: (doc) => dispatch(createDoc(doc)),
  fetchAllProfilesAndDocuments: () => dispatch(fetchAllProfilesAndDocuments()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Documents);
