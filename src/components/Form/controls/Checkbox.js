import React from "react";
import {
  FormControl,
  FormControlLabel,
  Checkbox as MuiCheckbox,
} from "@material-ui/core";

export default function Checkbox(props) {
  // eslint-disable-next-line react/prop-types
  const { name, label, value, onChange } = props;

  // const convertToDefEventPara = (name, value) => ({
  //   target: {
  //     name,
  //     value,
  //   },
  // });

  return (
    <FormControl>
      <FormControlLabel
        control={
          <MuiCheckbox
            name={name}
            color="primary"
            checked={value}
            onChange={onChange}
          />
        }
        label={label}
      />
    </FormControl>
  );
}
