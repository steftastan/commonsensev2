import React, { Component } from 'react';
import $ from 'jquery';
import { Header } from './components/layout/header.js';
import { BreadCrumbs } from './components/layout/breadcrumbs.js';
import { Accordion } from './components/layout/accordion.js';
import { DataTable } from './components/modules/datatable.js';
import { Widget } from './components/modules/widget.js';

const languages = global.languages;

const AccountsPayable = () => (
    <div className="wrapper wrapper__app App">
        <Header />
        <Accordion />
        <BreadCrumbs/>
        <DataTable />
        <Widget />
    </div>
)





export default AccountsPayable;
