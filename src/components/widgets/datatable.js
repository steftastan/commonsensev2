/**
 * DATA TABLE WIDGET
 *
 *
 * Data table created with React Bootstrap Table by Allen Fang
 * http://allenfang.github.io/react-bootstrap-table
 */

import React, { Component } from 'react';
import $ from 'jquery';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import './../../global.languages.js';
import './../../global.variables.js';
import { Localization } from './../../helper.functions.js';

export class DataTable extends Component {

    constructor(props) {
      super(props);
      this.Localization = Localization;
      this.pagination = 'pagination';
      this.newPaginationClass = 'dataTable__pagination'
    }

    componentDidMount() {
        var pagination = document.getElementsByClassName(this.pagination);
        var tableContainer;

        /**
         * We must adjust the positioning of our pagination element post-mount, unfortunately
         * this cannot be customized with the current version of React BootStrap Table (version 4.0)
         */

         for (var i = 0; i < pagination.length; i++) {
             if (pagination[i].nodeName === 'UL') {
                 $(pagination[i].parentNode).addClass(this.newPaginationClass);
                 tableContainer = $(pagination[i].parentNode).closest('.react-bs-table-container');
                 $(pagination[i].parentNode).detach().appendTo(tableContainer.first('.dataTable__pagination'));
             }
         }
    }

    render() {
        var tableData = this.props.results;
        var tableHeaders;
        var title__text;

        if (tableData && tableData.length) {
            var options = {
                page: 1,  // which page you want to show as default
                sizePerPageList: [ {
                text: '10', value: 10
                }, {
                text: '25', value: 25
                }, {
                text: '50', value: 50
                } ], // you can change the dropdown list for size per page
                sizePerPage: 10,  // which size per page you want to locate as default
                pageStartIndex: 1, // where to start counting the pages
                paginationSize: 5,  // the pagination bar size.
                prePage: this.Localization('prev'), // Previous page button text
                nextPage: this.Localization('next'), // Next page button text
                firstPage: this.Localization('first'), // First page button text
                lastPage: this.Localization('last'), // Last page button text
                paginationShowsTotal: true,  // Accept bool or function
                paginationPosition: 'top'  // default is bottom, top and both is all available
            };

            /**
             * Replace the default values in the options variable if custom
             * data was sent from the page.
             */
            if (this.props.options && this.props.options.options) {

                for (var key in options) {

                    /* Override all the default values */
                    if (this.props.options.options.hasOwnProperty(key)) {
                        options[key] = this.props.options.options[key];
                    }

                    /* Append "All" option as another default item in pagination count. */
                    if (key === 'sizePerPageList') {
                        options.sizePerPageList.push({
                            text: this.Localization('all'), value: tableData.length
                        });
                    }
                }
            }
        }

        /**
         * Build and customize each table header according to the data received from options object.
         */
        if (this.props.options && this.props.options.tableHeaders) {
            tableHeaders = this.props.options.tableHeaders.map(function(item, key) {
                var filterBy = (this.props.options.filterBy && (this.props.options.filterBy.indexOf(item) !== -1)) ? { type: 'TextFilter' } : {}
                var sortBy = (this.props.options.sortBy && (this.props.options.sortBy.indexOf(item) !== -1)) ? true : false;
                var headerName__text = this.Localization(item);
                title__text = this.Localization(this.props.options.title);
                return (
                    <TableHeaderColumn width='100' dataSort={sortBy} filter={filterBy} isKey={key === 0 ? true : false} key={key} dataField={item}>{headerName__text}</TableHeaderColumn>
                );

            }, this);
        }

        return (
            <div key={this.props.index} className={this.props.options.bootStrapClass}>
                <div className="wrapper wrapper__content--whiteBox">
                    <h2 className={this.props.options.titleClass}>{title__text}</h2>
                    <BootstrapTable key={this.props.index} data={tableData} options={options} striped hover pagination containerClass={this.props.options.tableSize} tableHeaderClass={this.props.options.tableHeaderClass} trClassName={this.props.options.trClassName}>
                        {tableHeaders}
                    </BootstrapTable>
                    <div className="dataTable__pagination"></div>
                </div>
            </div>
        );
    }
}
