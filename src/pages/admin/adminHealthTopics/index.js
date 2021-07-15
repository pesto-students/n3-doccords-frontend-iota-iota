import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { fetchAllHealthTopics } from "apiRequests/common";
import MaterialTable from "material-table";
import tableIcons from "components/shared/tableIcons";
import { Box } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import {
  deleteHealthTopic,
  getSuggestedTopics,
  declineSuggestion,
} from "apiRequests/admin";
import { useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import CheckIcon from "@material-ui/icons/Check";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    // border: "2px solid #000",
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
  listItemText: {
    fontSize: "1rem",
  },
}));
const modalStyle = {
  top: "50%",
  left: `50%`,
  transform: `translate(-50%, -50%)`,
};
const AdminHealthTopics = ({
  fetchAllHealthTopics,
  healthTopics,
  deleteHealthTopic,
  getSuggestedTopics,
  suggestedTopics,
  declineSuggestion,
}) => {
  const classes = useStyles();
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);
  const [open, setOpen] = useState(false);
  const [deleteHealthTopicId, setDeleteHealthTopicId] = useState("");
  const [filterdSuggestedTopics, setFilterdSuggestedTopics] = useState([]);
  const history = useHistory();

  useEffect(() => {
    fetchAllHealthTopics();
    getSuggestedTopics();
  }, []);

  useEffect(() => {
    setColumns(getColumnData());
    setRows(healthTopics);
  }, [healthTopics]);
  useEffect(() => {
    const filtered = suggestedTopics.filter(
      (topic) => topic.status === "pending"
    );
    setFilterdSuggestedTopics(filtered);
  }, [suggestedTopics]);

  const handleClose = () => {
    setOpen(false);
  };
  const navigateToCreatePage = () => {
    history.push("/admin/healthTopic");
  };
  const navigateToEditPage = (title, healthTopicId, picture) => {
    history.push({
      pathname: "/admin/healthTopic",
      state: {
        title,
        healthTopicId,
        picture,
      },
    });
  };

  const getColumnData = () => [
    { field: "title", title: "Title", width: 300 },
    {
      field: "picture",
      title: "Picture",
      sorting: false,
      render: function renderImage(rowData) {
        return (
          <img
            src={rowData.picture}
            style={{ maxWidth: "20%", height: "auto" }}
          />
        );
      },
    },
  ];
  const approveTopic = (suggestedTopic) => {
    history.push({
      pathname: "/admin/healthTopic",
      state: {
        suggestedTopicDetail: {
          title: suggestedTopic.suggestedTopic,
          suggestedTopicId: suggestedTopic.suggestedTopicId,
          documentId: suggestedTopic.documentId,
          healthTopicId: "",
          picture: " ",
        },
      },
    });
  };
  const declineTopic = (suggestedTopic) => {
    declineSuggestion({
      suggestedTopicId: suggestedTopic.suggestedTopicId,
      documentId: suggestedTopic.documentId,
    });
  };
  const clickedYes = () => {
    deleteHealthTopic(deleteHealthTopicId);
    handleClose();
  };
  const body = (
    <div style={modalStyle} className={classes.paper}>
      <p id="simple-modal-title">
        Are you sure, you want to delete this health topic?
      </p>
      <div>
        <Button
          variant="contained"
          className={classes.button_yes}
          onClick={clickedYes}
        >
          Yes
        </Button>
        <Button
          variant="contained"
          className={classes.button_no}
          onClick={handleClose}
        >
          No
        </Button>
      </div>
    </div>
  );

  return (
    <Box
      style={{
        // width: "40%",
        margin: "3rem 0",
        padding: "0 3rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Button
        variant="contained"
        color="secondary"
        className={classes.button_create}
        onClick={navigateToCreatePage}
      >
        Create New Topic
      </Button>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={12} lg={8}>
          <MaterialTable
            style={{ border: "1px solid #999" }}
            icons={tableIcons}
            title="Health topics list"
            columns={columns}
            data={rows}
            options={{
              search: true,
              actionsColumnIndex: -1,
              fixedColumns: {
                left: 1,
                right: 0,
              },
              headerStyle: {
                backgroundColor: "#4bffa5",
                color: "#000",
              },
            }}
            actions={[
              {
                icon: tableIcons.Edit,
                tooltip: "edit topic",
                onClick: (event, rowData) => {
                  navigateToEditPage(
                    rowData.title,
                    rowData.healthTopicId,
                    rowData.picture
                  );
                },
              },
              {
                icon: tableIcons.Delete,
                tooltip: "delete topic",
                onClick: (event, rowData) => {
                  setOpen(true);
                  setDeleteHealthTopicId(rowData.healthTopicId);
                },
              },
            ]}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={4}>
          <Typography variant="h6" className={classes.title}>
            Suggested health topics by user
          </Typography>
          <List dense>
            {filterdSuggestedTopics.map((el) => (
              <ListItem key={el.suggestedTopicId}>
                <ListItemText
                  classes={{ primary: classes.listItemText }}
                  primary={el.suggestedTopic}
                />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => {
                      approveTopic(el);
                    }}
                  >
                    <CheckIcon />
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => {
                      declineTopic(el);
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </Box>
  );
};

AdminHealthTopics.propTypes = {
  fetchAllHealthTopics: PropTypes.func.isRequired,
  getSuggestedTopics: PropTypes.func.isRequired,
  declineSuggestion: PropTypes.func.isRequired,
  deleteHealthTopic: PropTypes.func,
  healthTopics: PropTypes.array,
  suggestedTopics: PropTypes.array,
};

const mapStateToProps = (state) => {
  return {
    healthTopics: state.common.healthTopics,
    suggestedTopics: state.user.suggestedTopics,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchAllHealthTopics: () => dispatch(fetchAllHealthTopics()),
  getSuggestedTopics: () => dispatch(getSuggestedTopics()),
  deleteHealthTopic: (articleId) => dispatch(deleteHealthTopic(articleId)),
  declineSuggestion: (data) => dispatch(declineSuggestion(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminHealthTopics);
