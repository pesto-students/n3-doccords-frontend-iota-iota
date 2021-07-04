import { Typography, Box } from "@material-ui/core";
import React from "react";
import { Bar } from "react-chartjs-2";

const data = {
  labels: ["February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "Documents Deleted",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: "rgb(255, 99, 132)",
    },
    {
      label: "Documents Uploaded",
      data: [2, 3, 20, 5, 1, 4],
      backgroundColor: "rgb(54, 162, 235)",
    },
    {
      label: "Documents Shared",
      data: [3, 10, 13, 15, 22, 30],
      backgroundColor: "rgb(75, 192, 192)",
    },
  ],
};

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

const StackedBar = () => (
  <Box m={1}>
    <Typography variant="h6">Monthly Document Status </Typography>
    <Bar
      data={data}
      options={{
        padding: "0px",
        responsive: true,
        maintainAspectRatio: true,
        defaultFontSize: "14px",
        width: "100vw",
        height: "400",
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

export default StackedBar;
