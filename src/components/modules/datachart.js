/*
 * Data table created with React Bootstrap Table by Allen Fang
 * http://allenfang.github.io/react-bootstrap-table
 */

import React, { Component } from 'react';
import Chart from 'chart.js';
import RC2 from 'react-chartjs2';

const chartData = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [65, 59, 80, 81, 56, 55, 40],
    }
  ]
};


export class DataChart extends Component {

    constructor(props) {
        super(props);

        this.state = {
            width: '500',
            height: '500',
            data: {
                labels: ["January", "February", "March", "April", "May", "June", "July"],
                datasets: [{
                    label: "My First dataset",
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: [0, 10, 5, 2, 20, 30, 45],
                }]
            },
            options: { animation: false }
        };

        this.myChart = null; // Doesn't really fit the React lifecycle, so keep it out of state
    }

    componentDidMount() {
      // this.myChart = this.refs['canvas'].getChart();
      // this.myChart.data.datasets[0].points[2] = 50;
      // this.myChart.update();
    }

    render() {
        return (
            <section>
                <RC2 data={chartData} type='line' />
            </section>
        );
    }
}
