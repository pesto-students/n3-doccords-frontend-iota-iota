import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import MaterialTable from "material-table";
import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";

import tableIcons from "components/shared/tableIcons";
import { fetchAllArticles } from "apiRequests/common";
import { deleteArticle } from "apiRequests/admin";
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
const modalStyle = {
  top: "50%",
  left: `50%`,
  transform: `translate(-50%, -50%)`,
};

const AdminArticles = ({
  articles,
  healthTopics,
  fetchAllArticles,
  deleteArticle,
}) => {
  const classes = useStyles();
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [deleteArticleId, setDeleteArticleId] = useState("");
  const history = useHistory();

  const setArticlesWithTopics = () => {
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
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    fetchAllArticles();
  }, []);
  useEffect(() => {
    setColumns(getColumnData());
    setArticlesWithTopics();
  }, [articles]);
  const clickedYes = () => {
    deleteArticle(deleteArticleId);
    handleClose();
  };

  const getColumnData = () => [
    { field: "title", title: "Title" },
    { field: "healthTopicTitle", title: "Health Topic" },
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
  const navigateToCreatePage = () => {
    history.push("/admin/article");
  };
  const navigateToEditPage = (
    articleId,
    title,
    healthTopicId,
    picture,
    description
  ) => {
    history.push({
      pathname: "/admin/article",
      state: {
        articleId,
        title,
        healthTopicId,
        picture,
        description,
      },
    });
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <p id="simple-modal-article-title">
        Are you sure, you want to delete this Article?
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
        Create new article
      </Button>
      <MaterialTable
        style={{ border: "1px solid #999" }}
        icons={tableIcons}
        title="Articles list"
        columns={columns}
        data={rows}
        options={{
          search: true,
          actionsColumnIndex: -1,
          headerStyle: {
            backgroundColor: "#4bffa5",
            color: "#000",
          },
        }}
        actions={[
          {
            icon: tableIcons.Edit,
            tooltip: "edit article",
            onClick: (event, rowData) => {
              navigateToEditPage(
                rowData.articleId,
                rowData.title,
                rowData.healthTopicId,
                rowData.picture,
                rowData.description
              );
            },
          },
          {
            icon: tableIcons.Delete,
            tooltip: "delete article",
            onClick: (event, rowData) => {
              setOpen(true);
              setDeleteArticleId(rowData.articleId);
            },
          },
        ]}
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-article-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </Box>
  );
};
AdminArticles.propTypes = {
  deleteArticle: PropTypes.func,
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
  deleteArticle: (articleId) => dispatch(deleteArticle(articleId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminArticles);
