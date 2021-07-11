/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import { Pie } from "react-chartjs-2";
import { Typography, Box } from "@material-ui/core";

const PieChart = (props) => {
  // const { title, chartData, labels } = props;
  const labels = props.labels.map((item) => item.title);
  const chartData = props.chartdata.map((item) => Object.values(item)).flat(1);
  const colorArr = ["red", "green", "orange", "blue", "pink"];

  console.log("this is labels", labels);
  console.log("this is chartData", chartData);
  console.log("this is incoming chartData", props.chartdata);

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
      <Typography varient="h6" align="center">
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
            display: false,
          },
        }}
      />
    </Box>
  );
};

export default PieChart;
