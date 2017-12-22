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
      this.findToolBox = this.findToolBox.bind(this);
      this.openToolBox = this.openToolBox.bind(this);
      this.state = {
          open: false,
          parentId: 'widget',
          openClass: 'widget__toolItem--open'
      };
    }

    /*
     * Add click listening feature to open and close the accordion.
     */
    componentDidMount() {
        // var widgetContainer = document.getElementById(this.state.parentId);
        // widgetContainer.addEventListener('click', this.findToolBox);

    }

    findToolBox(event) {
        var toolBoxItems;
        var toolContentClass = this.state.toolContentClass;
        var openClass = this.state.openClass;
        var menuItem = {};
        var subMenuItem;

        event.stopPropagation();

        if (event.target.classList.contains(toolContentClass)) {
            if (event.target.nextSibling && event.target.nextSibling.nodeName == "UL") {
                menuItem = event.target.nextSibling;
                this.openToolBox(menuItem);
            }
            event.target.parentNode.classList.add(openClass);
        };
    }

    /*
     * Create temp object to splice the menu list when meeting the required criteria (new link lists begin at URL and such.)
     */
    openToolBox(menu) {
        var tmpMenu = menu;
        var newMenu = {};
        var toolContentClass = this.state.toolContentClass;

        //this.openToolBox(newMenu);
        var stuff = tmpMenu.getElementsByClassName(toolContentClass);

        for (var i = 0; i < stuff.length; i++) {
            if (stuff[i].nextSibling && stuff[i].nextSibling.nodeName == "UL") {
                console.log(stuff[i]);
                stuff[i].parentNode.classList.add('widget__toolItem--open');
            }

        }


    }

    render() {
        // var tools = [];
        // var buildMenu = [];
        // var subMenu = [];
        // var openClass = '';
        //
        // if (this.props.tools && this.props.tools.toolBox) {
        //     tools = this.props.tools.toolBox.map(function(item, key) {
        //
        //         /*
        //          * Top-level navigation items must display as soon as the page renders.
        //          */
        //         if (this.state && this.state.isTopLevel) {
        //             openClass = this.state.openClass;
        //         }
        //
        //         /* Recursively call this same function as long as the the application
        //          * finds items with a toolBox property
        //          */
        //         if (item && item.toolBox && item.toolBox.length) {
        //             // subMenu = <ToolBox tools={item}/>;
        //         }
        //
        //         if (item) {
        //             buildMenu = (
        //                 <li className={"widget__toolItem " + openClass}>
        //                     <div className="widget__toolContent">{item.linkName}</div>
        //                     {subMenu}
        //                 </li>);
        //
        //             /* Clear the subMenu variable to for the next iteration. */
        //             subMenu = [];
        //
        //             return (
        //                 <div key={key} id={key}>{buildMenu}</div>
        //             );
        //         }
        //     }, this);
        // }

        return (
            <ul>
                hi
            </ul>
        );
    }
}

// export class Widget extends Component {
//     constructor() {
//       super();
//       this.state = {
//           widgets: {},
//           isTopLevel: true
//       };
//     }
//
//     componentDidMount() {
//         $.ajax({
//             url: 'webservices/AccountsPayableNavWidgets.json',
//             dataType: 'json',
//             cache: false,
//             success: function(data) {
//                 if (data.results && data.results.length) {
//                     this.setState({widgets: data.results});
//                 }
//             }.bind(this),
//             error: function(xhr, status, err) {
//                 console.error(this.props.url, status, err.toString());
//             }.bind(this)
//         });
//     }
//
//     render() {
//         var widget;
//         var isTopLevel = this.state.isTopLevel;
//
//         if (this.state.widgets && this.state.widgets.length) {
//             widget = this.state.widgets.map(function(item, key) {
//                 if (item) {
//                     return (
//                         <section key={key} id={key} className="wrapper wrapper__content--toolBox">
//                             <div className="widget">
//
//                             </div>
//                         </section>
//                     );
//                 }
//             });
//         }
//
//         return (
//             <div id="widget" className="wrapper wrapper__content wrapper__content--widgetColumn">
//                 {widget}
//             </div>
//         );
//
//
//     }
// }
