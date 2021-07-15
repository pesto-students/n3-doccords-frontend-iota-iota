import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Table from "components/Table/Table";
import { Paper, makeStyles } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { fetchAllHealthTopics } from "apiRequests/common";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "auto",
    marginTop: theme.spacing(3),
    maxWidth: "80%",
    justify: "center",
  },
}));

const Profiles = ({ fetchAllHealthTopics }) => {
  const classes = useStyles();
  const history = useHistory();

  // useEffect(() => {
  //   // fetch health Topics
  //   fetchAllHealthTopics();
  // }, []);

  const handleCreateProfileClick = () => {
    history.push({
      pathname: `/profiles/create`,
    });
  };
  const handleEditProfileClick = () => {
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

Profiles.propTypes = {
  fetchAllHealthTopics: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  healthTopics: state.common.healthTopics,
});
const mapDispatchToProps = (dispatch) => ({
  fetchAllHealthTopics: () => dispatch(fetchAllHealthTopics()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profiles);
// export default Profiles;
