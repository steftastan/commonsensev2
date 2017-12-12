/**
 * Generic navigation item for the inside pages.
 */

import React, { Component } from 'react';
import $ from 'jquery';

export class ToolBox extends Component {
    constructor() {
      super();
    }

    render() {
        var tool;

        return (
            tool = this.props.tools.toolBox.map(function(item, key) {
                console.log(item);
                if (item) {
                    return (
                        <li className="widget--toolItem" key={key} id={key}>
                            <div className="widget--toolContent">{item.linkName}</div>
                        </li>
                    );
                }
            })
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
                                <ul>
                                    <ToolBox tools={item}/>
                                </ul>
                            </div>
                        </section>
                    );
                }
            });

        }

        return (

            <div className="wrapper__content--widgetColumn">{widget}</div>


        );


    }
}
