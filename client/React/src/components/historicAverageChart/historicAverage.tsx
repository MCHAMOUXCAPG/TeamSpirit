import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";

const HistoricChart = (props: any) => {
  let averageNotes: number[] = [];
  let rangeDates: string[] = [];
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
          show: true,
          offsetX: 0,
          offsetY: 0,
          tools: {
            download: true,
            selection: false,
            zoomin: true,
            zoomout: true,
            pan: false,
            zoom: false,
            reset: false,
          },
          export: {
            csv: {
              filename: undefined,
              columnDelimiter: ",",
              headerCategory: "category",
              headerValue: "value",
            },
          },
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
        padding: {
          left: 40,
          right: 0,
        },
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

  // Adds into new arrays the data revieved from the service to be able to show in the chart.
  useEffect(() => {
    props.historic.map((s: any, index: any) => {
      averageNotes.push(s.TotalAverage.toFixed(2));
      rangeDates.push(
        s.StartDate.substr(8, 2) +
          "/" +
          s.StartDate.substr(5, 2) +
          " - " +
          s.EndDate.substr(8, 2) +
          "/" +
          s.EndDate.substr(5, 2)
      );
      return null; //Placed here to avoid a warning.
    });

    updateCharts();
    // eslint-disable-next-line
  }, [props]);

  // Function that updates the chart with the data that we want to provide.
  function updateCharts() {
    setState({
      ...state,
      series: [
        {
          name: "Survey",
          data: averageNotes.reverse(),
        },
      ],
      options: {
        ...state.options,
        yaxis: {
          title: {
            text: "Average",
          },
          min:
            Math.min(...averageNotes) === Math.max(...averageNotes)
              ? 0
              : Math.min(...averageNotes),
          max:
            Math.max(...averageNotes) === Math.min(...averageNotes)
              ? 10
              : Math.max(...averageNotes),
        },
        xaxis: {
          categories: rangeDates.reverse(),
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
