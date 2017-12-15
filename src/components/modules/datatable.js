/*
 * Data table created with React Bootstrap Table by Allen Fang
 * http://allenfang.github.io/react-bootstrap-table
 */

import React, { Component } from 'react';
import $ from 'jquery';
import {BootstrapTable, TableHeaderColumn, SizePerPageDropDown} from 'react-bootstrap-table';

export class Filter extends Component {
    constructor() {
      super();
      this.state = {
          data: {},
          companies: {},
          employeeName: ''
      };
    }

    render() {

        return (

                <div className="wrapper wrapper__content--whiteBox">
                    <form className="form">
                        <span className="tag--text">Filter by</span>
                        <span className="tag tag--inactive">Cheques</span>
                        <span className="tag tag--active">Purchases</span>
                        <span className="tag tag--inactive">Balance</span>
                        <span className="tag tag--active">All</span>
                    </form>
                </div>
        );
    }
}

export class DataTable extends Component {

    constructor() {
      super();
      this.state = {
          accountData: {},
          companies: {},
          employeeName: ''
      };
    }

    componentDidMount() {
        var accounts = {};

        /*
         * Obtain DataTable info and store in the component's state.
         */
        $.ajax({
            url: 'webservices/AccountsPayable.json',
            dataType: 'json',
            cache: false,
            success: function(data) {
                if (data.results) {
                    this.setState({accountData: data.results});
                }
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }

    render() {
        var accounts = this.state.accountData.length ? this.state.accountData : [];

        const options = {
            page: 1,  // which page you want to show as default
            sizePerPageList: [ {
            text: '5', value: 5
            }, {
            text: '10', value: 10
            }, {
            text: 'All', value: accounts.length
            } ], // you can change the dropdown list for size per page
            sizePerPage: 10,  // which size per page you want to locate as default
            pageStartIndex: 1, // where to start counting the pages
            paginationSize: 5,  // the pagination bar size.
            prePage: 'Prev', // Previous page button text
            nextPage: 'Next', // Next page button text
            firstPage: 'First', // First page button text
            lastPage: 'Last', // Last page button text
            paginationShowsTotal: true,  // Accept bool or function
            paginationPosition: 'top'  // default is bottom, top and both is all available
        };

        return (

            <section className="wrapper wrapper__content wrapper__content--inner">
                <Filter/>
                <div className="wrapper wrapper__content--whiteBox">
                    <BootstrapTable data={accounts} options={options} striped hover pagination tableHeaderClass='dataTable__row--header' trClassName='dataTable__row--content'>
                         <TableHeaderColumn dataSort={ true } filter={ { type: 'TextFilter' } } isKey dataField='id'>ID</TableHeaderColumn>
                         <TableHeaderColumn dataSort={ true } filter={ { type: 'TextFilter'} } dataField='supplier'>Supplier</TableHeaderColumn>
                         <TableHeaderColumn dataSort={ true } filter={ { type: 'TextFilter'} } dataField='address'>Address</TableHeaderColumn>
                         <TableHeaderColumn dataSort={ true } dataField='city'>City</TableHeaderColumn>
                         <TableHeaderColumn dataSort={ true } dataField='province'>Province</TableHeaderColumn>
                         <TableHeaderColumn dataSort={ true } dataField='telephone'>Telephone</TableHeaderColumn>
                         <TableHeaderColumn dataSort={ true } dataField='balanceDue'>Balance Due</TableHeaderColumn>
                         <TableHeaderColumn dataSort={ true } dataField='lastInvoice'>Last Invoice</TableHeaderColumn>
                         <TableHeaderColumn dataSort={ true } dataField='lastCheque'>Last Cheque</TableHeaderColumn>
                         <TableHeaderColumn dataSort={ true } dataField='currentPer'>Current Per</TableHeaderColumn>
                     </BootstrapTable>
                </div>

            </section>
        );
    }
}
