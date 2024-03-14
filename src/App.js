import React, { useState, useEffect } from "react";
import ChartComponent from "../src/components/Chart/Chart";
import "./App.css";
import fetchData from "../src/utils/api";

const App = () => {
  const [requests, setRequests] = useState([]);
  const [hotelRequests, setHotelRequests] = useState({});
  const [chartOptions, setChartOptions] = useState({
    chart: {
      type: "line",
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories: [],
    },
    yaxis: {
      labels: {
        formatter: (value) => value.toFixed(0),
      },
      tickAmount: 4,
      tickPlacement: "between",
      min: 0,
      max: 8,
    },
    title: {
      text: "Requests Per Hotel",
      align: "center",
      margin: 10,
      style: {
        fontSize: "16px",
        fontWeight: "bold",
      },
    },
    tooltip: {
      y: {
        title: {
          formatter: function (value) {
            return "Requests :";
          },
        },
      },
      style: {
        fontSize: "12px",
        width: "100px",
      },
    },
  });

  useEffect(() => {
    fetchData().then((data) => {
      setRequests(data);
    });
  }, []);

  useEffect(() => {
    const hotelRequestCounts = requests.reduce((acc, request) => {
      const { hotel } = request;
      const hotelName = hotel.name;

      acc[hotelName] = (acc[hotelName] || 0) + 1;

      return acc;
    }, {});

    setHotelRequests(hotelRequestCounts);
  }, [requests]);

  useEffect(() => {
    setChartOptions({
      ...chartOptions,
      xaxis: {
        categories: Object.keys(hotelRequests),
      },
    });
  }, [hotelRequests]);

  return (
    <div className="center-content">
      <ChartComponent
        options={chartOptions}
        series={[{ data: Object.values(hotelRequests) }]}
      />
      <p className="total-req">Total Requests: {requests.length}</p>
    </div>
  );
};

export default App;
