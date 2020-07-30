import React, { useState, useEffect } from "react";
import "./historicAverageChart.css";
import Chart from "react-apexcharts";

const HistoricChart = (props: any) => {
  const [state, setState] = useState({
    series: [
      {
        name: "Low - 2013",
        data: [10, 9, 7.77, 8, 7, 3.77, 3.66],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "line",
        dropShadow: {
          enabled: true,
          color: "#000",
          top: 18,
          left: 7,
          blur: 10,
          opacity: 0.2,
        },
        toolbar: {
          show: false,
        },
      },
      colors: ["#77B6EA", "#545454"],
      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: "smooth",
      },
      grid: {
        borderColor: "#e7e7e7",
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },
      markers: {
        size: 1,
      },
      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
        title: {
          text: "Time",
        },
      },
      yaxis: {
        title: {
          text: "Average",
        },
        min: 0,
        max: 10,
      },
      legend: {
        position: "top",
        horizontalAlign: "right",
        floating: true,
        offsetY: -25,
        offsetX: -5,
      },
    },
  });
  useEffect(() => {
    updateCharts();
    // eslint-disable-next-line
  }, [props]);
  function updateCharts() {
    setState({
      ...state,
      series: [{ name: "Survey", data: props.Data }],
      options: {
        ...state.options,
        yaxis: {
          title: {
            text: "Average",
          },
          min: Math.min(...props.Data),
          max: Math.max(...props.Data),
        },
        xaxis: {
          categories: props.period,
          title: {
            text: "Period",
          },
        },
      },
    });
  }
  return (
    <Chart
      options={state.options}
      series={state.series}
      type="line"
      height={350}
    />
  );
};
export default HistoricChart;
