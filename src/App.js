import React, { Component } from 'react';
// import { Localization } from './helper.localization.js';
import $ from 'jquery';
import { Header } from './comp/layout/header.js';
import { Accordion, Section, SubLinkList } from './comp/layout/accordion.js';
import { BreadCrumbs } from './comp/layout/breadcrumbs.js';
import { Dashboard } from './modules/dashboard.js';


const languages = global.languages;

const App = () => (
    <div className="wrapper wrapper__app App">
        <Header />
        <Accordion />
        <BreadCrumbs/>
        <Dashboard />
    </div>
)





export default App;
