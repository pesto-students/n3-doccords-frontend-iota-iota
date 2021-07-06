import React from "react";
import { Line } from "react-chartjs-2";
import { Typography, Box } from "@material-ui/core";

const data = {
  labels: ["1", "2", "3", "4", "5", "6"],
  datasets: [
    {
      label: "Cancer",
      data: [12, 19, 3, 5, 2, 3],
      fill: false,
      backgroundColor: "rgb(255, 99, 132)",
      borderColor: "rgba(255, 99, 132, 0.2)",
    },
  ],
};

// const options = {
//   scales: {
//     yAxes: [
//       {
//         ticks: {
//           beginAtZero: true,
//         },
//       },
//     ],
//   },
// };

const LineChart = () => (
  <Box m={1}>
    <Typography variant="h6">Articles Under Common Health Issues</Typography>
    <Line
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

export default LineChart;
