import React, { Component } from 'react';
import $ from 'jquery';
import { Header } from './components/layout/header.js';
import { BreadCrumbs } from './components/layout/breadcrumbs.js';
import { Accordion } from './components/layout/accordion.js';
import { DataTable } from './components/modules/datatable.js';
import { DataChart } from './components/modules/datachart.js';
import { Widget } from './components/modules/widget.js';

/** ACCOUNTS PAYABLE
 *
 * Options config object
 * dataTables {Array} Contains an array of objects for each Data Table
 * that needs to be displayed.
 *
 * @param webService {String} the URL to Web Service where data for that table can be fetched.
 * @param bootStrapClass {String} the bootstrap grid class to allow our table to be responsive.
 * @param tableSize {String} CSS class that determines if the table should span full width or half-width.
 * @param trClassName {String} Part of BootStrap table config, passes a class to the table's rows.
 * @param tableHeaderClass {String} Part of BootStrap table config, passes a class to the table's header.
 * @param tableOptions {Object} This optional parameter allows to override default options for BootStrap table.
 * More information on what data can be passed via table options is available at src/components/modules/datatable.js
 * @param filterBy {Array} a list of the columns that will have a TextBox to filter results.
 * @param sortBy {Array} a list of the columns that will have a TextBox to filter results.
 *
 * NOTE: Regarding filterBy and sortBy, the values provided MUST MATCH the names of the
 * key/columns received from the WS response, or else the association will fail.
 *
 * TODO: it would be good to make the back-end calls using an async library.
 */


 // TODO rename dataTables to widgets
// in loop in line 83 add a switch case or something to tell components apart
// that way we can store the diffeerent types of possible witches in the same options Array


const options = {
    widgets : [{
        name: 'dataTable',
        webService: 'webservices/AccountsPayable.json',
        bootStrapClass : 'col-12',
        tableSize: 'dataTable--halfWidth',
        trClassName: 'dataTable__row--content',
        tableHeaderClass: 'dataTable__row--header',
        tableOptions: {
            page: 3,
            sizePerPageList: [ {
            text: '5', value: 5
            }, {
            text: '50', value: 50
            }, {
            text: '500', value: 500
            }],
            sizePerPage: 10,
            pageStartIndex: 4,
            paginationSize: 5,
            paginationShowsTotal: true
        },
        filterBy: ['id', 'supplier', 'address'],
        sortBy: ['id', 'supplier', 'address', 'city', 'province', 'telephone', 'balanceDue', 'lastInvoice']
    }, {
        name: 'dataTable',
        webService: 'webservices/AccountsPayableCashDisbursement.json',
        bootStrapClass: 'col-lg-6 col-sm-12',
        tableSize: 'dataTable--fullWidth',
        trClassName: 'dataTable__row--content',
        tableHeaderClass: 'dataTable__row--header',
        tableOptions: {},
        filterBy: ['id', 'supplier', 'address'],
        sortBy: ['id', 'supplier', 'address', 'city', 'province', 'telephone', 'balanceDue', 'lastInvoice']
    }, {
        name: 'chart',
        webService: 'webservices/AccountsPayableChart.json'
    }]
};

export class AccountsPayable extends Component {
    constructor() {
      super();
      this.state = {
          widgetData: []
      };
    }

    componentDidMount() {
        var widgets = [];

        /** Extract the data table information from the options array */
        if (options && options.widgets) {
            for (var i = 0; i < options.widgets.length; i++) {
                // add logic to tell apart components here
                if (options.widgets[i].name) {
                    if (options.widgets[i].name == 'dataTable') {
                        widgets.push(<DataTable key={i} options={options.widgets[i]}/>);
                    }

                    if (options.widgets[i].name == 'chart') {
                        widgets.push(<DataChart key={i} />);
                    }
                }
            }
        }
        
        this.setState({widgetData: widgets});
    }

    render() {
        return (
            <div className="wrapper wrapper__app App">
                <Header />
                <Accordion />
                <BreadCrumbs/>
                <section className="wrapper wrapper__content wrapper__content--inner">
                    {this.state.widgetData}
                </section>
                <Widget />
            </div>
        );
    }
};

export default AccountsPayable;
