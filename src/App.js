import React, { useState, useEffect } from "react";
import axios from "axios";
import Chart from "react-apexcharts";
import "./App.css";

const App = () => {
  const [requests, setRequests] = useState([]);
  const [hotelRequests, setHotelRequests] = useState({});
  const [chartOptions, setChartOptions] = useState({
    chart: {
      type: "line", // Change type to 'line'

      toolbar: {
        show: false, // Hide chart toolbar
      },
    },
    xaxis: {
      categories: [],
    },
    yaxis: {
      labels: {
        formatter: (value) => value.toFixed(0), // Format Y-axis labels as whole numbers
      },
      tickAmount: 4, // Adjust the tick amount to show ticks from 0 to 8
      tickPlacement: "between", // Place ticks between categories
      min: 0, // Set minimum value of Y-axis
      max: 8, // Set maximum value of Y-axis
    },
    title: {
      text: "Requests Per Hotel", // Title of the chart
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
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://checkinn.co/api/v1/int/requests"
        );
        setRequests(response.data.requests);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
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
      {" "}
      <div>
        <div className="chart-container">
          <Chart
            options={chartOptions}
            series={[{ data: Object.values(hotelRequests) }]}
            type="line" // Change type to 'line'
            width="100%" // Set width of chart to 100%
          />
        </div>

        <p className="total-req">Total Requests: {requests.length}</p>
      </div>
    </div>
  );
};

export default App;
