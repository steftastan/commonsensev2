import React, { Component } from 'react';

export class CompanyList extends Component {

    constructor(props) {
      super(props);
      this.companyList = [];

    }

    render() {
        var defaultCompanyName = (this.props.defaultCompany && this.props.defaultCompany.name ? this.props.defaultCompany.name : '');
        var selected;
        if (this.props.companies && this.props.companies.results) {
            this.companyList = this.props.companies.results.map(function(item, key) {
                if (item.name) {
                    return (<option key={key} value={item.name} id={key}>{item.name}</option>);
                }
            }, this);
        }

        return(
            <select id="companyList" defaultValue={defaultCompanyName} className="form__item form__selectCompany">
                {this.companyList}
            </select>
        );
    }
}
