import React from "react";
import { Bar } from "react-chartjs-2";
import { useTheme } from "@mui/material";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ( {dataNumberOfClients, dataNumberOfCourses} ) => {
  const theme = useTheme();

  const datasets = [
    {
      label: "Clients",
      data: dataNumberOfClients,
      backgroundColor: theme.palette.blueAccent[400],
      borderColor: theme.palette.blueAccent.primary,
      borderWidth: 1,
    },
    {
      label: "Courses",
      data: dataNumberOfCourses,
      backgroundColor: theme.palette.greenAccent[400],
      borderColor: theme.palette.blueAccent.primary,
      borderWidth: 1,
    },
  ]

  // Dữ liệu và cấu hình biểu đồ
  const data = {
    labels: [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ],
    datasets
  };

  const options = {
    maintainAspectRatio: false,
    scales: {
      y: {
        min: Math.min(...datasets.flatMap((dataset) => dataset.data)),
        max: Math.max(...datasets.flatMap((dataset) => dataset.data)),
        ticks: {
          color: theme.palette.neutral[100], // Set the color of y-axis labels
        },
        // beginAtZero: true,
      },
      x: {
        ticks: {
          color: theme.palette.neutral[100], // Màu sắc của nhãn trục x
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: "Bar Chart Between Clients And Courses",
        font: {
          size: "16px"
        },
        color: theme.palette.neutral[100], // Màu sắc của các nhãn trong legend
      },
      legend: {
        labels: {
          color: theme.palette.neutral[100], // Màu sắc của các nhãn trong legend
        },
      },
    },
  };

  return (
    <div style={{ width: "90%", height: "400px" }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;
