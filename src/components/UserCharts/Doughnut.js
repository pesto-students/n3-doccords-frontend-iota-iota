/* eslint-disable react/prop-types */
import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Typography, Box } from "@material-ui/core";

const DoughnutChart = (props) => {
  const chartData = Object.values(props.chartdata);
  // const colorArr = ["red", "green", "orange", "blue", "pink"];
  const colorArr = [
    "red",
    "green",
    "orange",
    "blue",
    "pink",
    "yellow",
    "purple",
    "cyan",
  ];

  const data = {
    labels: props.labels,
    datasets: [
      {
        label: "# of Votes",
        data: chartData,
        backgroundColor: colorArr.slice(0, props.labels.length),
        borderWidth: 2,
      },
    ],
  };

  return (
    <Box m={1}>
      <Typography varient="h4" align="center">
        {props.title}
      </Typography>
      <Doughnut
        data={data}
        options={{
          padding: "0px",
          responsive: true,
          maintainAspectRatio: true,
          defaultFontSize: "14px",
          width: "400px",
          height: "400px",
          legend: {
            display: false,
          },
        }}
      />
    </Box>
  );
};
export default DoughnutChart;
