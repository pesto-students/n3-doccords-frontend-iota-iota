/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import { Grid, Avatar } from "@material-ui/core";
import {
  fetchAllProfilesAndDocuments,
  deleteAllProfilesAndDocuments,
} from "apiRequests/user";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import tableIcons from "components/shared/tableIcons";

const relationship = [
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
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    borderRadius: "2%",
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
  button_create: {
    color: "#fff",
    marginBottom: "2rem",
    alignSelf: "start",
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));
const modalStyle = {
  top: "50%",
  left: `50%`,
  transform: `translate(-50%, -50%)`,
};

const Table = (props) => {
  // eslint-disable-next-line react/prop-types
  const {
    add,
    edit,
    fetchAllProfilesAndDocuments,
    profiles,
    documents,
    deleteAllProfilesAndDocuments,
  } = props;
  const history = useHistory();
  const [rows, setRows] = useState([]);
  const [isMultipleSelection, setIsMultipleSelection] = React.useState(false);
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [selectedProfiles, setSelectedProfiles] = useState([]);
  const [selectedDocs, setSelectedDocs] = useState([]);

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    fetchAllProfilesAndDocuments();
  }, []);

  useEffect(() => {
    setRows(modifyProfiles());
  }, [documents, profiles]);

  const modifyProfiles = () => {
    const modified = profiles.map((profile) => {
      const filteredDocuments = documents.filter(
        (document) => document.profileId === profile.profileId
      );
      profile.uploadedDoc = filteredDocuments.length;
      let shared = 0;
      filteredDocuments.map((filtered) => {
        shared = shared + filtered.sharedList.length;
        return filtered;
      });
      return {
        name: profile.profileName,
        picture: profile.picture,
        relationshipId: relationship[profile.relationshipId - 1].title,
        uploadedDoc: profile.uploadedDoc,
        sharedDoc: shared,
        profileId: profile.profileId,
      };
    });
    return modified;
  };

  const columns = [
    {
      title: "Picture",
      field: "picture",
      render: (rowData) => (
        <Grid container alignItems="center">
          <Grid item md={4} xs={6}>
            {rowData.picture ? (
              <Avatar
                alt={rowData.profileName}
                src={rowData.picture}
                className={classes.large}
              />
            ) : (
              <Avatar>{rowData.name[0]}</Avatar>
            )}
          </Grid>
        </Grid>
      ),
    },
    {
      title: "Name",
      field: "name",
      render: (rowData) => (
        <Grid container alignItems="center">
          <Grid item xs={6} md={8}>
            {rowData.name}
          </Grid>
        </Grid>
      ),
    },
    {
      title: "Relationship",
      field: "relationshipId",
    },
    {
      title: "Uploaded Doc",
      field: "uploadedDoc",
    },
    {
      title: "Shared Doc",
      field: "sharedDoc",
    },
  ];
  const calculateSelectedProfilesAndDocs = (rowData) => {
    const profileIds = rowData.map((row) => row.profileId);
    const docIds = profileIds
      .map((id) => {
        const filteredArray = documents.filter((doc) => id === doc.profileId);
        return filteredArray;
      })
      .flat(1)
      .map((doc) => doc.documentId);
    setSelectedProfiles(profileIds);
    setSelectedDocs(docIds);
  };
  const deleteProfiles = (rowData) => {
    const profileIds = rowData.map((row) => row.profileId);
    const docIds = profileIds
      .map((id) => {
        const filteredArray = documents.filter((doc) => id === doc.profileId);
        return filteredArray;
      })
      .flat(1)
      .map((doc) => doc.documentId);
    deleteAllProfilesAndDocuments(profileIds, docIds, history);
  };

  const handlEditClick = (event, rowsData) => {
    const filtered = profiles.filter(
      (profile) => rowsData[0].profileId === profile.profileId
    );
    const selectedProfile = filtered[0];
    history.push({
      pathname: `/profiles/edit`,
      state: selectedProfile,
    });
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <p id="simple-modal-profiles">
        Are you sure, you want to share {selectedDocs.length} document with the
        below mentioned email id
      </p>
      <div>
        <Button
          variant="contained"
          className={classes.button_yes}
          // onClick={clickedYes}
        >
          Yes
        </Button>
        <Button
          variant="contained"
          className={classes.button_no}
          // onClick={handleClose}
        >
          No
        </Button>
      </div>
    </div>
  );
  return (
    <div>
      <MaterialTable
        icons={tableIcons}
        title="Profiles Table"
        data={rows}
        onSelectionChange={(rows) => {
          rows.length > 1
            ? setIsMultipleSelection(true)
            : setIsMultipleSelection(false);
        }}
        columns={columns}
        options={{
          search: true,
          paging: true,
          // filtering: true,
          // exportButton: true,
          selection: true,
        }}
        actions={[
          {
            icon: tableIcons.Edit,
            tooltip: isMultipleSelection
              ? "You can edit only one profile"
              : "Edit Profile",
            onClick: (event, rowsData) => handlEditClick(event, rowsData),
            disabled: isMultipleSelection,
          },
          {
            icon: tableIcons.Add,
            tooltip: "Add Profile",
            isFreeAction: true,
            onClick: (event) => add(),
          },
          {
            icon: tableIcons.Delete,
            tooltip: "Delete User",
            onClick: (event, rowData) => {
              deleteProfiles(rowData);
            },
          },
        ]}
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-profiles"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => ({
  profiles: state.user.profiles,
  documents: state.user.documents,
});
const mapDispatchToProps = (dispatch) => ({
  fetchAllProfilesAndDocuments: () => dispatch(fetchAllProfilesAndDocuments()),
  deleteAllProfilesAndDocuments: (profiles, documents, history) =>
    dispatch(deleteAllProfilesAndDocuments(profiles, documents, history)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
