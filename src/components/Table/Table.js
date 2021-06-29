/* eslint-disable react/display-name */
import React from "react";
import MaterialTable from "material-table";
import { Grid, Avatar } from "@material-ui/core";

const Table = (props) => {
  // eslint-disable-next-line react/prop-types
  const { add, edit } = props;
  // const [isMultipleSelection, setIsMultipleSelection] = React.useState(false);
  const isMultipleSelection = false;

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
          <Grid item md={4} xs={6}>
            <Avatar>{row.name[0]}</Avatar>
          </Grid>
          <Grid item xs={6} md={8}>
            {row.name}
          </Grid>
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

  // const handlADDClick () => {

  // }
  // const handlDeleteClick () => {

  // }
  const handlEditClick = (event, rowsData) => {
    console.log(event.target.value);
    if (rowsData.length > 1) {
      return alert("You can't edit more than one");
    }

    // Handle Edit click call back
    edit();
  };

  // const handlNameClick () => {

  // }

  return (
    <div>
      <MaterialTable
        title="Profiles Table"
        data={profiles}
        onSelectionChange={(rows) =>
          // rows.length > 1
          //   ? (isMultipleSelection = true)
          //   : (isMultipleSelection = false)
          console.log(rows.length)
        }
        columns={columns}
        // editable={
        //   onRowUpdate:()=>(newData)=>null,
        // }
        options={{
          search: false,
          paging: false,
          filtering: true,
          // exportButton: true,
          selection: true,
        }}
        actions={[
          {
            icon: "share",
            tooltip: "Share Profile",
            onClick: (event, rowData) => alert("You saved "),
          },
          {
            icon: "edit",
            tooltip: isMultipleSelection
              ? "You can edit only one profile"
              : "Edit Profile",
            onClick: (event, rowsData) => handlEditClick(event, rowsData),
            disabled: isMultipleSelection,
          },
          {
            icon: "add",
            tooltip: "Add Profile",
            isFreeAction: true,
            onClick: (event) => add(),
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
