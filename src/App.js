import './global.variables.js';
import { RequestWidget, Async } from './helper.functions.js';
import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { AccountsPayable } from './AccountsPayable';
import { Layout } from './components/layout/layout.js';
import { Dashboard } from './components/widgets/dashboard.js';
import { BreadCrumbs } from './components/layout/breadcrumbs.js';

/** APP.JS
 * Provides the scaffolding for our application.
 * Create routes to new pages here.
 *
 * Link to React Router 4 documentation:
 * https://reacttraining.com/react-router/web/guides/philosophy
 */

const options = {
    breadcrumbs: [{
        name:'dashboard',
        path:'/'
    }]
};

export class App extends Component {

    render() {

        return (
                <Layout>
                    <BreadCrumbs breadcrumbs={options.breadcrumbs}/>
                    <Route path="/accountsPayable" component={AccountsPayable}/>
                    <Route exact path="/" component={Dashboard}/>
                </Layout>
        );
    }
};

export default App;
