import './global.variables.js';
import { Hyphenize } from './helper.functions.js';
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
    }

    render() {
        var path ='';
        var data = [
            {component: Login, path: 'Login'},
            {component: ChangePassword, path: 'ChangePassword'},
            {component: Dashboard, path: 'Dashboard'},
            {component: AccountsPayable, path: 'AccountsPayable'}
        ];

        /**
         * Loop through data array and print the routes for each page of the application.
         */

        var components = data.map(function(item, key) {
            path = global.paths.dev+Hyphenize(item.path);
            console.log(path);
            return (
                <Route path={path} key={key} component={item.component}/>
            );
        });

        return (
            <Layout>
                <Switch>
                    {components}
                </Switch>
            </Layout>
        );
    }
};

export default App;
