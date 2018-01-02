import React, { Component } from 'react';
import $ from 'jquery';
import { Dashboard } from './components/modules/dashboard.js';
import { Header } from './components/layout/header.js';
import { BreadCrumbs } from './components/layout/breadcrumbs.js';
import { Accordion, Section, SubLinkList } from './components/layout/accordion.js';

import { Localization } from './helper.localization.js';

const languages = global.languages;

const App = () => (
    <div className="wrapper wrapper__app App">
        <Localization/>
        <Header />
        <Accordion />
        <BreadCrumbs/>
        <Dashboard />
    </div>
)





export default App;
