/* eslint-disable react/display-name */
import React from "react";
import MaterialTable from "material-table";
import { Grid, Avatar } from "@material-ui/core";

const Table = () => {
  const profiles = [
    {
      name: "Ramlal",
      relationship: "self",
      uploadedDoc: 34,
      sharedDoc: 20,
    },
    {
      name: "shamlal",
      relationship: "brother",
      uploadedDoc: 30,
      sharedDoc: 10,
    },
    {
      name: "Jeeta",
      relationship: "Mother",
      uploadedDoc: 60,
      sharedDoc: 20,
    },
    {
      name: "Reeta",
      relationship: "sistor",
      uploadedDoc: 33,
      sharedDoc: 15,
    },
  ];
  const columns = [
    {
      title: "Name",
      field: "name",
      render: (row) => (
        <Grid container alignItems="center">
          <Grid item sm={2}>
            <Avatar>{row.name[0]}</Avatar>
          </Grid>
          <Grid item>{row.name}</Grid>
        </Grid>
      ),
    },
    {
      title: "Relationship",
      field: "relationship",
    },
    {
      title: "Uploaded Doc",
      field: "uploadedDoc",
    },
    {
      title: "Shared Doc",
      field: "sharedDoc",
    },
  ];

  return (
    <div>
      <MaterialTable
        title="Profiles Table"
        data={profiles}
        onSelectionChange={(row) => console.log(row)}
        columns={columns}
        options={{
          search: false,
          paging: false,
          filtering: true,
          exportButton: true,
          selection: true,
        }}
        actions={[
          {
            icon: "add",
            tooltip: "Add Profile",
            isFreeAction: true,
            onClick: (event) => alert("You want to add a new Profile"),
          },
          {
            icon: "delete",
            tooltip: "Delete User",
            onClick: (event, rowData) =>
              confirm("You want to delete " + rowData.name),
          },
        ]}
      />
    </div>
  );
};

export default Table;
