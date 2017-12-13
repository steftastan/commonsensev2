/**
 * Generic navigation widget for the inside pages.
 * This function allows to recursively generate complex dropdownlists, by
 * receiving an appropriately formatted JSON document.
 *
 *
 *
 *
 */

import React, { Component } from 'react';
import $ from 'jquery';

export class ToolBox extends Component {
    constructor() {
      super();
    }

    render() {
        var tools;
        var buildMenu;
        var subMenu;

        if (this.props.tools && this.props.tools.toolBox) {
            tools = this.props.tools.toolBox.map(function(item, key) {

                /* Recursively call this function as long as the the application
                 * finds items with a toolBox property
                 */
                if (item && item.toolBox && item.toolBox.length) {
                    subMenu = <ToolBox tools={item}/>;
                }

                if (item) {
                    buildMenu = (
                        <li className="widget__toolItem">
                            <div className="widget__toolContent">{item.linkName}</div>
                            {subMenu}
                        </li>);

                    /* Clear the subMenu variable to for the next iteration. */
                    subMenu = [];

                    return (
                        <div key={key} id={key}>{buildMenu}</div>
                    );
                }
            });
        }

        return (
            <ul>
                {tools}
            </ul>
        );
    }
}

export class Widget extends Component {
    constructor() {
      super();
      this.state = {
          widgets: {}
      };
    }

    componentDidMount() {
        $.ajax({
            url: 'webservices/AccountsPayableNavWidgets.json',
            dataType: 'json',
            cache: false,
            success: function(data) {
                if (data.results && data.results.length) {
                    this.setState({widgets: data.results});
                }
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }

    render() {
        var widget;

        if (this.state.widgets && this.state.widgets.length) {
            widget = this.state.widgets.map(function(item, key) {
                if (item) {
                    return (
                        <section key={key} id={key} className="wrapper wrapper__content--toolBox">
                            <div className="widget">
                                <ToolBox tools={item}/>
                            </div>
                        </section>
                    );
                }
            });

        }

        return (
            <div className="wrapper__content--widgetColumn">
                {widget}
            </div>
        );


    }
}
