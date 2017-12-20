/*
 * Data table created with React Bootstrap Table by Allen Fang
 * http://allenfang.github.io/react-bootstrap-table
 */

import React, { Component } from 'react';
import Chart from 'chart.js';
import $ from 'jquery';
import RC2 from 'react-chartjs2';

export class DataChart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            chartData : {}
        }
        this.myChart = null; // Doesn't really fit the React lifecycle, so keep it out of state
    }

    componentDidMount() {
        /**
         * Obtain DataTable info and store in the component's state.
         */
        if (this.props && this.props.options && this.props.options.webService) {
            $.ajax({
                url: this.props.options.webService,
                dataType: 'json',
                cache: false,
                success: function(data) {
                    if (data.results) {
                        this.setState({chartData: data.results});
                    }
                }.bind(this),
                error: function(xhr, status, err) {
                    console.error(this.props.url, status, err.toString());
                }.bind(this)
            });
        }

        //this.setState({data : {datasets: [{data: [50, 30, 5, 2, 20, 30, 45]}]}});
        //console.log(this.state.data);
        // this.myChart = this.refs['canvas'].getChart();
        // this.myChart.data.datasets[0].points[2] = 50;
        // this.myChart.update();
    }

    render() {
        var chartData = this.state.chartData.length ? this.state.chartData : [];

        if (chartData && chartData.length) {

            var chartConfig = {
              labels: ['No', 'Data', 'Available'],
              datasets: [
                {
                  label: 'An error occurred while generating the chart',
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
                  data: [10, 20, 30]
                }
              ]
            };

            /**
            * Build and customize the graph based on the options received.
            */
            if (this.props.options && this.props.options.options) {
                var chartType = this.props.options.options.chartType ? this.props.options.options.chartType : 'bar';
                var xAxis = this.props.options.options.xAxis ? this.props.options.options.xAxis : 'err';
                var yAxis = this.props.options.options.yAxis ? this.props.options.options.yAxis : 'err';

                /**
                 * TODO: Create generic chart component. Investigate if all charts receive/send the same data or
                 if the xaxis/yaxis will work (probably not, options should be able to calculate percentages, group things, etc etc)
                 */

            }
        }


        return (
            <div key={this.props.theKey} className={this.props.options.bootStrapClass}>
                <div className="wrapper wrapper__content--whiteBox">
                    <RC2 data={chartConfig} type={chartType} />
                    <div className="dataTable__pagination"></div>
                </div>
            </div>

        );
    }
}
