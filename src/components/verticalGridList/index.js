import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";

import useMediaQuery from "@material-ui/core/useMediaQuery";
// import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: "90%",
    height: "100vh",
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)",
  },
}));

// eslint-disable-next-line react/prop-types
const VerticalGridList = ({ healthTopics, handleClick }) => {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  // const history = useHistory();

  return (
    <div className={classes.root}>
      <GridList
        cellHeight={180}
        className={classes.gridList}
        cols={matches ? 1 : 3}
      >
        {/* eslint-disable-next-line react/prop-types */}
        {healthTopics.map((topic) => (
          <GridListTile
            key={topic.healthTopicId}
            onClick={() => handleClick(topic)}
          >
            <img src={topic.picture} alt={topic.title} />
            <GridListTileBar title={topic.title} />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
};

export default VerticalGridList;
