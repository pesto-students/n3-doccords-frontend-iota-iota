import React from "react";
import Table from "components/Table/Table";
import { Paper, makeStyles } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "auto",
    marginTop: theme.spacing(3),
    maxWidth: "80%",
    justify: "center",
  },
}));

const Profiles = () => {
  const classes = useStyles();
  const history = useHistory();

  const handleCreateProfileClick = () => {
    console.log("add clicked");
    history.push({
      pathname: `/profiles/create`,
    });
  };
  const handleEditProfileClick = () => {
    console.log("add clicked");
    history.push({
      pathname: `/profiles/edit`,
    });
  };

  return (
    <Paper className={classes.root}>
      <Table add={handleCreateProfileClick} edit={handleEditProfileClick} />
    </Paper>
  );
};

export default Profiles;
