import './../global.variables.js';
import React, { Component } from 'react';
import { RequestWidget, Async, ObjectToArray } from './../helper.functions.js';
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

const endpoints = {
    accountsPayable:  {
        prod: global.paths.prod+'/services/finance/accounts-payable',
        dev: '/webservices/AccountsPayable.json'
    },
    cashDisbursement: {
        prod: global.paths.prod+'/services/finance/accounts-payable/cash-disbursement',
        dev: '/webservices/AccountsPayableCashDisbursement.json'
    },
    summary: {
        prod: global.paths.prod+'/services/finance/accounts-payable/summary',
        dev: '/webservices/AccountsPayableSummary.json'
    },
    toolBox: {
        prod: null, /* TODO: */
        dev: '/webservices/AccountsPayableToolbox.json'
    },
    sliding: {
        prod: null, /* TODO: */
        dev: '/webservices/AccountsPayableSlidingToolBox.json'
    }
};

const options = {
    breadcrumbs: [{
        name:'dashboard',
        path:'http://google.com'
    }, {
        name:'financials',
        path:'http://google.com'
    },{
        name:'Accounts Payable',
        path:'http://google.com' }],
    widgets : [{
        name: 'toolBox',
        endpoint: endpoints.toolBox.dev
    }, {
        name: 'dataTable',
        endpoint: endpoints.accountsPayable.dev,
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
        endpoint: endpoints.cashDisbursement.dev,
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
        endpoint: endpoints.cashDisbursement.dev,
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
        endpoint: endpoints.summary.dev,
        bootStrapClass: 'col-lg-6 col-sm-12',
        tableSize: 'dataTable--halfWidth',
        trClassName: 'dataTable__row--content',
        tableHeaderClass: 'dataTable__row--header',
        options: {},
        tableHeaders: ['name', 'type', 'balance',  'checkPaid', 'address', 'city', 'province', 'currentPeriodAMT', 'lastCheckDate', 'lastInvoiceDate', 'supNum', 'telephone', 'ytdamount'],
        sortBy: ['name', 'balance', 'city']
    }, {
        name: 'slidingToolbox',
        endpoint: endpoints.sliding.dev
    }
]
};

export class AccountsPayable extends Component {

    constructor(props) {
      super(props);
      this.requestWidget = RequestWidget;
      this.async = Async;
      this.toolBox = [];
      this.widgets = [];
      this.state = {
          widgets: []
      };
    }

    componentDidMount() {
        var requestsArray = [];
        var componentArray = [];
        var arr = [];


        /** Extract the data table information from the options array */
        if (options && options.widgets) {
            for (var i = 0; i < options.widgets.length; i++) {
                // add logic to tell apart components here
                if (options.widgets[i].name && options.widgets[i].endpoint) {
                    requestsArray.push(this.requestWidget(options.widgets[i]));
                }
            }
        }

        /**
         * Build the page here with all the widgets provided in the config.
         * @param this {Object} emcompasses the entire scope of this component.
         * @param requestsArray {Array} An array of AJAX requests to be executed on the when()
         * clause of the async function
         * @param function {Function} Anonymous function The callback function to execute when the JavaScript promise returns a positive result.
         **/

        this.async(this, requestsArray, function(data) {
            var widgets = [];

            if (data) {
                /* Set the state variables for all the information obtained in the waterfall of AJAX calls */
                for (var i = 0; i < data.widgets.length; i++) {

                    if (data.widgets[i].widget.name === 'toolBox' && data.widgets[i].arr.length) {
                        widgets.push(<BreadCrumbs index={i} key={i} breadcrumbs={options.breadcrumbs}><ToolBox key={i} options={data.widgets[i].widget} results={data.widgets[i].arr} /></BreadCrumbs>);
                    }

                    // if there are widget of datatable type
                    if (data.widgets[i].widget.name === 'dataTable' && data.widgets[i].arr.length) {
                        widgets.push(<DataTable index={i} key={i} options={data.widgets[i].widget} results={data.widgets[i].arr} />);
                    }

                    // if there are widgets of type chart
                    if (data.widgets[i].widget.name === 'dataChart' && data.widgets[i].arr.length) {
                        widgets.push(<DataChart index={i} key={i} options={requestsArray[i].widget} results={data.widgets[i].arr} />);
                    }

                    // if there are widgets of type sliding tool box
                    if (data.widgets[i].widget.name === 'slidingToolbox' && data.widgets[i].arr.length) {
                        widgets.push(<SlidingToolBox index={i} key={i} options={requestsArray[i].widget} results={data.widgets[i].arr} />);
                    }
                }
            }

            data.that.setState({widgets: widgets});

        });

    }

    render() {
        return (
            <div>
                {this.state.widgets}
            </div>
        );
    }
};

export default AccountsPayable;
