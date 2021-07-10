import React from "react";
import { PolarArea } from "react-chartjs-2";
import { Typography, Box } from "@material-ui/core";

const data = {
  labels: [
    "Cancer",
    "Blood Pressure",
    "Sugar",
    "Covid-19",
    "Skin Related",
    "Hair fall",
  ],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        "rgba(255, 99, 132, 0.5)",
        "rgba(54, 162, 235, 0.5)",
        "rgba(255, 206, 86, 0.5)",
        "rgba(75, 192, 192, 0.5)",
        "rgba(153, 102, 255, 0.5)",
        "rgba(255, 159, 64, 0.5)",
      ],
      borderWidth: 2,
    },
  ],
};

const Polar = () => (
  <Box m={1} p={1}>
    <Typography varient="h6">Articles Under Common Health Issues</Typography>
    <PolarArea
      data={data}
      options={{
        padding: "0px",
        responsive: true,
        maintainAspectRatio: true,
        defaultFontSize: "14px",
        width: "400vw",
        height: "400",
        legend: {
          display: false,
        },
      }}
    />
  </Box>
);

export default Polar;
