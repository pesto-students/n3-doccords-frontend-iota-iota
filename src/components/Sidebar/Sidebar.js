/* eslint-disable react/prop-types */
import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles((theme) => ({
  sidebarAboutBox: {
    width: "auto",
    padding: theme.spacing(2),
    backgroundColor: theme.palette.grey[200],
  },
  sidebarSection: {
    marginTop: theme.spacing(2),
    backgroundColor: theme.palette.grey[200],
    width: "100%",
  },
}));

export default function Sidebar(props) {
  const classes = useStyles();
  const { articles, handleClick } = props;

  return (
    <Box mt={3}>
      <Typography variant="h6" gutterBottom className={classes.sidebarSection}>
        Related Articles
      </Typography>
      {articles.map((article) => (
        <Link
          display="block"
          variant="body1"
          key={article.title}
          onClick={() => handleClick(article)}
        >
          {article.title}
        </Link>
      ))}
    </Box>
  );
}

Sidebar.propTypes = {
  articles: PropTypes.array,
  description: PropTypes.string,
  social: PropTypes.array,
  title: PropTypes.string,
};
