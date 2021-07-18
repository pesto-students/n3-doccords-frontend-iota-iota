/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { fade, withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import MoreIcon from "@material-ui/icons/MoreVert";
import { useAuth } from "context/AuthContext";
import { clearUserDetail } from "apiRequests/user";
import { LOGIN } from "navigation/constants";
import { searchString } from "redux/actions/common";

const styles = (theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  menu: {
    padding: theme.spacing(2),
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.5),
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
    width: theme.spacing(7),
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
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200,
    },
  },
});

const ToolbarComponent = ({ classes, openDrawerHandler }) => {
  const dispatch = useDispatch();
  const searchIn = useSelector((state) => state.common.searchLocationIsAtHome);
  const healthTopicsList = useSelector((state) => state.common.healthTopics);
  const articleList = useSelector((state) => state.common.articles);
  const [anchorEl, setAnchorEl] = useState(false);
  const history = useHistory();
  const { logout, currentUser } = useAuth();
  // let search;
  const search = searchIn
    ? {
        placeholder: "Search Health Topics",
        data: healthTopicsList,
      }
    : {
        placeholder: "Search Articles",
        data: articleList,
      };

  useEffect(() => {
    // setSearch();
    return () => {};
  }, []);

  const handleSearchChange = (e) => {
    dispatch(searchString(e.target.value));
  };

  const handleLogout = () => {
    logout();
    handleMenuClose();
    history.push("/login");
    clearUserDetail(dispatch);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const isMenuOpen = Boolean(anchorEl);
  const renderLoginOrLogout = () => {
    if (currentUser) {
      return <MenuItem onClick={handleLogout}>Logout</MenuItem>;
    } else {
      return (
        <MenuItem button component={Link} to={LOGIN}>
          Login / Register
        </MenuItem>
      );
    }
  };
  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      className={classes.menu}
    >
      {/* <MenuItem onClick={handleLogout}>Logout</MenuItem> */}
      {renderLoginOrLogout()}
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            onClick={openDrawerHandler}
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            Doccords
          </Typography>
          {searchIn !== null && (
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder={search.placeholder}
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
                onChange={(e) => handleSearchChange(e)}
              />
            </div>
          )}
          <div className={classes.grow} />
          <div>
            <IconButton
              aria-label="show more"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </div>
  );
};

export default withStyles(styles)(ToolbarComponent);
