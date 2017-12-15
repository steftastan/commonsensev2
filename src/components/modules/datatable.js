/*
 * Data table created with React Bootstrap Table by Allen Fang
 * http://allenfang.github.io/react-bootstrap-table
 */

import React, { Component } from 'react';
import $ from 'jquery';
import {BootstrapTable, TableHeaderColumn, SizePerPageDropDown} from 'react-bootstrap-table';

export class DataTable extends Component {

    constructor() {
      super();
      this.state = {
          accountData: {},
          companies: {},
          employeeName: '',
          pagination: 'pagination'
      };
    }

    componentDidMount() {
        var accounts = {};
        var pagination = document.getElementsByClassName(this.state.pagination);


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

        /*
         * We must adjust the positioning of our pagination element post-mount, unfortunately
         * this cannot be customized with the current version of BootStrap table (version 4.0)
         */

         for (var i = 0; i < pagination.length; i++) {
             if (pagination[i].nodeName == 'UL') {
                 $(pagination[i].parentNode).detach().appendTo('#paginationContainer');

             }
         }


    }



    render() {
        var accounts = this.state.accountData.length ? this.state.accountData : [];

        const options = {
            page: 1,  // which page you want to show as default
            sizePerPageList: [ {
            text: '10', value: 10
            }, {
            text: '25', value: 25
            }, {
            text: '50', value: 50
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
                <div className="wrapper wrapper__content--whiteBox">
                    <BootstrapTable data={accounts} options={options} striped hover pagination tableHeaderClass='dataTable__row--header' trClassName='dataTable__row--content'>
                         <TableHeaderColumn width='100' dataSort={ true } filter={ { type: 'TextFilter' } } isKey dataField='id'>ID</TableHeaderColumn>
                         <TableHeaderColumn width='175' dataSort={ true } filter={ { type: 'TextFilter'} } dataField='supplier'>Supplier</TableHeaderColumn>
                         <TableHeaderColumn width='175' dataSort={ true } filter={ { type: 'TextFilter'} } dataField='address'>Address</TableHeaderColumn>
                         <TableHeaderColumn width='100' dataSort={ true } dataField='city'>City</TableHeaderColumn>
                         <TableHeaderColumn width='100' dataSort={ true } dataField='province'>Province</TableHeaderColumn>
                         <TableHeaderColumn width='125' dataSort={ true } dataField='telephone'>Telephone</TableHeaderColumn>
                         <TableHeaderColumn width='125' dataSort={ true } dataField='balanceDue'>Balance Due</TableHeaderColumn>
                         <TableHeaderColumn width='125' dataSort={ true } dataField='lastInvoice'>Last Invoice</TableHeaderColumn>
                         <TableHeaderColumn width='125' dataSort={ true } dataField='lastCheque'>Last Cheque</TableHeaderColumn>
                         <TableHeaderColumn width='125' dataSort={ true } dataField='currentPer'>Current Per</TableHeaderColumn>
                     </BootstrapTable>
                     <div id="paginationContainer" className="dataTable__pagination"></div>
                </div>

            </section>
        );
    }
}
