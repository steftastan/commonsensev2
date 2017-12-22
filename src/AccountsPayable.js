import React, { Component } from 'react';
import { Header } from './components/layout/header.js';
import { BreadCrumbs } from './components/layout/breadcrumbs.js';
import { Accordion } from './components/layout/accordion.js';
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
        tableHeaders: ['hi test', 'id', 'supplier', 'address', 'city', 'province', 'telephone', 'balanceDue', 'lastInvoice'],
        filterBy: ['hi test', 'id', 'supplier', 'address'],
        sortBy: ['id', 'supplier', 'address', 'city', 'province', 'telephone', 'balanceDue', 'lastInvoice']
    }, {
        name: 'dataTable',
        title: 'Cash Disbursement',
        titleClass: 'dataTable__title',
        webService: 'webservices/AccountsPayableCashDisbursement',
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
    },  {
        name: 'chart',
        title: 'Analysis',
        titleClass: 'dataTable__title',
        webService: 'webservices/AccountsPayableCashDisbursement.json',
        bootStrapClass: 'col-lg-6 col-sm-12',
        options: {
            chartType: 'pie',
            xAxis: 'balance',
            yAxis: 'type'
        }
    },
    {
        name: 'chart',
        title: 'Analysis',
        titleClass: 'dataTable__title',
        webService: 'webservices/AccountsPayableCashDisbursement.json',
        bootStrapClass: 'col-lg-6 col-sm-12',
        options: {
            chartType: 'bar',
            xAxis: 'balance',
            yAxis: 'type'
        }
    }, {
        name: 'slidingToolbox',
        webService: 'webservices/AccountsPayableSlidingToolBox.json',
        bootStrapClass: 'col-lg-6 col-sm-12'
    }]
};

export class AccountsPayable extends Component {
    constructor() {
      super();
    }

    render() {
        var widgets = [];
        var toolBox = {};

        /** Extract the data table information from the options array */
        if (options && options.widgets) {
            for (var i = 0; i < options.widgets.length; i++) {
                // add logic to tell apart components here
                if (options.widgets[i].name) {

                    // if there are widgets of toolbox (top navigation) type
                    if (options.widgets[i].name === 'toolBox') {
                        toolBox = options.widgets[i];
                    }

                    // if there are widget of datatable type
                    if (options.widgets[i].name === 'dataTable') {
                        widgets.push(<DataTable key={i} theKey={i} options={options.widgets[i]}/>);
                    }

                    // if there are widgets of type chart
                    if (options.widgets[i].name === 'chart') {
                        widgets.push(<DataChart key={i} theKey={i} options={options.widgets[i]} />);
                    }

                    // if there are widgets of type sliding tool box
                    if (options.widgets[i].name === 'slidingToolbox') {
                        widgets.push(<SlidingToolBox key={i} theKey={i} options={options.widgets[i]} />);
                    }
                }
            }
        }

        return (
            <div className="wrapper wrapper__app App">
                <Header />
                <Accordion />
                <BreadCrumbs toolBox={toolBox} />
                <section className="wrapper wrapper__content wrapper__content--inner">
                    {widgets}
                </section>
            </div>
        );
    }
};

export default AccountsPayable;
