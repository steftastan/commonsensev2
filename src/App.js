import $ from 'jquery';
import './global.variables.js';
import { Hyphenize, Camelize, GetCompany, SetCompany } from './helper.functions.js';
import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard.js';
import { AccountsPayable } from './pages/AccountsPayable.js';
import { Login } from './pages/Login';
import { ChangePassword } from './pages/ChangePassword';
import { Layout } from './components/layout/layout.js';


/** APP.JS
 * Provides the scaffolding for our application.
 * Create routes to new pages here.
 *
 * Link to React Router 4 documentation:
 * https://reacttraining.com/react-router/web/guides/philosophy
 */

export class App extends Component {

    constructor(props) {
      super(props);
      this.componentList = [];
      this.SetCompany = SetCompany;
      this.GetCompany = GetCompany;
      this.Camelize = Camelize;
      this.updateCompany = this.updateCompany.bind(this);
      this.renderIfLogged = this.renderIfLogged.bind(this);
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

    renderIfLogged() {
        var logoPath = "";
        var link;
        var subLinks;
        var dataLinks = [];
        var testDataLinks = [];

        var comp;
        var path = '';
        var data = [
            {component: Login, path: 'Login'},
            {component: ChangePassword, path: 'ChangePassword'},
            {component: Dashboard, path: 'dashboard'}
        ];


        /** TODO: Call full menu WS here, load the data array with actual
          links so that in the React version of Common Sense, the links will look like:
          http://localhost:9080/commonsense/react/com.sia.commonsense.ap.servlets.APServlet
          Plus I also need to pass the Company in the URL, and the code for the category.
          By passing data via URL I could also dynamically generate the breadcrumbs for each sub page.
        **/

        if (this.accordion.results && this.accordion.results.length) {
            this.accordion.results.map(function(item, key) {
                link = global.paths.prodLinks+"/com.sia.commonsense.shared.LoginServlet?code="+item.code+"&company="+this.GetCompany();

                dataLinks.push({component: comp, path: link});

                if (item.sublinks && item.sublinks.length) {
                    subLinks = item.sublinks.map(function(item, key) {
                        if (item && item.name &&  item.name === "Accounts Payable") {

                            comp = this.Camelize(item.name, true);
                            console.log(comp);
                            console.log(React.Component[comp]);
                            var Compo = Component[comp];



                            testDataLinks.push({component:Compo, path: item.url});
                            //dataLinks.push({component: this.Camelize(item.name, true), path: item.url});
                        }
                    }, this);
                }
            }, this);
        }

        console.log(testDataLinks);

        /**
         * Loop through data array and print the routes for each page of the application.
         */

        // data.map(page => <Route path={page.link} component={page.property} key={page.id}/>);

        var components = data.map(function(item, key) {
            path = '/'+item.path;

            return (
                <Route path={path} key={key} component={item.component} />
            );
        });

        if (global.loggedIn) {
            return (
              <Layout accordion={this.accordion} companies={this.companies} employeeName={this.employeeName} defaultCompany={this.defaultCompany}>
                  <Switch>
                      {components}
                  </Switch>
              </Layout>
            );
        } else {
            return (
                <div>You are not logged in.</div>
            );
        }
    }

    render() {
        return this.renderIfLogged();
    }
};

export default App;
