import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import MaterialTable from "material-table";
import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";

import tableIcons from "components/shared/tableIcons";
import { fetchAllArticles } from "apiRequests/common";
import { useHistory } from "react-router-dom";

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
}));
// const modalStyle = {
//   top: "50%",
//   left: `50%`,
//   transform: `translate(-50%, -50%)`,
// };

const AdminArticles = ({ articles, healthTopics, fetchAllArticles }) => {
  const classes = useStyles();
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);
  const history = useHistory();

  const setArticlesWithTopics = () => {
    console.log(articles);
    const newArticles = articles.map((article) => {
      // eslint-disable-next-line react/prop-types
      healthTopics.forEach((topic) => {
        if (article.healthTopicId === topic.healthTopicId) {
          article.healthTopicTitle = topic.title;
        }
      });
      return article;
    });
    setRows(newArticles);
  };

  useEffect(() => {
    fetchAllArticles();
  }, []);
  useEffect(() => {
    setColumns(getColumnData());
    setArticlesWithTopics();
  }, [articles]);

  const getColumnData = () => [
    { field: "title", title: "Title" },
    { field: "description", title: "Description" },
    { field: "healthTopicTitle", title: "Health Topic" },
    {
      field: "picture",
      title: "Picture",
      sorting: false,
      render: function renderImage(rowData) {
        return (
          <img
            src={rowData.picture}
            style={{ maxWidth: "50%", height: "auto" }}
          />
        );
      },
    },
  ];
  const navigateToCreatePage = () => {
    history.push("/admin/article");
  };
  const navigateToEditPage = () => {};
  const setOpen = () => {};
  const setDeleteArticleId = () => {};

  return (
    <Box
      style={{
        // width: "40%",
        margin: "3rem 0",
        padding: "0 3rem",
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
      <MaterialTable
        style={{ border: "1px solid #999" }}
        icons={tableIcons}
        title="Health topics list"
        columns={columns}
        data={rows}
        options={{
          search: true,
          actionsColumnIndex: -1,
          // fixedColumns: {
          //   left: 1,
          //   right: 0,
          // },
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
              setDeleteArticleId(rowData.healthTopicId);
            },
          },
        ]}
      />
      {/* <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal> */}
    </Box>
  );
};
AdminArticles.propTypes = {
  articles: PropTypes.array,
  healthTopics: PropTypes.array,
  fetchAllArticles: PropTypes.func,
};

// export default AdminArticles;

const mapStateToProps = (state) => ({
  articles: state.common.articles,
  healthTopics: state.common.healthTopics,
});
const mapDispatchToProps = (dispatch) => ({
  fetchAllArticles: () => dispatch(fetchAllArticles()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminArticles);
