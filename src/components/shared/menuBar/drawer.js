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
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
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
    },
  ],
  registeredUser: [
    {
      name: "Home",
      link: ROOT,
    },
    {
      name: "Dasboard",
      link: DASHBOARD,
    },
    {
      name: "Profiles",
      link: PROFILES,
    },
    {
      name: "Documents",
      link: DOCUMENTS,
    },
  ],
  admin: [
    {
      name: "Home",
      link: ROOT,
    },
    {
      name: "Dasboard",
      link: ADMIN_DASHBOARD,
    },
    {
      name: "Health Topics",
      link: ADMIN_HEALTH_TOPICS,
    },
    {
      name: "Articles",
      link: ADMIN_ARTICLES,
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
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
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
