import './global.variables.js';
import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard.js';
import { AccountsPayable } from './pages/AccountsPayable';
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
                    <Route exact path="/" component={Dashboard}/>
                    <Route path="/accountsPayable" component={AccountsPayable}/>
                </Layout>
        );
    }
};

export default App;
