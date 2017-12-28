/**
 * Generic navigation widget for the inside pages.
 * This function allows to recursively generate complex dropdownlists, by
 * receiving an appropriately formatted JSON document.
 *
 * The class ToolBox will generate a new <ul> with a list of links for every
 * toolBox property it finds.
 *
 */


/* THIS IS NO LONGER CALLED WIDGETS, now every component of the page is a widget, this is one more widget with additional links, a secondary toolbox*/
import React, { Component } from 'react';
import $ from 'jquery';

export class SlidingToolBox extends Component {
    constructor(props) {
      super(props);
      this.openToolBox = this.openToolBox.bind(this);
      this.button = 'slidingToolBoxButton';
      this.icon = 'slidingToolBoxIcon';
      this.toolBox = 'slidingToolBoxLinks';
      this.wrench = 'fa-wrench';
      this.close = 'fa-close';
      this.state = {
          open: false,
          openClass: 'slidingToolBox__links--active'
      };
    }

    /*
     * Add click listening feature to open and close the accordion.
     */

     componentDidMount() {
         var button = document.getElementById(this.button);
         button.addEventListener('mousedown', this.openToolBox, false);
     }

    openToolBox(e) {
        e.stopPropagation();
        var toolBox = document.getElementById(this.toolBox);
        var icon = document.getElementById(this.icon);

        if(this.state.open) {
            this.setState({
                open: false
            });
            toolBox.classList.remove(this.state.openClass);
            icon.classList.add(this.wrench);
            icon.classList.remove(this.close);
        } else {
            this.setState({
                open: true
            });
            toolBox.classList.add(this.state.openClass);
            icon.classList.add(this.close);
            icon.classList.remove(this.wrench);
        }
    }

    render() {
        var links;

        if (this.props.results && this.props.results.length) {
            links = this.props.results.map(function(item, key) {
                if (item.isPopUp) {
                    return (
                        <a key={key} id={key} className="slidingToolBox__item" target="popup" onClick={function(){window.open(item.url,'popup','width=600,height=600'); return false;}}>{item.title}</a>
                    );
                } else {
                    return (
                        <a key={key} id={key} className="slidingToolBox__item" href={item.url}>{item.title}</a>
                    );
                }

            }, this);
        }

        return (
            <div className="slidingToolBox">
                <div id="slidingToolBoxButton" className="slidingToolBox__button">
                    <div id="slidingToolBoxIcon" className="slidingToolBox__icon fa fa-wrench"></div>
                </div>
                <div id="slidingToolBoxLinks" className="slidingToolBox__links">
                    {links}
                </div>
            </div>
        );
    }
}
