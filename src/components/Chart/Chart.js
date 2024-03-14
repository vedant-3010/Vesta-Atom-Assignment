import React from 'react';
import Chart from 'react-apexcharts';

const ChartComponent = ({ options, series }) => {
  return (
    <div className="chart-container">
      <Chart options={options} series={series} type="line" width="100%" />
    </div>
  );
};

export default ChartComponent;
