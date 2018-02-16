import $ from 'jquery';
import './global.variables.js';
import { Camelize, GetCompany, SetCompany } from './helper.functions.js';
import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Layout } from './components/layout/layout.js';
import { Dashboard } from './pages/Dashboard.js';




/** APP.JS
 * Provides the scaffolding for our application.
 * Create routes to new pages here.
 *
 * Link to React Router 4 documentation:
 * https://reacttraining.com/react-router/web/guides/philosophy
 *
 * Pattern for dynamically loading react components.
 * https://gist.github.com/davidgljay/5d7a29c5add8b360b93db838235e80a8
 */

export class App extends Component {

    constructor(props) {
      super(props);
      this.componentList = [];
      this.SetCompany = SetCompany;
      this.GetCompany = GetCompany;
      this.Camelize = Camelize;
      this.updateCompany = this.updateCompany.bind(this);
      this.companies = {};
      this.accordion = {};
      this.defaultCompany = {};
      this.companyDropDown = 'companyList';
      this.state = {
          employeeName: '',
          accordion: {},
          companies: {},
          defaultCompany: {}
      }
    }

    componentDidMount() {

        if (global.loggedIn) {

            /* Listen for the company switch */
            this.companyDropDown = document.getElementById(this.companyDropDown);
            if (this.companyDropDown) this.companyDropDown.addEventListener('change', this.updateCompany);

            /** https://css-tricks.com/multiple-simultaneous-ajax-requests-one-callback-jquery/
              * Although the guide referenced above says these AJAX queries will
              * run in parallel, they actually run in waterfall format, so if the first one fails,
              * the rest will NOT be excecuted.
              *
              * We structured our code like this because we have to avoid at all costs calling the
              * setState() function too many times in the application, because doing so will trigger
              * a re-render of the page.
              *
              * We fetch all our data from our Web Services and pass them to the global state of the
              * page we are on at the time.
              *
              */
            $.when(
                $.ajax({
                    url: global.endpoints.accordion.dev,
                    dataType: 'json',
                    cache: false,
                    success: function(data) {
                        this.accordion = data;
                    }.bind(this),
                    error: function(xhr, status, err) {
                        console.error(this.props.url, status, err.toString());
                    }.bind(this)
                }),

                $.ajax({
                    url: global.endpoints.companies.dev,
                    dataType: 'json',
                    cache: false,
                    success: function(data) {
                        this.companies = data;
                        this.employeeName = data.employeeName;

                        /**
                          * Obtain default company data, necessary to display icon and to highlight
                          * the correct company name on the top left drop down list.
                          */
                        for (var i = 0; i < data.results.length; i++) {
                            if (data.results[i].default === true) {
                                this.defaultCompany = data.results[i];
                            }
                        }

                    }.bind(this),
                    error: function(xhr, status, err) {
                        console.error(this.props.url, status, err.toString());
                    }.bind(this)
                })

            ).then(function() {

                /* Set the state variables for all the information obtained in every AJAX call */
                this.setState({
                    accordion: this.accordion,
                    companies: this.companies,
                    employeeName: this.employeeName,
                    defaultCompany: this.defaultCompany
                });

                /* Set default company*/
                this.SetCompany(this.defaultCompany.name);

            }.bind(this));

        }
    }

    /**
     * Updates the company logo and name per the selection made.
     * TODO: This should also store company info in the session (global var for now)
     * and refresh the page.
     */
    updateCompany(e) {

        this.setState({
            defaultCompany: {
                name: e.target.value,
                default: true,
                icon: $('#companyList option:selected').attr('icon')
            }
        });
        global.company = e.target.value;
    }

    render() {

        var link;
        var comps = {};
        var routesToComponents = [];

        if (this.accordion.results && this.accordion.results.length) {

            this.accordion.results.map(function(item, key) {
                link = global.paths.prodLinks+"/com.sia.commonsense.shared.LoginServlet?code="+item.code+"&company="+this.GetCompany();

                if (item.sublinks && item.sublinks.length) {
                    item.sublinks.map((comp) => {
                        try {
                            let Component = require('./pages/'+this.Camelize(comp.name, true)+'.js').default;
                            routesToComponents.push(<Route path={global.paths.dev+comp.url} key={key} exact component={Component} />);
                        }
                        catch(err) {
                            /* Render dashboard in case of pages that don't exist yet
                             * TODO: Uncomment the console message to see a list components that still need to be created.
                             * console.log('Failed to create a route for the Component: '+this.Camelize(comp.name, true)+". Rendering Dashboard instead.");
                             */
                            routesToComponents.push(<Route path={global.paths.dev+comp.url} key={key} exact component={Dashboard} />);
                        }
                  	});
                }
            }, this);
        }

        return (
          <Layout accordion={this.accordion} companies={this.companies} employeeName={this.employeeName} defaultCompany={this.defaultCompany}>
                <Switch>
                    {routesToComponents }
                </Switch>
          </Layout>
        );
    }
};

export default App;
