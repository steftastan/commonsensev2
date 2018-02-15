import $ from 'jquery';
import './global.variables.js';
import { Hyphenize, Camelize, GetCompany, SetCompany } from './helper.functions.js';
import React, { Component } from 'react';
import { Switch, Route, Router } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import { Dashboard } from './pages/Dashboard.js';
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
        var childRoutes = [];
        var testDataLinks = {};
        var dataLinks = [];
        var comp;
        var path = '';
        // dataLinks = [
        //     {component: "Login", path: 'login'},
        //     {component: "ChangePassword", path: 'change-password'},
        //     {component: "Dashboard", path: 'dashboard'}
        // ];


        if (this.accordion.results && this.accordion.results.length) {
            this.accordion.results.map(function(item, key) {
                link = global.paths.prodLinks+"/com.sia.commonsense.shared.LoginServlet?code="+item.code+"&company="+this.GetCompany();

                if (item.sublinks && item.sublinks.length) {
                    subLinks = item.sublinks.map(function(item, key) {
                        if (item && item.name &&  item.name === "Accounts Payable") {
                            dataLinks.push({component: this.Camelize(item.name, true), path: item.url});
                        }
                    }, this);
                }
            }, this);
        }

        // console.log(dataLinks);


        var components = dataLinks.map(function(item, key) {
            path = '/'+item.path;
            return (

                <div>

                <Router path={path} key={key} getComponent={(path, cb)=> {
                    require.ensure([], (require) => {
                        cb(null, require('./pages/'+item.component+'.js'));
                    })
                }} />

                <Route path={path} key={key} component={Dashboard} />

                </div>


            );
        });

        console.log(components);

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
