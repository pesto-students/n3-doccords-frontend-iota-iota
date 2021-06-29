/* eslint-disable react/prop-types */
import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Box from "@material-ui/core/Box";
// import Grid from "@material-ui/core/Grid";
// import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";

import { Typography } from "@material-ui/core";

const sidebar = {
  articles: [
    { title: "March 2020", url: "#" },
    { title: "February 2020", url: "#" },
    { title: "January 2020", url: "#" },
    { title: "November 1999", url: "#" },
    { title: "October 1999", url: "#" },
    { title: "September 1999", url: "#" },
    { title: "August 1999", url: "#" },
    { title: "July 1999", url: "#" },
    { title: "June 1999", url: "#" },
    { title: "May 1999", url: "#" },
    { title: "April 1999", url: "#" },
  ],
};

const useStyles = makeStyles((theme) => ({
  grow: {
    width: "70vw",
  },
  sidebarcl: {
    width: "15vw",
  },

  hero: {
    backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://images.unsplash.com/photo-1584362917165-526a968579e8?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzR8fGhlYWx0aCUyMGNhcmV8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60')`,
    height: "35vh",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
    fontSize: "4rem",
  },
}));

const Article = ({ location }) => {
  const classes = useStyles();
  const article = location.state;
  const date = new Date(article.createdAt);
  return (
    <div>
      <Box className={classes.hero}>
        <Box>Health is everything</Box>
      </Box>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        p={2}
        m={2}
        pt={3}
      >
        <Box className={classes.grow} p={2} m={2}>
          {/* <Paper> */}
          <Typography variant="h5" component="h6">
            {article.title}
          </Typography>
          <Typography variant="subtitle2">
            {" "}
            {`${date.getFullYear()}-${
              date.getMonth() + 1
            }-${date.getDate()}`}{" "}
          </Typography>
          <Typography paragraph> {article.description} </Typography>
          {/* </Paper> */}
        </Box>
        <Box className={classes.sidebarcl} p={2} m={2}>
          <Sidebar articles={sidebar.articles} />
        </Box>
      </Box>
    </div>
  );
};

export default Article;
