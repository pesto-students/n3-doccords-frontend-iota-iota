import React from "react";
import PropTypes from "prop-types";
// import { dark, light } from "@material-ui/core/styles/createPalette";
import { Switch, Button } from "@material-ui/core";

export const ThemeSwitch = ({ darkState, handleThemeChange }) => {
  return (
    <div>
      <Switch checked={darkState} onChange={handleThemeChange} />
      <Button variant="contained" color="primary">
        Theme Test
      </Button>
    </div>
  );
};

ThemeSwitch.propTypes = {
  darkState: PropTypes.bool.isRequired,
  handleThemeChange: PropTypes.func.isRequired,
};
