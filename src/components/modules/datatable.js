import React, { Component } from 'react';
import $ from 'jquery';

export class Filter extends Component {
    constructor() {
      super();
      // this.filterLinkList = this.filterLinkList.bind(this);
      // this.toggleElem = this.toggleElem.bind(this);
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

            <section className="wrapper wrapper__content">
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



            </section>




        );
    }
}

export class DataTable extends Component {

    constructor() {
      super();
      // this.filterLinkList = this.filterLinkList.bind(this);
      // this.toggleElem = this.toggleElem.bind(this);
      this.state = {
          data: {},
          companies: {},
          employeeName: ''
      };
    }

    componentDidMount() {

        $.ajax({
            url: 'webservices/FullMenu.json',
            dataType: 'json',
            cache: false,
            success: function(data) {
                this.setState({data: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });

        $.ajax({
            url: 'webservices/Companies.json',
            dataType: 'json',
            cache: false,
            success: function(data) {
                this.setState({companies: data});
                this.setState({employeeName: data.employeeName});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });

        document.addEventListener('keyup', this.filterLinkList, false);

    }


    componentWillUnmount() {
        document.removeEventListener('keyup', this.filterLinkList, false);
    }

    render() {



        return (


                <Filter/>


        );
    }
}
