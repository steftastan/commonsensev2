import React, { Component } from 'react';

export class CompanyList extends Component {

    constructor(props) {
      super(props);
      this.companyList = [];

    }

    render() {
        
        if (this.props.companies.results && this.props.companies.results.length) {
            this.companyList = this.props.companies.results.map(function(item, key) {
                return (<option key={key} value={item.name} icon={item.icon} id={key}>{item.name}</option>);
            }, this);
        }

        return(
            <select id="companyList" value={this.props.defaultCompanyName} className="form__item form__selectCompany">
                {this.companyList}
            </select>
        );
    }
}
