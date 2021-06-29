/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import VerticalGridList from "../../components/verticalGridList";
import HorizontalGridList from "../../components/HorizontalGridList";
// import DropDown from "components/DropDown/DropDown";
import Container from "@material-ui/core/Container";
import MyAutoComplete from "../../components/autoComplete/AutoComplete";
import { connect, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { isSearchBarAtHome } from "../../redux/actions/filterAction";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(4),
  },
}));

// const optionList = [
//   { title: "Cancer" },
//   { title: "Sugar" },
//   { title: "Blood Pressure" },
//   { title: "Covid-19" },
//   { title: "ENT" },
// ];

const Articles = ({ location, healthTopics, articles }) => {
  const classes = useStyles();
  const history = useHistory();
  // const isSearchBarAtHomeScreen = useSelector((state) => state);
  const dispatch = useDispatch();

  // let relatedArticles = articles;
  const [relatedArticles, setRelatedArticles] = React.useState(articles);

  // Redux functions
  // const selectedHealthTopic = useSelector((state) => state.selectedTopic);
  // console.log(selectedHealthTopic);

  const handleHealthSelection = (selectedItem) => {
    // eslint-disable-next-line no-constant-condition
    if (selectedItem === "All") {
      console.log("item not found Error");
      setRelatedArticles(articles);
      return;
    }

    const filteredArticles = articles.filter(
      (article) => article.healthTopic === selectedItem.healthTopicId
    );
    if (filteredArticles.length === 0) {
      console.log("No Relatied articles found");
      setRelatedArticles(filteredArticles);
    } else {
      console.log(filteredArticles);
      setRelatedArticles(filteredArticles);
    }
  };

  const handleClickOnHV = (article) => {
    console.log("handleClickOnHV is working");
    history.push({
      pathname: `/article/${article.articleId}`,
      state: article,
    });
  };
  // const optionList = healthTopics.map((topic) => {
  //   return topic.title;
  // });
  // console.log(optionList);

  useEffect(() => {
    dispatch(isSearchBarAtHome(false));
    return () => {};
  }, []);

  return (
    <Container className={classes.root}>
      <h3>Recently added articles</h3>
      <HorizontalGridList articles={articles} handleClick={handleClickOnHV} />
      <MyAutoComplete
        list={healthTopics}
        handleHealthSelection={handleHealthSelection}
      />
      <h2>Health Articles</h2>

      {relatedArticles.length !== 0 ? (
        <VerticalGridList
          healthTopics={relatedArticles}
          handleClick={handleClickOnHV}
        />
      ) : (
        <h4>Sorry currently we dont have articles under selected category.</h4>
      )}
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    healthTopics: state.home.healthTopics,
    articles: state.articles.articles,
  };
};

export default connect(mapStateToProps)(Articles);
