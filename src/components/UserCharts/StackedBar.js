/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Typography, Box } from "@material-ui/core";
import React from "react";
import { Bar } from "react-chartjs-2";

const StackedBar = ({ chartData, title, isAdmin = false }) => {
  const labels = isAdmin
    ? chartData.map((item) => item.name)
    : chartData.map((item) => item.name);
  const uploadDoc = isAdmin
    ? chartData.map((item) => item.uploadedCount)
    : chartData.map((item) => item.uploadedDoc);
  const sharedDoc = isAdmin
    ? chartData.map((item) => item.sharedCount)
    : chartData.map((item) => item.sharedDoc);

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Documents Uploaded",
        data: uploadDoc,
        backgroundColor: "rgb(255, 99, 132)",
      },
      {
        label: "Documents Shared",
        data: sharedDoc,
        backgroundColor: "rgb(54, 162, 235)",
      },
    ],
  };

  return (
    <Box m={1} p={1}>
      <Typography variant="h6" align="center">
        {title}
      </Typography>
      <Bar
        data={data}
        options={{
          padding: "0px",
          responsive: true,
          maintainAspectRatio: true,
          defaultFontSize: "14px",
          width: "400px",
          height: "30vh",
          legend: {
            display: true,
          },
          scales: {
            yAxes: [
              {
                stacked: true,
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
            xAxes: [
              {
                stacked: true,
              },
            ],
          },
        }}
      />
    </Box>
  );
};

export default StackedBar;
