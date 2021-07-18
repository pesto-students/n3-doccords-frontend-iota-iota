/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import Drawer from "@material-ui/core/Drawer";
import withStyles from "@material-ui/core/styles/withStyles";
import { useAuth } from "context/AuthContext";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@material-ui/core";
import { useSelector } from "react-redux";
import {
  ROOT,
  DASHBOARD,
  PROFILES,
  DOCUMENTS,
  ADMIN_DASHBOARD,
  ADMIN_HEALTH_TOPICS,
  ADMIN_ARTICLES,
} from "navigation/constants";
import { Link } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";
import DashboardIcon from "@material-ui/icons/Dashboard";
import RecentActorsIcon from "@material-ui/icons/RecentActors";
import AssignmentIcon from "@material-ui/icons/Assignment";
import ChromeReaderModeIcon from "@material-ui/icons/ChromeReaderMode";
import ListAltIcon from "@material-ui/icons/ListAlt";

const styles = () => ({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
});
const navList = {
  unRegisteredUser: [
    {
      name: "Home",
      link: ROOT,
      icon: <HomeIcon />,
    },
  ],
  registeredUser: [
    {
      name: "Home",
      link: ROOT,
      icon: <HomeIcon />,
    },
    {
      name: "Dasboard",
      link: DASHBOARD,
      icon: <DashboardIcon />,
    },
    {
      name: "Profiles",
      link: PROFILES,
      icon: <RecentActorsIcon />,
    },
    {
      name: "Documents",
      link: DOCUMENTS,
      icon: <AssignmentIcon />,
    },
  ],
  admin: [
    {
      name: "Home",
      link: ROOT,
      icon: <HomeIcon />,
    },
    {
      name: "Dasboard",
      link: ADMIN_DASHBOARD,
      icon: <DashboardIcon />,
    },
    {
      name: "Health Topics",
      link: ADMIN_HEALTH_TOPICS,
      icon: <ListAltIcon />,
    },
    {
      name: "Articles",
      link: ADMIN_ARTICLES,
      icon: <ChromeReaderModeIcon />,
    },
  ],
};

const DrawerComponent = ({ classes, toggleDrawerHandler, left }) => {
  const { currentUser } = useAuth();
  const userDetail = useSelector((state) => state.user.userDetail);
  const [list, setList] = useState(["Home", "Health Topics", "Artiles"]);
  // const [left] = useState(false);
  useEffect(() => {
    if (currentUser) {
      if (userDetail.profileType === "admin") {
        setList(navList.admin);
      } else if (userDetail.profileType === "free") {
        setList(navList.registeredUser);
      }
    } else {
      setList(navList.unRegisteredUser);
    }
  }, [userDetail]);

  const sideList = (list) => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawerHandler}
      onKeyDown={toggleDrawerHandler}
    >
      <List>
        {list.map((item, index) => (
          <ListItem button component={Link} to={item.link} key={index}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.name} />
          </ListItem>
        ))}
      </List>
      <Divider />
    </div>
  );

  return (
    <Drawer open={left} onClose={toggleDrawerHandler}>
      {sideList(list)}
    </Drawer>
  );
};

export default withStyles(styles)(DrawerComponent);
