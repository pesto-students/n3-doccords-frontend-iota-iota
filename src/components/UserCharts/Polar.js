/* eslint-disable react/prop-types */
import React from "react";
import { PolarArea } from "react-chartjs-2";
import { Typography, Box } from "@material-ui/core";

const Polar = (props) => {
  // const { titlesArr, topHealthTopics } = props;
  const labels = props.labels.map((item) => item.title);
  const chartData = Object.values(props.data);
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
        borderWidth: 2,
      },
    ],
  };

  return (
    <Box m={1} p={1}>
      <Typography varient="h4" align="center">
        {/* Articles Under Family Health Issues */}
        {props.title}
      </Typography>
      <PolarArea
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

export default Polar;
