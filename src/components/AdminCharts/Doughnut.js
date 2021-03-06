import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Typography, Box } from "@material-ui/core";

const data = {
  labels: ["Doc-Uploaded", "Doc-Shared", "Doc-Deleted", "Users", "Profiles"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5, 2],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
      ],
      borderWidth: 2,
    },
  ],
};

const DoughnutChart = () => (
  <Box m={1}>
    <Typography varient="h6">Complete Data Of App</Typography>
    <Doughnut
      data={data}
      options={{
        padding: "0px",
        responsive: true,
        maintainAspectRatio: true,
        defaultFontSize: "14px",
        width: "400",
        height: "400",
        legend: {
          display: false,
        },
      }}
    />
  </Box>
);

export default DoughnutChart;
