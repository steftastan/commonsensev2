import './../global.variables.js';
import $ from 'jquery';
import React, { Component } from 'react';
import { GetWidget, ObjectToArray } from './../helper.functions.js';
import { BreadCrumbs } from './../components/layout/breadcrumbs.js';
import { ToolBox } from './../components/widgets/toolbox.js';
import { DataTable } from './../components/widgets/datatable.js';
import { DataChart } from './../components/widgets/data-chart.js';
import { SlidingToolBox } from './../components/widgets/sliding-toolbox.js';

/** ACCOUNTS PAYABLE
 *
 * Options config object
 * @param widgets {Array} Array of objects for each widget that needs to be displayed.
 *
 * Key/Value options available for the widget variable.
 *** @param endpoint {String} the URL to Web Service where data for that table can be fetched.
 *** @param bootStrapClass {String} the bootstrap grid class to allow our table to be responsive.
 ***    col-12: Makes a full-width table
 ***    col-lg-6 col-sm-12: Makes a half-width table on desktop and full width on mobile.
 ***    Any bootstrap style grids apply. Check their documentation for all options.
 ***    https://getbootstrap.com/docs/4.0/layout/grid/
 *** @param options {Object} This optional parameter allows to override default options for the widget.
 *** More information on what data can be passed via table options is available at src/components/modules/datatable.js

 *
 * NOTE: Regarding filterBy and sortBy, the values provided MUST MATCH the names of the
 * key/columns received from the WS response, or else the association will fail.
 *
 */

const options = {
    widgets : [{
        name: 'toolBox',
        endpoint: global.endpoints.toolBox.dev
    }, {
        name: 'dataTable',
        endpoint: global.endpoints.accountsPayable.dev,
        bootStrapClass : 'col-12',
        options: {
            sizePerPageList: [ {
            text: '25', value: 25
            }, {
            text: '50', value: 50
            }, {
            text: '500', value: 500
            }],
            sizePerPage: 25
        }
    }, {
        name: 'dataTable',
        title: 'cashDisbursement',
        endpoint: global.endpoints.cashDisbursement.dev,
        bootStrapClass : 'col-lg-6 col-sm-12',
        options: {}
    }, {
        name: 'dataChart',
        title: 'accountsPayableChart',
        endpoint: global.endpoints.cashDisbursement.dev,
        bootStrapClass : 'col-lg-6 col-sm-12',
        type: 'pie',
        aggregateBy: 'type',
        calculateBy: 'totalDue',
        label: 'accountsPayableChart',
        buildTable: true
    }, {
        name: 'dataTable',
        title: 'Testing Table',
        endpoint: global.endpoints.summary.dev,
        bootStrapClass : 'col-lg-6 col-sm-12',
        options: {}
    }, {
        name: 'slidingToolbox',
        endpoint: global.endpoints.sliding.dev
    }
]};



export class AccountsPayable extends Component {

    constructor(props) {
      super(props);
      this.GetWidget = GetWidget;
      this.toolBox = [];
      this.widgets = [];
      this.data = [];
      this.state = {
          widgets: [],
          loaded: false
      };
    }

    /**
     * Perform all ajax tasks here
     * Maybe update the state. in any case the widgets should render and data should be applied on componentDidUpdate
     */

     componentDidUpdate(prevProps, prevState) {
       var data = {};
       var result = {};

       /**
        * Begin the process of loading widgets after the component has finished mounting.
        */
       if (prevState.loaded !== this.state.loaded) {
           for (var i = 0; i < options.widgets.length; i++) {
               this.GetWidget(i, options.widgets[i], function(key, result, widget) {

                   if (result) {
                       /**
                        * Decide which components to display based on what was established in the options object.
                        */

                        // if there are widgets of type data table
                        if (widget.name === 'dataTable') {
                            this.widgets.push(<DataTable index={key} key={key} options={widget} results={result} />);
                        }

                        // if there are widgets of type graphic chart
                        if (widget.name === 'dataChart') {
                            this.widgets.push(<DataChart index={key} key={key} options={widget} results={result} />);
                        }

                        // if there is a toolbox
                        if (widget.name === 'toolBox') {
                            this.widgets.push(
                                <div key={key} className="wrapper wrapper__content--widgetToolBox">
                                    <ToolBox key={key} options={widget} results={result} />
                                </div>
                            );
                        }

                        // if there are widgets of type sliding tool box
                        if (widget.name === 'slidingToolbox') {
                            this.widgets.push(
                                <SlidingToolBox
                                    index={key}
                                    key={key}
                                    options={widget}
                                    results={result} />
                            );
                        }
                    }

                /* Sort widgets by order their in the config object. */
                this.widgets.sort(function(a, b) {return (a.key > b.key) ? 1 : ((b.key > a.key) ? -1 : 0);} );

                /*
                 * Saving the widget's to the component's state allows
                 * us to trigger a component re-render so we can replace
                 * the loading icon with our data.
                 */
                this.setState({widgets: this.widgets});
                }.bind(this));
            }
        }
     }

    /*
     * Setting this flag to true allows the component to begin loading the components.
     */
    componentDidMount() {

        this.setState({loaded:true});
    }

    render() {
        var content = (this.state.widgets && this.state.widgets.length ? <div>{this.state.widgets}</div> : <div className="spinner"></div>);
        
        return (
            <div>
                <BreadCrumbs breadcrumbs={this.props.page}>
                    <div id="toolBoxHolder" className="toolBoxHolder"></div>
                </BreadCrumbs>
                {content}
            </div>
        );
    }
};

export default AccountsPayable;
