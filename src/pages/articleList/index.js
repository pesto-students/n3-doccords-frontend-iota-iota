/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import VerticalGridList from "../../components/verticalGridList";
// import HorizontalGridList from "../../components/HorizontalGridList";
// import DropDown from "components/DropDown/DropDown";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import MyAutoComplete from "../../components/autoComplete/AutoComplete";
import { connect, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { setUpSearchBarLocation } from "../../redux/actions/common";
import { makeStyles } from "@material-ui/core/styles";
import MyCarousel from "components/shared/carousel/Carousel";

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

const Articles = ({ location, healthTopics, articles, searchedString }) => {
  const classes = useStyles();
  const history = useHistory();
  // const isSearchBarAtHomeScreen = useSelector((state) => state);
  const dispatch = useDispatch();

  // let relatedArticles = articles;
  const [relatedArticles, setRelatedArticles] = React.useState(articles);
  const [selectedHealthTopic, setSelectedHealthTopic] = React.useState(
    location.state
  );

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
    setSelectedHealthTopic(selectedItem);
  };

  const fileterArticlesBySearch = () => {
    const filteredAR = articles.filter((article) =>
      article.title.toLowerCase().includes(searchedString.toLowerCase())
    );
    setRelatedArticles(filteredAR);
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
    fileterArticlesBySearch();
    // fileterArticlesBySearch();
    return () => {};
  }, [searchedString]);

  useEffect(() => {
    dispatch(setUpSearchBarLocation(false));
    // fileterArticlesBySearch();
    handleHealthSelection(selectedHealthTopic);
    return () => {
      dispatch(setUpSearchBarLocation(null));
    };
  }, []);

  return (
    <Container className={classes.root}>
      <h3>All Recently added articles</h3>
      {/* <HorizontalGridList articles={articles} handleClick={handleClickOnHV} /> */}
      <Paper>
        <MyCarousel data={articles} handleClick={handleClickOnHV} />
      </Paper>
      <Container style={{ marginTop: "20px" }}>
        <MyAutoComplete
          value={selectedHealthTopic}
          list={healthTopics}
          handleHealthSelection={handleHealthSelection}
        />
      </Container>

      <h2>{`Health Articles / ${selectedHealthTopic.title}`}</h2>

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
    healthTopics: state.common.healthTopics,
    articles: state.common.articles,
    searchedString: state.common.searchedString,
  };
};

export default connect(mapStateToProps)(Articles);
