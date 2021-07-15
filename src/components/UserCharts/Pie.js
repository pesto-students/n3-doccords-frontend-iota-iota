/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import { Pie } from "react-chartjs-2";
import { Typography, Box } from "@material-ui/core";

const PieChart = (props) => {
  // const { title, chartData, labels } = props;
  const labels = props.labels.map((item) => item.title);
  const chartData = props.chartdata.map((item) => Object.values(item)).flat(1);
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
    labels: labels,
    datasets: [
      {
        label: "# of Votes",
        data: chartData,
        backgroundColor: colorArr.slice(0, labels.length),
        borderColor: colorArr.slice(0, labels.length),
        borderWidth: 2,
      },
    ],
  };

  return (
    <Box m={1} p={1}>
      <Typography varient="h4" align="center">
        {props.title}
      </Typography>
      <Pie
        data={data}
        options={{
          padding: "0px",
          responsive: true,
          maintainAspectRatio: true,
          defaultFontSize: "14px",
          width: "400px",
          height: "400px",
          legend: {
            display: true,
          },
        }}
      />
    </Box>
  );
};

export default PieChart;
