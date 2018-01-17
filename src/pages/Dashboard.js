import $ from 'jquery';
import React, { Component } from 'react';
import { BreadCrumbs } from './../components/layout/breadcrumbs.js';

/** DASHBOARD
 */

const options = {
    breadcrumbs: [{
        name:'dashboard',
        path:'/'
    }]
};

const endpoints = {
    submenu:  {
        prod: global.paths.prod+'/services/user/portal/submenu',
        dev: '/webservices/SubMenu.json'
    }
};

export class Dashboard extends Component {

    constructor(props) {
      super(props);
      this.state = {
          dashboardLinks: {}
      };
    }

    componentDidMount() {
        $.ajax({
            url: endpoints.submenu.dev,
            dataType: 'json',
            cache: false,
            success: function(data) {
                this.setState({dashboardLinks: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    };

    render() {
        if (this.state.dashboardLinks && this.state.dashboardLinks.results && this.state.dashboardLinks.results.length) {
            var dashboardLinks = this.state.dashboardLinks.results.map(function(item, key) {
                return (
                    <a key={key} className="category__item col-xs-12 col-lg-4" href={item.url}>
                        <article className={"category " + item.color}>
                            <span className={"category__icon--desktop " + item.icon + " " + item.color}></span>
                            <span className={"category__icon " + item.icon}></span>
                            <div className="category__text">
                                <span className="category__name">{item.category}</span>
                                <h4 className="category__link">{item.linkName}</h4>
                            </div>
                        </article>
                    </a>
                );
            });
        }

        return (
            <div>
                <BreadCrumbs breadcrumbs={options.breadcrumbs}/>
                <section className="wrapper">
                    <div className="container-fluid wrapper__content--categoryGrid">
                        {dashboardLinks}
                    </div>
                </section>
            </div>
        );
    }
}
