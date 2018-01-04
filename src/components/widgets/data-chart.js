/*
 * Data table created with React Bootstrap Table by Allen Fang
 * http://allenfang.github.io/react-bootstrap-table
 */

import React, { Component } from 'react';
import Chart from 'chart.js';
import $ from 'jquery';
import './../../global.variables.js';
import { Localization, ConvertRgbToRgba } from './../../helper.functions.js';
import RC2 from 'react-chartjs2';

export class DataChart extends Component {

    constructor(props) {
        super(props);
        this.Localization = Localization;
        this.ConvertRgbToRgba = ConvertRgbToRgba;
        this.processData = this.processData.bind(this);
        this.colors = global.colors;
        this.myChart = null;
        this.data = {};
    }

    /*
     * Build data to build in the statistics chart.
     * Reference to this solution: https://stackoverflow.com/questions/21874436/summarize-and-group-json-object-in-jquery
     * TODO: Since DataChart is going to be a generic object, ensure it works in as many instances as possible.
     * Column names where values are stored are likely to change, etc.
     */
    processData() {
        var rawData = this.props.results;

        var output = rawData.reduce(function(out, curr) {

            out.dataset[curr.supplier] = out.dataset[curr.supplier] || {};
            out.dataset[curr.supplier]['supplierName'] = curr.supplier || {};
            out.dataset[curr.supplier]['totalDue'] = (out.dataset[curr.supplier]['totalDue'] || 0) + (parseInt(curr.totalDue.replace(/\s/g, "").replace(",", "")));
            out.total['total'] = (out.total['total'] || 0) + (parseInt(curr.totalDue.replace(/\s/g, "").replace(",", "")));

            return out;
        }, {'dataset' : {}, 'total':{}});
        return output;
    }

    /*
     * Build data object for the chart.
     */
    componentWillMount() {
        var chartData = this.processData(); // The new object with the aggregated data.
        var type = this.props.options.type || 'pie'; //Default to pie chart if no type was specified.
        var chartLabel = this.Localization(this.props.options.label) || '';
        var labels = [];
        var data = [];
        var backgroundColor = [];
        var borderColor = [];

        /* Build arrays used for config object */
        for (var key in chartData.dataset) {
            labels.push(chartData.dataset[key].supplierName);
            data.push(chartData.dataset[key].totalDue);
        }

        if (labels.length) {
            for (var i = 0; i < labels.length; i++) {
                borderColor.push(this.colors[i]);
                backgroundColor.push(this.ConvertRgbToRgba(this.colors[i], 0.3));
            }
        }

        this.data = {
            labels: labels,
            type: type,
            datasets: [{
                label: chartLabel,
                data: data,
                backgroundColor: backgroundColor,
                borderColor: borderColor,
                borderWidth: 1
            }]
        };
    }

    componentDidMount() {
        /**
         * Obtain DataTable info and store in the component's state.
         */

        //this.setState({data : {datasets: [{data: [50, 30, 5, 2, 20, 30, 45]}]}});
        //console.log(this.state.data);
        // this.myChart = this.refs['canvas'].getChart();
        // this.myChart.data.datasets[0].points[2] = 50;
        // this.myChart.update();
    }

    render() {
        /**
        * Build and customize the graph based on the options received.
        */

        var title__text = this.Localization(this.props.options.title);

        /**
         * TODO: Create generic chart component. Investigate if all charts receive/send the same data or
         if the xaxis/yaxis will work (probably not, options should be able to calculate percentages, group things, etc etc)
         */
        return (
            <div key={this.props.theKey} className={this.props.options.bootStrapClass}>
                <div className="wrapper wrapper__content--whiteBox">
                    <h2 className={this.props.options.titleClass}>{title__text}</h2>
                    <RC2 data={this.data} type={this.data.type} />
                </div>
            </div>

        );
    }
}
