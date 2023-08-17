import React from "react";
import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

import { Bar } from "react-chartjs-2";
import styled from "styled-components";
import { useGlobalContext } from "../../context/GlobalContext";
import { dateFormat } from "../../utils/DateFormat";

ChartJs.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Chart = () => {
  const { incomes, expenses } = useGlobalContext();

  const incomeMap = [],
    expenseMap = [];
  for (let i = 0; i < 12; i++) {
    incomeMap.push(0);
    expenseMap.push(0);
  }

  for (let inc of incomes) {
    incomeMap[Number.parseInt(dateFormat(inc.date).slice(3, 5)) - 1] +=
      inc.amount;
  }
  for (let exp of expenses) {
    expenseMap[Number.parseInt(dateFormat(exp.date).slice(3, 5)) - 1] +=
      exp.amount;
  }

  // console.log(incomeMap,expenseMap)

  const data = {
    labels: [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC",
    ],
    datasets: [
      {
        label: "Income",
        data: incomeMap,
        backgroundColor: "rgba(0,255,0,0.3)",
        hoverBackgroundColor: "rgba(0,255,0,1)",
      },
      {
        label: "Expenses",
        data: expenseMap,
        backgroundColor: "rgba(255,0,0,0.3)",
        hoverBackgroundColor: "rgba(255,0,0,1)",
      },
    ],
  };

  const options = {
    animationEnabled: true,
    maintainAspectRatio: false,
    responsive: true,
    layout: {
      padding: "10",
    },
    plugins: {
      legend: {
        position: "top",
        labels: {
          padding: 20,
          usePointStyle: true,
          useBorderRadius: true,
          borderRadius: 3,
          font: {
            size: "13",
            family: "Roboto Mono",
            style: "italic",
          },
          color: "rgba(250, 227,146,.5)",
        },
      },
      tooltip: {
        usePointStyle: true,
        backgroundColor: "#241468",
        bodyAlign: "center",
        titleAlign: "center",
        titleSpacing: 4,
        bodyFont: {
          size: 12,
          family: "Roboto Mono",
          style: "italic",
        },
        titleFont: {
          size: 15,
          family: "Roboto Mono",
          style: "italic",
        },
        // titleFont : 'Roboto Mono',
        padding: 10,
        boxWidth: 15,
        boxHeight: 10,
        bodyColor: "rgba(250,221,146,1)",
        titleColor: "rgba(250,221,146,1)",
        caretPadding: 10,
        caretSize: 8,
        borderColor: "#068fff",
        borderWidth: 1,
      },
    },
    scales: {
      y: {
        ticks: {
          color: "rgba(250,221,146,.8)",
          font: {
            size: 10,
            family: "Roboto Mono",
            style: "italic",
          },
        },
        grid: {
          color: "rgba(250, 227,146,.5)",
        },
      },
      x: {
        ticks: {
          display: true,
          color: "rgba(250,221,146,.8)",
          font: {
            size: 10,
            family: "Roboto Mono",
            style: "italic",
          },
        },
        grid: {
          display: false,
        },
      },
    },
  };

  const plugin = {
    id: "customCanvasBackgroundColor",
    beforeDraw: (chart, args, options) => {
      const { ctx } = chart;
      ctx.save();
      ctx.globalCompositeOperation = "destination-over";
      ctx.fillStyle = options.color || "#252B4A";
      ctx.fillRect(0, 0, chart.width, chart.height);
      ctx.restore();
    },
  };

  return (
    <ChartStyled>
      <Bar options={options} data={data} plugins={[plugin]} />
    </ChartStyled>
  );
};

const ChartStyled = styled.div`
  position: relative;
  /* background: #FCF6F9; */
  /* border: 2px solid #FFFFFF; */
  /* box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06); */
  /* padding: 1rem; */
  /* border-radius: 20px; */
  max-width: 700px;
  height: 350px;
  min-height: 150px;
`;

export default Chart;
