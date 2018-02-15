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
        console.log(this.props);

    }

    render() {
      var logoPath = "";
      if (global.loggedIn) {
          logoPath = global.paths.dev+'/images/logo/'+this.props.defaultCompany.name+'/logo.gif';
      }

      return (
          <div className="wrapper wrapper__app App logged">
              <Accordion links={this.props.accordion} employeeName={this.props.employeeName}>
                  <CompanyList defaultCompanyName={this.props.defaultCompany.name} defaultCompanyIcon={logoPath} companies={this.props.companies}/>
              </Accordion>
              <section id="contentWrapper" className="wrapper wrapper__content wrapper__content--inner">
                  <Header companies={this.props.companies} defaultCompanyName={this.props.defaultCompany.name} defaultCompanyIcon={logoPath} />
                  {this.props.children}
              </section>
          </div>
      );
    }
}
