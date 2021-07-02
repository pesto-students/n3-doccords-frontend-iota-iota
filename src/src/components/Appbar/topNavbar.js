import React, { useEffect } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
// import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";

import SearchIcon from "@material-ui/icons/Search";

import SwipeableDrawer from "./SwipeableDrawer";
import { useLocation } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  grow: {
    // flexGrow: 1,
  },

  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

const TopNavbar = (props) => {
  const classes = useStyles();
  // const [anchorEl, setAnchorEl] = React.useState(null);
  // const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [isSearchBar, setIsSearchBar] = React.useState(true);
  // const [isLogin, setIsLogin] = useState(false);
  // const [searchVisible, setSearchVisible] = React.useState(true);

  // const handleLogin = () => {
  //   setIsLogin(true);
  // };

  // const isMenuOpen = Boolean(anchorEl);
  // const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const titles = {
    "/": "Search health topics",
    articles: "Search Articles",
  };

  const [searchPlaceholder, setSearchPlaceholder] = React.useState(titles["/"]);

  const location = useLocation();
  const currentPath = window.location.pathname;
  useEffect(() => {
    setSearchPlaceholder(titles[location.pathname]);
    if (currentPath.includes("/healthTopic/")) {
      setSearchPlaceholder(titles.articles);
    }

    showSearchBar();
  }, [location.pathname, isSearchBar]);

  const showSearchBar = () => {
    if (currentPath === "/" || currentPath.includes("/healthTopic/")) {
      setIsSearchBar(true);
    } else {
      setIsSearchBar(false);
    }
  };

  return (
    <div className={classes.grow}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography
            className={classes.title}
            variant="h6"
            edge="start"
            noWrap
          >
            Doccords
          </Typography>
          {isSearchBar ? (
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder={searchPlaceholder}
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
              />
            </div>
          ) : null}
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <SwipeableDrawer />
          </div>
          <div className={classes.sectionMobile}></div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default TopNavbar;
