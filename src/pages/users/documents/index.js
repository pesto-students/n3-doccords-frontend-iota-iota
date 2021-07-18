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
import Autocomplete from "@material-ui/lab/Autocomplete";

import UploadFile from "components/shared/upload/uploadFile";
import { setUploadedImageURL } from "redux/actions/common";
import { fetchAllHealthTopics } from "apiRequests/common";
import {
  fetchAllProfiles,
  createDoc,
  fetchAllProfilesAndDocuments,
  shareDocument,
  updateDocAccess,
  deleteDocuments,
} from "apiRequests/user";
import { validateEmail } from "Utils/validations";

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
  shareDocument,
  updateDocAccess,
  deleteDocuments,
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
  const [emailError, setEmailError] = useState({
    status: false,
    text: "",
  });
  const [open, setOpen] = useState(false);
  const modalStyle = getModalStyle();
  const [selectedData, setSelectedData] = useState([]);
  const [modalType, setModalType] = useState("");
  const [email, setEmail] = useState([]);
  const [revokeData, setRevokeData] = useState({});
  const [sharedList, setSharedList] = useState({
    documentId: "",
    sharedList: [],
  });
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
        setSelectedHealthTopic(e.target.value);
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
    if (e.target.name === "email") {
      setEmail(e.target.value);
      if (e.target.value.length > 0) {
        setEmailError({
          status: false,
          text: "",
        });
      }
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
        suggestedTopic,
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
          return rowData.sharedList.map((single, index) => (
            <p key={index}>{single}</p>
          ));
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
  const onRevokeShareClick = () => {
    updateDocAccess(sharedList);
    handleClose();
    setRevokeData({});
    setSharedList({
      documentId: "",
      sharedList: [],
    });
  };
  const handleRevokeClose = () => {
    handleClose();
    setRevokeData({});
    setSharedList({
      documentId: "",
      sharedList: [],
    });
  };
  const onShareClick = () => {
    if (email.length > 0 && validateEmail(email)) {
      const documentIds = selectedData.map((document) => document.documentId);
      shareDocument({ documentIds, email, type: "add" });
      handleClose();
      setSelectedData([]);
    } else {
      if (email.length > 0) {
        if (!validateEmail(email)) {
          setEmailError({
            status: true,
            text: "please enter valid email",
          });
        }
      } else {
        setEmailError({
          status: true,
          text: "please enter email address",
        });
      }
    }
  };
  const onDeleteClick = () => {
    const documentIds = selectedData.map((document) => document.documentId);
    deleteDocuments(documentIds);
    handleClose();
    setSelectedData([]);
    setModalType("");
  };
  const body = () => {
    if (selectedData.length > 0 && modalType === "share") {
      return (
        <div style={modalStyle} className={classes.paper}>
          <h2 id="simple-modal-documents">Sharing document</h2>
          <p id="simple-modal-description-documents">
            You are sharing {selectedData.length} documents, please give the
            email id below
          </p>
          <div>
            <TextField
              style={{ marginTop: "1rem" }}
              id="email"
              name="email"
              label="Email*"
              variant="outlined"
              onChange={handleChange}
              value={email}
              error={emailError.status}
              helperText={emailError.text}
            />
          </div>
          <div style={{ marginTop: "2rem" }}>
            <Button
              variant="contained"
              className={classes.button_yes}
              onClick={onShareClick}
            >
              Share
            </Button>
            <Button
              variant="contained"
              className={classes.button_no}
              onClick={handleClose}
            >
              Cancel
            </Button>
          </div>
        </div>
      );
    }
    if (selectedData.length > 0 && modalType === "delete") {
      return (
        <div style={modalStyle} className={classes.paper}>
          <h2 id="simple-modal-documents">Delete document</h2>
          <p id="simple-modal-description-documents">
            Are you sure you want to delete {selectedData.length} documents ?
          </p>

          <div style={{ marginTop: "2rem" }}>
            <Button
              variant="contained"
              className={classes.button_yes}
              onClick={onDeleteClick}
            >
              Delete
            </Button>
            <Button
              variant="contained"
              className={classes.button_no}
              onClick={handleClose}
            >
              Cancel
            </Button>
          </div>
        </div>
      );
    }
    if (
      !(
        Object.keys(revokeData).length === 0 &&
        revokeData.constructor === Object &&
        modalType === "revoke"
      )
    ) {
      return (
        <div style={modalStyle} className={classes.paper}>
          <h2 id="simple-modal-documents">Revoking the access</h2>

          <div className={classes.root}>
            <Autocomplete
              multiple
              limitTags={2}
              id="multiple-revoke-tags"
              options={revokeData.sharedList}
              getOptionLabel={(option) => option}
              defaultValue={revokeData.sharedList}
              value={sharedList.sharedList}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Shared List"
                  placeholder="Shared List"
                />
              )}
              onChange={(event, value) => {
                setSharedList({
                  ...sharedList,
                  sharedList: value,
                });
              }}
            />
          </div>
          <div style={{ marginTop: "2rem" }}>
            <Button
              variant="contained"
              className={classes.button_yes}
              onClick={onRevokeShareClick}
            >
              Revoke access
            </Button>
            <Button
              variant="contained"
              className={classes.button_no}
              onClick={handleRevokeClose}
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
                actionsColumnIndex: -1,
              }}
              actions={[
                {
                  tooltip: "Share All Selected documents",
                  icon: tableIcons.ShareIcon,
                  onClick: (evt, data) => {
                    handleOpen();
                    setModalType("share");
                    setSelectedData(data);
                  },
                },
                {
                  tooltip: "Remove All Selected documents",
                  icon: tableIcons.Delete,
                  onClick: (evt, data) => {
                    handleOpen();
                    setModalType("delete");
                    setSelectedData(data);
                  },
                },
                {
                  icon: tableIcons.SwapHorizIcon,
                  position: "row",
                  tooltip: "Revoke permission",
                  onClick: (event, rowData) => {
                    handleOpen();
                    setModalType("revoke");
                    setRevokeData(rowData);
                    setSharedList({
                      sharedList: rowData.sharedList,
                      documentId: rowData.documentId,
                    });
                  },
                },
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
  shareDocument: (data) => dispatch(shareDocument(data)),
  updateDocAccess: (data) => dispatch(updateDocAccess(data)),
  deleteDocuments: (documentIds) => dispatch(deleteDocuments(documentIds)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Documents);
