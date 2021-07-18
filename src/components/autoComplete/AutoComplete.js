import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

// eslint-disable-next-line react/prop-types
export default function MyAutoComplete({ list, handleHealthSelection, value }) {
  return (
    <Autocomplete
      id="combo-box-demo"
      // eslint-disable-next-line react/prop-types
      options={list.map((t) => t)}
      getOptionLabel={(option) => option.title}
      style={{ width: 400 }}
      value={value}
      onChange={(event, value) =>
        value !== null ? handleHealthSelection(value) : console.log("its null")
      }
      renderInput={(params) => (
        <TextField {...params} label="Select Health Topic" variant="outlined" />
      )}
    />
  );
}
