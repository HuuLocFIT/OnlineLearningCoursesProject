import React from "react";
import { Line } from "react-chartjs-2";
import { useTheme } from "@mui/material";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = ({dataNumberOfStudents, dataNumberOfCourses, dataRevenues}) => {
  const theme = useTheme();

  const datasets = [
    {
      label: "Number of Students",
      data: dataNumberOfStudents,
      fill: false,
      borderColor: "rgb(75, 192, 192)",
      tension: 0.1,
    },
    {
      label: "Number of Courses",
      data: dataNumberOfCourses,
      fill: false,
      borderColor: "rgb(255, 99, 132)",
      tension: 0.1,
    },
    {
      label: "Revenues",
      data: dataRevenues,
      fill: false,
      borderColor: "rgb(54, 162, 235)",
      tension: 0.1,
    },
  ];

  const data = {
    labels: [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ],
    datasets,
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: "category",
        offset: true,
        ticks: {
          color: theme.palette.neutral[100], // Màu sắc của nhãn trục x
        },
      },
      y: {
        min: Math.min(...datasets.flatMap((dataset) => dataset.data)),
        max: Math.max(...datasets.flatMap((dataset) => dataset.data)),
        ticks: {
          color: theme.palette.neutral[100], // Set the color of y-axis labels
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: theme.palette.neutral[100], // Màu sắc của các nhãn trong legend
        },
      },
    },
  };

  return (
    <div style={{ width: "90%", height: "400px" }}>
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;
