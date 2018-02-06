import React, { Component } from 'react';

export class CompanyList extends Component {

    constructor(props) {
      super(props);
      this.companyList = [];

    }

    render() {
        var logoPath = "";
        if (this.props.companies.results && this.props.companies.results.length) {
            this.companyList = this.props.companies.results.map(function(item, key) {
                if (item.name !== "") {
                  logoPath = global.paths.dev+'images/logo/'+item.name+'/logo.gif';
                  return (<option key={key} value={item.name} icon={logoPath} id={key}>{item.name}</option>);
                }
            }, this);
        }

        return(
            <select id="companyList" value={this.props.defaultCompanyName} className="form__item form__selectCompany">
                {this.companyList}
            </select>
        );
    }
}
