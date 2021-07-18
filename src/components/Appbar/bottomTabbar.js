import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import HomeIcon from "@material-ui/icons/Home";
import DashboardIcon from "@material-ui/icons/Poll";
import CategoryIcon from "@material-ui/icons/Category";
import ArticleIcon from "@material-ui/icons/Create";
import LogoutIcon from "@material-ui/icons/ExitToApp";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    position: "fixed",
    bottom: 0,
  },
}));

export default function BottomAppBar() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction
        component={Link}
        to={"/"}
        label="Home"
        icon={<HomeIcon />}
      />
      <BottomNavigationAction
        component={Link}
        to={"/dashboard"}
        label="Dashboard"
        icon={<DashboardIcon />}
      />
      <BottomNavigationAction
        component={Link}
        to={"/category"}
        label="Category"
        icon={<CategoryIcon />}
      />
      <BottomNavigationAction
        component={Link}
        to={"/articles"}
        label="Article"
        icon={<ArticleIcon />}
      />
      <BottomNavigationAction
        component={Link}
        to={"/logout"}
        label="Logout"
        icon={<LogoutIcon />}
      />
    </BottomNavigation>
  );
}
