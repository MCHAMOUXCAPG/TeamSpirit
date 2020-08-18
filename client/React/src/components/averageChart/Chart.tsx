import React, { useState, useEffect } from "react";
import { CircularProgress, Grid } from "@material-ui/core";
import Chart from "react-apexcharts";
import cryface from "../../assets/emoji_1.png";
import verysadface from "../../assets/emoji_3.png";
import sadface from "../../assets/emoji_4.png";
import plainface from "../../assets/emoji_5.png";
import smileface from "../../assets/emoji_7.png";
import happyface from "../../assets/emoji_9.png";
import bigsmileface from "../../assets/emoji_10.png";
import colors from "../../config/colors";
import "./Chart.css";

const AverageChart = (props: any) => {
  let customGrade = props.grade * 10;
  /*List of emoticons to use to represent the team average*/
  const noteIcons = [
    cryface,
    verysadface,
    sadface,
    plainface,
    smileface,
    happyface,
    bigsmileface,
  ];
  /* Function that chooses the emoticon, according to the average*/
  const iconHandler: any = () => {
    if (customGrade <= 20) {
      return noteIcons[0];
    } else if (customGrade <= 40) {
      return noteIcons[1];
    } else if (customGrade <= 55) {
      return noteIcons[2];
    } else if (customGrade <= 70) {
      return noteIcons[3];
    } else if (customGrade <= 80) {
      return noteIcons[4];
    } else if (customGrade <= 90) {
      return noteIcons[5];
    } else {
      return noteIcons[6];
    }
  };
  /*Graphics settings*/
  const [state, setState] = useState({
    seriesRadial: [customGrade],
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
  useEffect(() => {
    updateCharts();
    // eslint-disable-next-line
  }, [props]);
  function updateCharts() {
    setState({
      ...state,
      seriesRadial: [customGrade],
    });
  }
  return (
    <div id="chart">
      {props.loading ? (
        <Grid container direction="row" justify="center">
          <CircularProgress
            size={24}
            style={{
              color: colors.primary,
            }}
          />
        </Grid>
      ) : (
        <>
          <Chart
            options={state.options}
            series={state.seriesRadial}
            type="radialBar"
          />
          <h1 className="grade">{props.grade}</h1>
          <img className="noteicon" src={iconHandler()} alt="note icon" />
        </>
      )}
    </div>
  );
};

export default AverageChart;
