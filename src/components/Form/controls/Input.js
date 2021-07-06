import React from "react";
import { TextField } from "@material-ui/core";

export default function Input(props) {
  // eslint-disable-next-line react/prop-types
  const { name, label, value, onChange, error, helperText } = props;
  return (
    <TextField
      variant="outlined"
      // size="small"
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      error={error}
      helperText={helperText}
    />
  );
}
