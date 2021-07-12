/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Typography, Box } from "@material-ui/core";
import React from "react";
import { Bar } from "react-chartjs-2";

// const options = {
//   scales: {
//     yAxes: [
//       {
//         stacked: true,
//         ticks: {
//           beginAtZero: true,
//         },
//       },
//     ],
//     xAxes: [
//       {
//         stacked: true,
//       },
//     ],
//   },
// };

const StackedBar = ({ chartData, title }) => {
  console.log(chartData);
  const labels = chartData.map((item) => item.name);
  const uploadDoc = chartData.map((item) => item.uploadedDoc);
  const sharedDoc = chartData.map((item) => item.sharedDoc);
  console.log(labels);
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
      // {
      //   label: "Documents Shared",
      //   data: [3, 10, 13, 15, 22, 30],
      //   backgroundColor: "rgb(75, 192, 192)",
      // },
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
