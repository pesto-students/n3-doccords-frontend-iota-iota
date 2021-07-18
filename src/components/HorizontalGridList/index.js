import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";

import useMediaQuery from "@material-ui/core/useMediaQuery";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
    padding: "10px",
    marginTop: 0,
    paddingTop: 0,
  },
  gridList: {
    flexWrap: "nowrap",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)",
  },
}));

// eslint-disable-next-line react/prop-types
const HorizontalGridList = ({ articles, handleClick }) => {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  // const history = useHistory();

  return (
    <div className={classes.root}>
      <GridList className={classes.gridList} cols={matches ? 1.5 : 3.5}>
        {/*  eslint-disable-next-line react/prop-types */}
        {articles.map((article) => (
          <GridListTile
            key={article.articleId}
            onClick={() => handleClick(article)}
          >
            <img src={article.picture} alt={article.title} />
            <GridListTileBar title={article.title} />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
};

export default HorizontalGridList;
