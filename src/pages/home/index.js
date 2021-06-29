/* eslint-disable react/prop-types */
import React, { useEffect, Suspense } from "react";

import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { fetchHealthTopicsAndArticles } from "apiRequests/home";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { setUpSearchBarLocation } from "../../redux/actions/common";

// import HealthTopic from "../../components/CardContainer/CardContainer";
// import VerticalGridList from "../../components/verticalGridList";
// import HorizontalGridList from "../../components/HorizontalGridList";

const VerticalGridList = React.lazy(() =>
  import("../../components/verticalGridList")
);
const HorizontalGridList = React.lazy(() =>
  import("../../components/HorizontalGridList")
);

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(4),
  },
}));

// eslint-disable-next-line react/prop-types
const Home = ({
  fetchHealthTopicsAndArticles,
  isSearch,
  healthTopics,
  articles,
  searchedString,
}) => {
  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
    fetchHealthTopicsAndArticles();
    isSearch(true);
  }, []);

  const fileterHealthTopics = () => {
    return healthTopics.filter((topic) =>
      topic.title.toLowerCase().includes(searchedString.toLowerCase())
    );
  };

  const filterHT = fileterHealthTopics();

  const handleClickOnHV = (article) => {
    history.push({
      pathname: `/article/${article.articleId}`,
      state: article,
    });
  };

  const handleClickOnVV = (item) => {
    history.push({
      pathname: `/healthTopic/${item.healthTopicId}`,
      state: item,
    });
  };

  return (
    <Container className={classes.root}>
      <h3>Recently added articles</h3>
      <Suspense
        fallback={
          <div>
            <h1> Loading Articles...</h1>
          </div>
        }
      >
        <Paper>
          <HorizontalGridList
            articles={articles}
            handleClick={handleClickOnHV}
          />
        </Paper>
      </Suspense>

      <h2>Health topics</h2>
      <Suspense fallback={<div>Loading Health Topics...</div>}>
        <VerticalGridList
          healthTopics={filterHT}
          handleClick={handleClickOnVV}
        />
      </Suspense>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    healthTopics: state.common.healthTopics,
    articles: state.common.articles,
    searchedString: state.common.searchedString,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchHealthTopicsAndArticles: () =>
      dispatch(fetchHealthTopicsAndArticles()),
    isSearch: (isSearch) => dispatch(setUpSearchBarLocation(isSearch)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
