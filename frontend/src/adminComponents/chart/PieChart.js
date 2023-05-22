import React from "react";
import { Pie } from "react-chartjs-2";
import { useTheme } from "@mui/material";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const PieChart = ({ dataPieChart }) => {
  const theme = useTheme();

  console.log(dataPieChart)
  // Dữ liệu và cấu hình biểu đồ
  const data = {
    labels: ["> 4 mils", "3 - 4 mils", "2 - 3 mils", "1 - 2mils", "< 1 mil"],
    datasets: [
      {
        label: "My Dataset",
        data: dataPieChart,
        backgroundColor: [
          theme.palette.secondary.main,
          theme.palette.error.main,
          theme.palette.warning.main,
          theme.palette.info.main,
          theme.palette.success.main,
        ],
        borderColor: theme.palette.common.white,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "Pie Chart Presents A Range of Price",
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
      tooltip: {  // Changed from 'tooltips' to 'tooltip'
        callbacks: {
          label: (context) => {
            const dataset = data.datasets[context.datasetIndex];
            const value = dataset.data[context.dataIndex];
            const total = dataset.data.reduce((acc, curr) => acc + curr, 0);
            const percentage = ((value / total) * 100).toFixed(2);
            return `${percentage}%`;
          },
        },
      },
    },
  };

  return (
    <div style={{ width: "90%", height: "400px" }}>
      <Pie
        data={data}
        options={options}
      />
    </div>
  );
};

export default PieChart;
