import React, { Component } from 'react';
import $ from 'jquery';

export class Dashboard extends Component {

    constructor() {
      super();
      this.state = {
          dashboardLinks: {}
      };
    }

    componentDidMount() {
        $.ajax({
            url: 'webservices/SubMenu.json',
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
            <section className="wrapper wrapper__content">
                <div className="wrapper wrapper__content--whiteBox">
                    <span className="tag--text">Sort by</span>
                    <span className="tag tag--inactive">Newest</span>
                    <span className="tag tag--active">Category</span>
                    <span className="tag tag--inactive">Alphabetical</span>
                </div>
                <div className="container-fluid wrapper__content--categoryGrid">
                    {dashboardLinks}
                </div>
            </section>
        );
    }
}
