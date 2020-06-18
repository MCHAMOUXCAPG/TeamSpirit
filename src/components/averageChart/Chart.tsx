import React, { useState } from "react";
import "./Chart.css";
import Chart from "react-apexcharts";
import Button from "@material-ui/core/Button";

import faceverysad from "../../assets/emoji1_1x.png";
import facesad from "../../assets/emoji2_1x.png";
import faceplain from "../../assets/emoji3_1x.png";
import facesmile from "../../assets/emoji4_1x.png";
import facebigsmile from "../../assets/emoji5_1x.png";

const AverageChart = (props: any) => {
  const noteIcons = [faceverysad, facesad, faceplain, facesmile, facebigsmile];

  const iconHandler: any = () => {
    if (props.grade <= 40) {
      return noteIcons[0];
    } else if (props.grade <= 65) {
      return noteIcons[1];
    } else if (props.grade <= 70) {
      return noteIcons[2];
    } else if (props.grade <= 90) {
      return noteIcons[3];
    } else {
      return noteIcons[4];
    }
  };

  const [state, setState] = useState({
    seriesRadial: [props.grade],
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
            margin: 40,
            // size: "70%", // margin is in pixels
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
              fontSize: "0px",
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
          shadeIntensity: 1,
          inverseColors: false,
          type: "horizontal",
          opacityFrom: 1,
          opacityTo: 1,
          colorStops: [
            {
              offset: 0,
              color: "#ff8d05",
              opacity: 1,
            },
            {
              offset: 100,
              color: "#95DA74",
              opacity: 1,
            },
          ],
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
      <h1 className="grade">{props.grade}</h1>
      <img className="noteicon" src={iconHandler()} alt="note icon" />
      {/*    <Button id="ButtonStart" onClick={updateCharts} size="small">
        Start
      </Button> */}
    </div>
  );
};

export default AverageChart;
