import $ from 'jquery';
import './../../global.variables.js';
import React, { Component } from 'react';
import { SetCompany } from './../../helper.functions.js';
import { Header } from './../../components/layout/header.js';
import { CompanyList } from './../../components/layout/company-list.js';
import { Accordion } from './../../components/layout/accordion.js';;

export class Layout extends Component {

    constructor(props) {
      super(props);
      this.SetCompany = SetCompany;
      this.updateCompany = this.updateCompany.bind(this);
      this.renderIfLogged = this.renderIfLogged.bind(this);
      this.companies = {};
      this.accordion = {};
      this.defaultCompany = {};
      this.companyDropDown = 'companyList';
      this.state = {
          employeeName: '',
          accordion: {},
          companies: {},
          defaultCompany: {}
      }
    }

    /**
     * Updates the company logo and name per the selection made.
     * TODO: This should also store company info in the session (global var for now)
     * and refresh the page.
     */
    updateCompany(e) {

        this.setState({
            defaultCompany: {
                name: e.target.value,
                default: true,
                icon: $('#companyList option:selected').attr('icon')
            }
        });

        global.company = e.target.value;

    }

    componentDidMount() {

        if (global.loggedIn) {

            /* Listen for the company switch */
            this.companyDropDown = document.getElementById(this.companyDropDown);
            if (this.companyDropDown) this.companyDropDown.addEventListener('change', this.updateCompany);

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
              */
            $.when(
                $.ajax({
                    url: global.endpoints.accordion.dev,
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
                    url: global.endpoints.companies.dev,
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
                global.company = this.defaultCompany.name;

            }.bind(this));

        }
    }

    renderIfLogged() {
        if (global.loggedIn) {
            return (
                <div className="wrapper wrapper__app App logged">
                    <Accordion links={this.state.accordion} employeeName={this.state.employeeName}>
                        <CompanyList defaultCompanyName={this.state.defaultCompany.name} defaultCompanyIcon={this.state.defaultCompany.icon} companies={this.state.companies}/>
                    </Accordion>
                    <section id="contentWrapper" className="wrapper wrapper__content wrapper__content--inner">
                        <Header companies={this.state.companies} defaultCompanyName={this.state.defaultCompany.name} defaultCompanyIcon={this.state.defaultCompany.icon} />
                        {this.props.children}
                    </section>
                </div>
            );
        } else {
            return (
                <div className="wrapper wrapper__app App not-logged">
                    <section id="contentWrapper" className="wrapper wrapper__content wrapper__content--inner">
                        <Header companies={this.state.companies} defaultCompanyName={this.state.defaultCompany.name} defaultCompanyIcon={this.state.defaultCompany.icon} />
                        {this.props.children}
                    </section>
                </div>
            );
        }
    }

    render() {
        return this.renderIfLogged();
    }
}
