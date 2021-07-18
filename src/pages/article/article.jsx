/* eslint-disable prefer-const */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import { Typography, Paper, Grid } from "@material-ui/core";
import Hidden from "@material-ui/core/Hidden";
import withWidth from "@material-ui/core/withWidth";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  sidebarcl: {
    width: "15vw",
  },

  hero: {
    backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://images.unsplash.com/photo-1584362917165-526a968579e8?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzR8fGhlYWx0aCUyMGNhcmV8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60')`,
    // marginTop: "50px",
    height: "35vh",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
    fontSize: "2rem",
  },
}));

const Article = ({ location }) => {
  // eslint-disable-next-line no-unused-vars
  const classes = useStyles();
  const article = location.state;
  const date = new Date(article.createdAt);
  const articlesList = useSelector((state) => state.common.articles);
  const healthTopicList = useSelector((state) => state.common.healthTopics);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [healthTopicTitle, setHealthTopicTitle] = useState("");
  const bgImage = article.picture;
  const history = useHistory();

  useEffect(() => {
    if (articlesList !== undefined) {
      setRelatedArticles(
        articlesList
          .filter((item) => item.healthTopic === article.healthTopic)
          .filter((item) => item.title !== article.title)
      );
    }
    if (healthTopicList !== undefined) {
      // TO DO find the health topic title
      let healthTitle = healthTopicList.find(
        (item, index) => item.healthTopicId === article.healthTopic
      );
      setHealthTopicTitle(healthTitle.title);
    }
  }, [articlesList, relatedArticles]);
  // className={classes.hero}

  const handleClickOnHV = (article) => {
    history.push({
      pathname: `/article/${article.articleId}`,
      state: article,
    });
  };

  return (
    <div>
      <Paper
        style={{
          backgroundImage: `url(${bgImage})`,
          height: "35vh",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#fff",
          fontSize: "2rem",
        }}
        mt={3}
        pt={2}
      ></Paper>
      <Box
        display="flex"
        flexDirection="col"
        justifyContent="space-between"
        p={2}
        m={2}
        pt={3}
      >
        <Grid xs={10} md={8}>
          {/* <Paper> */}
          <Typography variant="h5" component="h6">
            {article.title}
          </Typography>
          <Typography variant="subtitle1">{healthTopicTitle}</Typography>
          <Typography variant="subtitle2" color="textSecondary">
            {`${date.toLocaleDateString()}`}
          </Typography>
          <Typography
            paragraph
            dangerouslySetInnerHTML={{ __html: article.description }}
          ></Typography>

          {/* <Typography dangerouslySetInnerHTML={{article.description}} /> */}
          {/* </Paper> */}
        </Grid>
        {relatedArticles.length > 1 && (
          <Hidden smDown>
            <Grid sm={3}>
              <Sidebar
                articles={relatedArticles}
                handleClick={handleClickOnHV}
              />
            </Grid>
          </Hidden>
        )}
      </Box>
    </div>
  );
};

export default withWidth()(Article);
