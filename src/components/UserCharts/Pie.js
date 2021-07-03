import React from "react";
import { Pie } from "react-chartjs-2";
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
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 2,
    },
  ],
};

const PieChart = () => (
  <Box m={1} p={1}>
    <Typography varient="h6">Common Health Issues In Family</Typography>
    <Pie
      data={data}
      options={{
        padding: "0px",
        responsive: true,
        maintainAspectRatio: true,
        defaultFontSize: "14px",
        width: "400",
        height: "400px",
        legend: {
          display: false,
        },
      }}
    />
  </Box>
);

export default PieChart;
