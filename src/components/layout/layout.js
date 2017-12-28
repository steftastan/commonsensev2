import $ from 'jquery';
import React, { Component } from 'react';
import { Header } from './../../components/layout/header.js';
import { CompanyList } from './../../components/layout/company-list.js';
import { Accordion } from './../../components/layout/accordion.js';;

const options = {
    companies: {
        webService: 'webservices/Companies.json' },
    accordion: {
        webService: 'webservices/FullMenu.json' },
};

export class Layout extends Component {

    constructor(props) {
      super(props);
      this.companies = {};
      this.accordion = {};
      this.defaultCompany = {};
      this.state = {
          employeeName: 'default',
          accordion: {},
          companies: {},
          defaultCompany: {}
      }
    }

    componentDidMount() {

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
        $.when(
            $.ajax({
                url: options.accordion.webService,
                dataType: 'json',
                cache: false,
                success: function(data) {
                    this.accordion = data;
                }.bind(this),
                error: function(xhr, status, err) {
                    console.error(this.props.url, status, err.toString());
                }.bind(this)
            }),

            $.ajax({
                url: options.companies.webService,
                dataType: 'json',
                cache: false,
                success: function(data) {
                    this.companies = data;
                    this.employeeName = data.employeeName;

                    /**
                      * Obtain default company data, necessary to display icon and to highlight
                      * the correct company name on the top left drop down list.
                      */
                    for (var i = 0; i < data.results.length; i++) {
                        if (data.results[i].default === true) {
                            this.defaultCompany = data.results[i];
                        }
                    }

                }.bind(this),
                error: function(xhr, status, err) {
                    console.error(this.props.url, status, err.toString());
                }.bind(this)
            })

        ).then(function() {

            /* Set the state variables for all the information obtained in every AJAX call */
            this.setState({
                accordion: this.accordion,
                companies: this.companies,
                employeeName: this.employeeName,
                defaultCompany: this.defaultCompany
            });
        }.bind(this));
    }

    render() {

        return (
            <div className="wrapper wrapper__app App">
                <Header companies={this.state.companies} />
                <Accordion links={this.state.accordion} employeeName={this.state.employeeName}>
                    <CompanyList defaultCompany={this.state.defaultCompany} companies={this.state.companies}/>
                </Accordion>
                <section className="wrapper wrapper__content wrapper__content--inner">
                    {this.props.children}
                </section>
            </div>
        );
    }
}