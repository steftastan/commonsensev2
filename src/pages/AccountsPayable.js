import './../global.variables.js';
import $ from 'jquery';
import React, { Component } from 'react';
import { GetWidget, ObjectToArray } from './../helper.functions.js';
import { BreadCrumbs } from './../components/layout/breadcrumbs.js';
import { ToolBox } from './../components/widgets/toolbox.js';
import { DataTable } from './../components/widgets/datatable.js';
import { DataChart } from './../components/widgets/data-chart.js';
import { SlidingToolBox } from './../components/widgets/sliding-toolbox.js';

/** ACCOUNTS PAYABLE
 *
 * Options config object
 * @param widgets {Array} Contains an array of objects for each Data Table that needs to be displayed.
 *
 * Key/Value options available for the widget variable.
 *** @param webService {String} the URL to Web Service where data for that table can be fetched.
 *** @param bootStrapClass {String} the bootstrap grid class to allow our table to be responsive.
 *** @param tableSize {String} CSS class that determines if the table should span full width or half-width.
 *** @param trClassName {String} Part of BootStrap table config, passes a class to the table's rows.
 *** @param tableHeaderClass {String} Part of BootStrap table config, passes a class to the table's header.
 *** @param options {Object} This optional parameter allows to override default options for the widget.
 *** More information on what data can be passed via table options is available at src/components/modules/datatable.js
 *** @param tableHeaders {Array} The list of header/rows per table. Every row that needs to be displayed *MUST* appear
 *** here. Additionally, the DataTable widget will transform the camelCase names into Standard Case words by adding
 *** a space after every uppercase letter it finds.
 *** @param filterBy {Array} a list of the columns that will have a TextBox to filter results.
 *** @param sortBy {Array} a list of the columns that will have a TextBox to filter results.
 *
 * NOTE: Regarding filterBy and sortBy, the values provided MUST MATCH the names of the
 * key/columns received from the WS response, or else the association will fail.
 *
 */

const options = {
    breadcrumbs: [{
        name:'dashboard',
        code:'7'
    }, {
        name:'financials',
        code:'5'
    },{
        name:'Accounts Payable',
        path:'#'
    }],
    widgets : [{
        name: 'toolBox',
        endpoint: global.endpoints.toolBox.dev
    }, {
        name: 'dataTable',
        endpoint: global.endpoints.accountsPayable.dev,
        bootStrapClass : 'col-12',
        tableSize: 'dataTable--fullWidth',
        trClassName: 'dataTable__row--content',
        tableHeaderClass: 'dataTable__row--header',
        options: {
            sizePerPageList: [ {
            text: '25', value: 25
            }, {
            text: '50', value: 50
            }, {
            text: '500', value: 500
            }],
            sizePerPage: 25
        },
        tableHeaders: ['id', 'supplier', 'address', 'city', 'province', 'telephone', 'balanceDue', 'lastInvoice'],
        filterBy: ['id', 'supplier', 'address'],
        sortBy: ['id', 'supplier', 'address', 'city', 'province', 'telephone', 'balanceDue', 'lastInvoice']
    }, {
        name: 'dataTable',
        title: 'cashDisbursement',
        titleClass: 'dataTable__title',
        endpoint: global.endpoints.cashDisbursement.dev,
        bootStrapClass: 'col-lg-6 col-sm-12',
        tableSize: 'dataTable--halfWidth',
        trClassName: 'dataTable__row--content',
        tableHeaderClass: 'dataTable__row--header',
        options: {},
        tableHeaders: ['location', 'currentWeek', 'totalDue', 'currency', 'type'],
        sortBy: ['location', 'totalDue']
    }, {
        name: 'dataChart',
        title: 'accountsPayableChart',
        titleClass: 'dataTable__title',
        endpoint: global.endpoints.cashDisbursement.dev,
        bootStrapClass: 'col-lg-6 col-sm-12',
        type: 'pie',
        aggregateBy: 'type',
        calculateBy: 'totalDue',
        label: 'accountsPayableChart',
        buildTable: true
    }, {
        name: 'dataTable',
        title: 'Testing Table',
        titleClass: 'dataTable__title',
        endpoint: global.endpoints.summary.dev,
        bootStrapClass: 'col-lg-6 col-sm-12',
        tableSize: 'dataTable--halfWidth',
        trClassName: 'dataTable__row--content',
        tableHeaderClass: 'dataTable__row--header',
        options: {},
        tableHeaders: ['name', 'type', 'balance',  'checkPaid', 'address', 'city', 'province', 'currentPeriodAMT', 'lastCheckDate', 'lastInvoiceDate', 'supNum', 'telephone', 'ytdamount'],
        sortBy: ['name', 'balance', 'city']
    }, {
        name: 'slidingToolbox',
        endpoint: global.endpoints.sliding.dev
    }
]
};

export class AccountsPayable extends Component {

    constructor(props) {
      super(props);
      this.GetWidget = GetWidget;
      this.toolBox = [];
      this.widgets = [];
      this.data = [];
      this.state = {
          widgets: [],
          loaded: false
      };
    }

    /**
     * Perform all ajax tasks here
     * Maybe update the state. in any case the widgets should render and data should be applied on componentDidUpdate
     */

     componentDidUpdate(prevProps, prevState) {
       var data = {};
       var result = {};

       if (prevState.loaded !== this.state.loaded) {
           this.GetWidget(options.widgets, function(output) {
               for (var i = 0; i < options.widgets.length; i++) {
                   // add logic to tell apart components here

                    console.log(output[i]);

                    if (output[i].responseJSON && output[i].responseJSON.hasOwnProperty('results')) {
                         result = output[i].responseJSON.results;
                    } else {
                         result = output[i].responseJSON;
                    }

                    if (result) {
                        /**
                         * Transform to array in case results are returned as objects.
                         */
                        if (!(result instanceof Array)) {
                             result = Object.values(result);
                        }

                        if (options.widgets[i].name === 'dataTable') {
                            this.widgets.push(<DataTable index={i} key={i} options={options.widgets[i]} results={result} />);
                        }

                        // if there are widgets of type chart
                        if (options.widgets[i].name === 'dataChart') {
                            this.widgets.push(<DataChart index={i} key={i} options={options.widgets[i]} results={result} />);
                        }

                        // if there is a toolbox
                        if (options.widgets[i].name === 'toolBox') {
                            this.widgets.push(
                                <BreadCrumbs
                                    index={i}
                                    key={i}
                                    breadcrumbs={options.breadcrumbs}>
                                    <ToolBox
                                        key={i}
                                        options={options.widgets[i]}
                                        results={result} />
                                </BreadCrumbs>
                            );
                        }

                        // if there are widgets of type sliding tool box
                        if (options.widgets[i].name === 'slidingToolbox') {
                            this.widgets.push(
                                <SlidingToolBox
                                    index={i}
                                    key={i}
                                    options={result}
                                    results={options.widgets[i].data} />
                                );
                        }
                    }
                 }

                 this.setState({widgets: this.widgets});

           }.bind(this));
       }
     }

    componentDidMount() {
        this.setState({loaded:true});
    }

    render() {
        var spinner="this is loading";
        var spinner = (this.state.widgets && this.state.widgets.length ? <div>{this.state.widgets}</div> : <div className="spinner"></div>);
        return (
            <div>
                {spinner}
            </div>
        );
    }
};

export default AccountsPayable;
