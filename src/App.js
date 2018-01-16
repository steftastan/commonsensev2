import './global.variables.js';
import { Hyphenize } from './helper.functions.js';
import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard.js';
import { AccountsPayable } from './pages/AccountsPayable';
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

 /**
  * List of components/pages we can navigate to in our application.
  */
export const data = [
    Login,
    ChangePassword,
    Dashboard,
    AccountsPayable
];

export class App extends Component {
    constructor(props) {
      super(props);
      this.componentList = [];
    }

    render() {

        /**
         * Loop through data array and print the routes for each page of the application.
         */
        var path = '';
        var components = data.map(function(item, key) {
            path = Hyphenize(item.name);
            return (
                <Route path={path} key={key} component={item}/>
            );
        });

        return (
                <Layout>
                    {components}
                </Layout>
        );
    }
};

export default App;
