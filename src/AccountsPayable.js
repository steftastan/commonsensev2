import $ from 'jquery';
import React, { Component } from 'react';
import { Layout } from './components/layout/layout.js';
import { BreadCrumbs } from './components/layout/breadcrumbs.js';
import { ToolBox } from './components/widgets/toolbox.js';
import { DataTable } from './components/widgets/datatable.js';
import { DataChart } from './components/widgets/datachart.js';
import { SlidingToolBox } from './components/widgets/sliding-toolbox.js';

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
 * TODO: it would be good to make the back-end calls using an async library.
 */


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
        webService: 'webservices/AccountsPayableToolbox.json'
    }, {
        name: 'dataTable',
        webService: 'webservices/AccountsPayable.json',
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
        webService: 'webservices/AccountsPayableCashDisbursement.json',
        bootStrapClass: 'col-lg-6 col-sm-12',
        tableSize: 'dataTable--halfWidth',
        trClassName: 'dataTable__row--content',
        tableHeaderClass: 'dataTable__row--header',
        options: {},
        tableHeaders: ['supplier', 'loc', 'currentWeek', 'totalDue', 'currency', 'type'],
        sortBy: ['supplier', 'loc', 'totalDue']
    },  {
        name: 'dataTable',
        title: 'Testing Table',
        titleClass: 'dataTable__title',
        webService: 'webservices/AccountsPayableCashDisbursement.json',
        bootStrapClass: 'col-lg-6 col-sm-12',
        tableSize: 'dataTable--halfWidth',
        trClassName: 'dataTable__row--content',
        tableHeaderClass: 'dataTable__row--header',
        options: {},
        tableHeaders: ['supplier', 'loc', 'currentWeek', 'totalDue', 'currency', 'type'],
        sortBy: ['supplier', 'loc', 'totalDue']
    }, {
        name: 'slidingToolbox',
        webService: 'webservices/AccountsPayableSlidingToolBox.json'
    }]
};

export class AccountsPayable extends Component {

    constructor(props) {
      super(props);
      this.requestComponent = this.requestComponent.bind(this);
      this.toolBox = [];
      this.widgets = [];
      this.state = {
          widgets: []
      };
    }

    /**
      * Allows to build an AJAX call object depending on the parameters passed.
      * @param widget [Object] The widget's config as it appears in the options constant.
      * @param ComponentName [Component] The name of the reactJS component for the widget.
      * @param index [Integer] index used as key internally by react.
      * @param widgetList [Array] We build this array component by component each time we call this function.
      */
    requestComponent(widget, ComponentName, index, widgetList) {
        var results;
        $.ajax({
            url: widget.webService,
            dataType: 'json',
            cache: false,
            success: function(data) {
                results = (data.results ? data.results : data);
                widgetList.push(<ComponentName key={index} index={index} options={widget} results={results} />);
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }

    componentDidMount() {
        var requestsArray = [];

        /** Extract the data table information from the options array */
        if (options && options.widgets) {
            for (var i = 0; i < options.widgets.length; i++) {
                // add logic to tell apart components here
                if (options.widgets[i].name) {

                    // if there are widgets of toolbox (top navigation) type
                    if (options.widgets[i].name === 'toolBox') {
                        this.toolBox = <ToolBox settings={options.widgets[i]}/>
                    }

                    // if there are widget of datatable type
                    if (options.widgets[i].name === 'dataTable') {
                        requestsArray.push(this.requestComponent(options.widgets[i], DataTable, i, this.widgets));
                    }

                    // if there are widgets of type chart
                    if (options.widgets[i].name === 'chart') {
                        requestsArray.push(this.requestComponent(options.widgets[i], DataChart, i, this.widgets));
                    }

                    // if there are widgets of type sliding tool box
                    if (options.widgets[i].name === 'slidingToolbox') {
                        requestsArray.push(this.requestComponent(options.widgets[i], SlidingToolBox, i, this.widgets));
                    }
                }
            }
        }

        /** https://css-tricks.com/multiple-simultaneous-ajax-requests-one-callback-jquery/
          * Although the guide referenced above says these AJAX queries will
          * run in parallel, they actually run in waterfall format, so if the first one fails,
          * the rest will NOT be excecuted.
          *
          * We structured our code like this because we have to avoid at all costs calling the
          * setState() function too many times in the application, because doing so will trigger
          * a re-render of the page.
          *
          * We fetch all our data from our Web Services and pass them to the global state of the
          * page we are on at the time.
          *
          * TODO: Look for less risky ways to perform this same task.
          */
        $.when(requestsArray).then(function() {
            /* Set the state variables for all the information obtained in the waterfall of AJAX calls */
            this.setState({
                widgets: this.widgets
            });
        }.bind(this));
    }

    render() {

        return (
                <Layout>
                    <BreadCrumbs breadcrumbs={options.breadcrumbs}>
                        {this.toolBox}
                    </BreadCrumbs>
                    {this.state.widgets}
                </Layout>
        );
    }
};

export default AccountsPayable;
