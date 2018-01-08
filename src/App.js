import './global.variables.js';
import { RequestWidget, Async } from './helper.functions.js';
import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { Dashboard } from './Dashboard.js';
import { AccountsPayable } from './AccountsPayable';
import { Layout } from './components/layout/layout.js';

/** APP.JS
 * Provides the scaffolding for our application.
 * Create routes to new pages here.
 *
 * Link to React Router 4 documentation:
 * https://reacttraining.com/react-router/web/guides/philosophy
 */

export class App extends Component {

    render() {

        return (
                <Layout>
                    <Route path="/accountsPayable" component={AccountsPayable}/>
                    <Route exact path="/" component={Dashboard}/>
                </Layout>
        );
    }
};

export default App;
