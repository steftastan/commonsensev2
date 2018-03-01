import $ from 'jquery';
import './global.variables.js';
import { Camelize, GetSession, SetSession, Localization } from './helper.functions.js';
import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Header } from './components/layout/header.js';
import { CompanyList } from './components/layout/company-list.js';
import { Accordion } from './components/layout/accordion.js';
import { Login } from './pages/Login.js';
import { ChangePassword } from './pages/ChangePassword.js';
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
      this.GetSession = GetSession;
      this.SetSession = SetSession;
      this.Camelize = Camelize;
      this.Localization = Localization;
      this.updateCompany = this.updateCompany.bind(this);
      this.companies = {};
      this.language = '';
      this.employeeName = '';
      this.defaultCompany = '';
      this.accordion = {};
      this.routesToComponents = [];
      this.routes = {};
      this.companyDropDown = 'companyList';
      this.state = {
          routes: null,
          loaded: false,
          accordion: null,
          language: '',
          companies: [],
          employeeName: '',
          defaultCompany: '',
          logoPath: ''
      }
    }

    componentWillMount() {
        var link;
        var comps = {};
        var routes = [];

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
                url: global.endpoints.accordion.prod,
                dataType: 'json',
                cache: false,
                success: function(data) {
                    if (data && data.results) {
                        this.accordion = data;
                        this.routes = data.results;
                    }
                }.bind(this),
                error: function(xhr, status, err) {
                    console.error(this.state.url, status, err.toString());
                }.bind(this)
            }),

            $.ajax({
                url: global.endpoints.companies.prod,
                dataType: 'json',
                cache: false,
                success: function(data) {
                    this.companies = data;
                }.bind(this),
                error: function(xhr, status, err) {
                    console.error(this.state.url, status, err.toString());
                }.bind(this)
            }),

            $.ajax({
                url: global.endpoints.session.prod,
                dataType: 'json',
                cache: false,
                success: function(data) {
                    this.employeeName = data.userId;
                    this.defaultCompany = data.fileName;
                    this.language = data.language;
                }.bind(this),
                error: function(xhr, status, err) {
                    console.error(this.state.url, status, err.toString());
                }.bind(this)
            })

        ).then(function() {

            /* Set the state variables for all the information obtained in every AJAX call */

                this.setState({
                    accordion: this.accordion,
                    companies: this.companies,
                    employeeName: this.employeeName,
                    defaultCompany: this.defaultCompany,
                    language: this.language,
                    routes: this.routes,
                    logoPath: global.paths.prod+'images/logo/'+this.defaultCompany+'/logo.gif'
                });


        }.bind(this));

    }

    updateCompany(e) {
        this.setState({
            defaultCompany: e.target.value,
            logoPath: global.paths.prod+'images/logo/'+e.target.value+'/logo.gif'
        });

        /* Update default company */
        this.SetSession(null, this.defaultCompany.name, null);
    }

    render() {
        var code;
        var links = {};
        var page = [];
        var componentName;
        var staticPages = [
            {component: Login, path: 'login'},
            {component: ChangePassword, path: 'change-password'},
            {component: Dashboard, path: 'dashboard'}
        ];

        /* Create routes to pages that aren't returned from the DB
         * The Dashboard is code 7 in the links list. Update dashboard path to this:
         * servlet/com.sia.commonsense.shared.LoginServlet?code=7
         */
        staticPages.map(function(comp, key) {
            this.routesToComponents.push(<Route
                exact
                key={key}
                path={global.paths.prodReactLink+comp.path}
                component={comp.component} />);
        }, this);

        if (this.state.routes && this.state.routes.length) {

            this.state.routes.map(function(item, key) {

                /**
                 * Build routes to the Dashboard component.
                 * Each category will render depending on the value of
                 * the code parameter passed via URL.
                 */
                this.routesToComponents.push(
                    <Route
                        exact
                        key={key}
                        path={global.paths.prodReactLink+global.paths.prodCategoryLinks+global.paths.prodCategoryLinksParam}
                        render={(props) => (
                            <Dashboard {...props} company={this.state.defaultCompany} language={this.state.language} />
                        )}
                    />);

                if (item.sublinks && item.sublinks.length) {
                    item.sublinks.map(function(comp, key) {

                        /**
                         * We will build the components and point to the routes by
                         * taking the info from the URL value, because it's the one
                         * consistent piece of information in between language switches
                         * and whatever name users want to give their links.
                         */
                        componentName = comp.url.split(global.paths.prodBuildComponent);

                        if (componentName.length > 1) {
                            componentName = this.Camelize(componentName[1], true);
                        }

                        try {
                            let Component = require('./pages/'+componentName+'.js').default;
                            page = {
                                code: item.code,
                                category: item.name,
                                name: comp.name,
                                url: comp.url,
                                isPage: true
                            };

                            this.routesToComponents.push(
                                <Route
                                    exact
                                    key={key}
                                    path={global.paths.prod+comp.url}
                                    render={(props) => (
                                        <Component {...props} page={page} company={this.state.defaultCompany} language={this.state.language}  />
                                    )}
                                />);
                        } catch(err) {
                            /** Render dashboard in case of pages that don't exist yet
                             * TODO: Uncomment the console message to see a list components that still need to be created.
                             * console.log('Failed to create a route for the Component: '+this.Camelize(comp.name, true));
                             */
                        }

                    }, this);
                }
            }, this);
        }

        return (
            <div className="wrapper wrapper__app App">
                <Accordion
                    links={this.state.accordion}
                    employeeName={this.state.employeeName}
                    language={this.state.language}>
                    <CompanyList
                        onChange={this.updateCompany}
                        defaultCompanyName={this.state.defaultCompany}
                        defaultCompanyIcon={this.state.logoPath}
                        companies={this.state.companies}
                        language={this.state.language} />
                 </Accordion>
                 <section id="contentWrapper" className="wrapper wrapper__content wrapper__content--inner">
                     <Header
                        companies={this.state.companies}
                        defaultCompanyName={this.state.defaultCompany}
                        defaultCompanyIcon={this.state.logoPath}
                        language={this.state.language} />
                    <Switch>
                        {this.routesToComponents}
                    </Switch>
                 </section>
            </div>
        );
    }
};

export default App;
