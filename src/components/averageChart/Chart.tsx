import React, { useState } from "react";
import "./Chart.css";
import Chart from "react-apexcharts";
import Button from "@material-ui/core/Button";
function AverageChart() {
  const [state, setState] = useState({
    seriesRadial: [76],
    options: {
      chart: {
        type: "radialBar",
        offsetY: -20,
        sparkline: {
          enabled: true,
        },
      },
      plotOptions: {
        radialBar: {
          startAngle: -90,
          endAngle: 90,
          track: {
            background: "#e7e7e7",
            strokeWidth: "97%",
            margin: 5, // margin is in pixels
            dropShadow: {
              enabled: true,
              top: 2,
              left: 0,
              color: "#999",
              opacity: 1,
              blur: 2,
            },
          },
          dataLabels: {
            name: {
              show: false,
            },
            value: {
              offsetY: -2,
              fontSize: "22px",
            },
          },
        },
      },
      grid: {
        padding: {
          top: -10,
        },
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "light",
          shadeIntensity: 0.4,
          inverseColors: false,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 50, 53, 91],
        },
      },
      labels: ["Average Results"],
    },
  });
  function updateCharts() {
    setState({
      ...state,
      seriesRadial: [Math.floor(Math.random() * (90 - 50 + 1)) + 50],
    });
  }
  return (
    <div id="chart">
      <Chart
        options={state.options}
        series={state.seriesRadial}
        type="radialBar"
      />
      <Button id="ButtonStart" onClick={updateCharts} size="small">
        Start
      </Button>
    </div>
  );
}

export default AverageChart;
