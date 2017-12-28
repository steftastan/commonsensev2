import React, { Component } from 'react';
import $ from 'jquery';

export class CompanyList extends Component {

    constructor(props) {
      super(props);
      this.companyList = [];
    }

    render() {
        var companyList;

        if (this.props.companies.results && this.props.companies.results.length) {
            this.companyList = this.props.companies.results.map(function(item, key) {
                return (<option key={key} value={item.name} id={key}>{item.name}</option>);
            }, this);
        }

        return(
            <select value={this.props.defaultCompany.name} className="form__item form__selectCompany">
                {this.companyList}
            </select>
        );
    }
}
