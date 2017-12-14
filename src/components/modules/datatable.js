import React, { Component } from 'react';
import $ from 'jquery';
$.DataTable = require('datatables.net');

const columns = [{
        title: 'ID',
        width: 120,
        data: 'id'
    }, {
        title: 'Supplier',
        width: 180,
        data: 'supplier'
    }, {
        title: 'Address',
        width: 180,
        data: 'address'
    }, {
        title: 'City',
        width: 180,
        data: 'city'
    }, {
        title: 'Province',
        width: 180,
        data: 'province'
    }, {
        title: 'Balance Due',
        width: 180,
        data: 'balanceDue'
    }, {
        title: 'Last Invoice',
        width: 180,
        data: 'lastInvoice'
    }, {
        title: 'Last Cheque',
        width: 180,
        data: 'lastCheque'
    }, {
        title: 'Current Per.',
        width: 180,
        data: 'currentPer'
    }
];

function reloadTableData(names) {
    const table = $('.data-table-wrapper').find('table').DataTable();
    table.clear();
    table.rows.add(names);
    table.draw();
}

function updateTable(names) {
    const table = $('.data-table-wrapper').find('table').DataTable();
    let dataChanged = false;
    table.rows().every(function () {
        const oldNameData = this.data();
        const newNameData = names.find((nameData) => {
            return nameData.name === oldNameData.name;
        });
        if (oldNameData.nickname !== newNameData.nickname) {
            dataChanged = true;
            this.data(newNameData);
        }
       return true;
    });

    if (dataChanged) {
        table.draw();
    }
}

export class Filter extends Component {
    constructor() {
      super();
      this.state = {
          data: {},
          companies: {},
          employeeName: ''
      };
    }

    componentDidMount() {
        var table = $('.data-table-wrapper').DataTable();
        // #myInput is a <input type="text"> element
        $('#filterTable').on('keyup', function () {
            table.search(this.value).draw();
            console.log(table.search(this.value));
        });
        //this.setState({accountData: {}});
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log(nextState);
         if (nextState) {
             if (nextState.accountData.length !== this.state.accountData.length) {
                 reloadTableData(nextState.accountData);
             } else {
                 updateTable(nextState.accountData);
             }
         }
         return false;
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
                        <div className="wrapper__filterDataTable">
                            <i className="form__icon form__icon--search fa fa-search"></i>
                            <input id="filterTable" className="form__item form__filterDataTable" type="text" placeholder="Filter results" />
                        </div>

                        <div className="wrapper__showPerPage">
                            <span className="tag--text">Show</span>
                            <select className="form__item form__showPerPage">
                                <option>10</option>
                                <option>20</option>
                                <option>50</option>
                                <option>All</option>
                            </select>
                            <span className="tag--text">per page</span>
                        </div>

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

        console.log(this.refs);

        $(this.refs.main).DataTable({
            dom: '<"data-table-wrapper"t>',
            data: this.state.accountData,
            columns,
            ordering: false,
            paging: true,
            searching: true,
            search: "",
            sPaginationType: "bootstrap"
        });
    }

    componentWillUnmount() {
        $('.data-table-wrapper')
            .find('table')
            .DataTable()
            .destroy(true);
   }

   shouldComponentUpdate(nextProps, nextState) {
        if (nextState) {
            if (nextState.accountData.length !== this.state.accountData.length) {
                reloadTableData(nextState.accountData);
            } else {
                updateTable(nextState.accountData);
            }
        }
        return false;
    }

    render() {
        var accounts;
        if (this.state.accountData && this.state.accountData.length) {

            accounts = this.state.accountData.map(function(item, key) {
                return (
                    <div className="dataTable__row--content" key={key}>
                        <div className="dataTable__item col-xs-1">{item.id}</div>
                        <div className="dataTable__item col-xs-2">{item.supplier}</div>
                        <div className="dataTable__item col-xs-2">{item.address}</div>
                        <div className="dataTable__item col-xs-1">{item.city}</div>
                        <div className="dataTable__item col-xs-1">{item.province}</div>
                        <div className="dataTable__item col-xs-1">{item.telephone}</div>
                        <div className="dataTable__item col-xs-1">{item.balanceDue}</div>
                        <div className="dataTable__item col-xs-1">{item.lastInvoice}</div>
                        <div className="dataTable__item col-xs-1">{item.lastCheque}</div>
                        <div className="dataTable__item col-xs-1">{item.currentPer}</div>
                    </div>
                );
            });
        }

        return (


            <section className="wrapper wrapper__content wrapper__content--inner">
                <Filter/>
                <div className="wrapper wrapper__content--whiteBox">
                    <div className="wrapper__dataTable dataTable">
                        <table ref="main" />
                    </div>
                </div>
            </section>
        );
    }
}
