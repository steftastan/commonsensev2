import React, { Component } from 'react';
import $ from 'jquery';

export class Filter extends Component {
    constructor() {
      super();
      this.state = {
          data: {},
          companies: {},
          employeeName: ''
      };
    }

    componentDidUpdate() {

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
                            <input id="searchInput" className="form__item form__filterDataTable" type="text" placeholder="Filter results" />
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
            <section className="wrapper wrapper__content--inner">
                <Filter/>
                <div className="wrapper wrapper__content--whiteBox">
                    <div className="wrapper__dataTable dataTable">
                        <div className="dataTable__row dataTable__row--header">
                            <div className="dataTable__item col-xs-1">ID</div>
                            <div className="dataTable__item col-xs-2">Supplier</div>
                            <div className="dataTable__item col-xs-2">Address</div>
                            <div className="dataTable__item col-xs-1">City</div>
                            <div className="dataTable__item col-xs-1">Province</div>
                            <div className="dataTable__item col-xs-1">Telephone</div>
                            <div className="dataTable__item col-xs-1">Balance Due</div>
                            <div className="dataTable__item col-xs-1">Last Invoice</div>
                            <div className="dataTable__item col-xs-1">Last Cheque</div>
                            <div className="dataTable__item col-xs-1">Current Per.</div>
                        </div>
                        {accounts}
                    </div>
                </div>
            </section>


        );
    }
}
