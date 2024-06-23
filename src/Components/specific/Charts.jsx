import React from "react";
import { Line, Doughnut } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  DoughnutController,
  LineController,
  plugins,
  Filler,
} from "chart.js";
import { getLast7Days } from "../../lib/features";

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  LineController,
  Title,
  Filler,
  Tooltip,
  Legend,
  ArcElement,
  DoughnutController
);
const labels = getLast7Days();

const lineChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
  scales: {
    x: {
      grid:{
        display: false,
      }
    },
    y: {
        beginAtZero: true,
        grid:{
            display: false,
          }
    },
  },
};

const LineChart = ({value=[]}) => {
    const Data = {
        labels,
    datasets: [
      {
        label: 'Messages',
        data: value,
        fill:true,
        backgroundColor: 'rgba(75, 12, 192, 0.2)', 
        borderColor: 'rgba(75, 12, 192,1)',
        tension: 0,
      },
    ],
  };

  return <Line data={Data} options={lineChartOptions} />;
};

const DoughnutChartOptions = {
    responsive:true,
    plugins:{
        legend:{
            display:false,
        },
        title:{
            display:false,
        }
        
    },
    cutout:120,
}

const DoughnutChart = ({value=[],labels=[]}) => {
    const doughnutChartData = {
        labels,
        datasets: [
          {
            label: 'Total chats vs Group Chats',
            data: value,
            backgroundColor: ["orange","rgba(75,12,192,0.8)"
            ],
            borderColor:["orange","black"],
            hoverOffset: 2,
            offset:40,
          },
        ],
      };
  return <Doughnut style={{zIndex:"10"}} data={doughnutChartData} options={DoughnutChartOptions} />;
};

export { LineChart, DoughnutChart };
