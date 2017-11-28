import React from 'react';
import ReactDOM from 'react-dom';
import './css/App.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import $ from 'jquery';

var commonSenseLinkList = [{
    name: 'Financials',
    color: 'teal',
    icon: 'icon-world_32',
    url: 'http://google.com',
    sublinks: [{
        name: 'General Ledger',
        url: 'http://bmo.com'
    },
    {
        name: 'Accounts Payable',
        url: 'http://bmo.com'
    },
    {
        name: 'Accounts Receivable',
        url: 'http://bmo.com'
    },
    {
        name: 'Payroll',
        url: 'http://bmo.com'
    }]
},
{
    name: 'Customer Service',
    color: 'magenta',
    icon: 'icon-secure_32',
    url: 'http://amazon.com',
    sublinks: [{
        name: 'General Ledger',
        url: 'http://bmo.com'
    },
    {
        name: 'Accounts Payable',
        url: 'http://bmo.com'
    },
    {
        name: 'Accounts Receivable',
        url: 'http://bmo.com'
    },
    {
        name: 'Payroll',
        url: 'http://bmo.com'
    }]
},
{
    name: 'Transportation',
    color: 'lime',
    icon: 'icon-flow_32',
    url: 'http://stackoverflow.com',
    sublinks: [{
        name: 'General Ledger',
        url: 'http://bmo.com'
    },
    {
        name: 'Accounts Payable',
        url: 'http://bmo.com'
    },
    {
        name: 'Accounts Receivable',
        url: 'http://bmo.com'
    },
    {
        name: 'Payroll',
        url: 'http://bmo.com'
    }]
},
{
    name: 'Financials',
    color: 'teal',
    icon: 'icon-world_32',
    url: 'http://google.com',
    sublinks: [{
        name: 'General Ledger',
        url: 'http://bmo.com'
    },
    {
        name: 'Accounts Payable',
        url: 'http://bmo.com'
    },
    {
        name: 'Accounts Receivable',
        url: 'http://bmo.com'
    },
    {
        name: 'Payroll',
        url: 'http://bmo.com'
    }]
},
{
    name: 'Customer Service',
    color: 'magenta',
    icon: 'icon-secure_32',
    url: 'http://amazon.com',
    sublinks: [{
        name: 'General Ledger',
        url: 'http://bmo.com'
    },
    {
        name: 'Accounts Payable',
        url: 'http://bmo.com'
    },
    {
        name: 'Accounts Receivable',
        url: 'http://bmo.com'
    },
    {
        name: 'Payroll',
        url: 'http://bmo.com'
    }]
},
{
    name: 'Transportation',
    color: 'lime',
    icon: 'icon-flow_32',
    url: 'http://stackoverflow.com',
    sublinks: [{
        name: 'General Ledger',
        url: 'http://bmo.com'
    },
    {
        name: 'Accounts Payable',
        url: 'http://bmo.com'
    },
    {
        name: 'Accounts Receivable',
        url: 'http://bmo.com'
    },
    {
        name: 'Payroll',
        url: 'http://bmo.com'
    }]
},
{
    name: 'Financials',
    color: 'teal',
    icon: 'icon-world_32',
    url: 'http://google.com',
    sublinks: [{
        name: 'General Ledger',
        url: 'http://bmo.com'
    },
    {
        name: 'Accounts Payable',
        url: 'http://bmo.com'
    },
    {
        name: 'Accounts Receivable',
        url: 'http://bmo.com'
    },
    {
        name: 'Payroll',
        url: 'http://bmo.com'
    }]
},
{
    name: 'Customer Service',
    color: 'magenta',
    icon: 'icon-secure_32',
    url: 'http://amazon.com',
    sublinks: [{
        name: 'General Ledger',
        url: 'http://bmo.com'
    },
    {
        name: 'Accounts Payable',
        url: 'http://bmo.com'
    },
    {
        name: 'Accounts Receivable',
        url: 'http://bmo.com'
    },
    {
        name: 'Payroll',
        url: 'http://bmo.com'
    }]
},
{
    name: 'Transportation',
    color: 'lime',
    icon: 'icon-flow_32',
    url: 'http://stackoverflow.com',
    sublinks: [{
        name: 'General Ledger',
        url: 'http://bmo.com'
    },
    {
        name: 'Accounts Payable',
        url: 'http://bmo.com'
    },
    {
        name: 'Accounts Receivable',
        url: 'http://bmo.com'
    },
    {
        name: 'Payroll',
        url: 'http://bmo.com'
    }]
},
{
    name: 'Financials',
    color: 'teal',
    icon: 'icon-world_32',
    url: 'http://google.com',
    sublinks: [{
        name: 'General Ledger',
        url: 'http://bmo.com'
    },
    {
        name: 'Accounts Payable',
        url: 'http://bmo.com'
    },
    {
        name: 'Accounts Receivable',
        url: 'http://bmo.com'
    },
    {
        name: 'Payroll',
        url: 'http://bmo.com'
    }]
},
{
    name: 'Customer Service',
    color: 'magenta',
    icon: 'icon-secure_32',
    url: 'http://amazon.com',
    sublinks: [{
        name: 'General Ledger',
        url: 'http://bmo.com'
    },
    {
        name: 'Accounts Payable',
        url: 'http://bmo.com'
    },
    {
        name: 'Accounts Receivable',
        url: 'http://bmo.com'
    },
    {
        name: 'Payroll',
        url: 'http://bmo.com'
    }]
},
{
    name: 'Transportation',
    color: 'lime',
    icon: 'icon-flow_32',
    url: 'http://stackoverflow.com',
    sublinks: [{
        name: 'General Ledger',
        url: 'http://bmo.com'
    },
    {
        name: 'Accounts Payable',
        url: 'http://bmo.com'
    },
    {
        name: 'Accounts Receivable',
        url: 'http://bmo.com'
    },
    {
        name: 'Payroll',
        url: 'http://bmo.com'
    }]
},
{
    name: 'Financials',
    color: 'teal',
    icon: 'icon-world_32',
    url: 'http://google.com',
    sublinks: [{
        name: 'General Ledger',
        url: 'http://bmo.com'
    },
    {
        name: 'Accounts Payable',
        url: 'http://bmo.com'
    },
    {
        name: 'Accounts Receivable',
        url: 'http://bmo.com'
    },
    {
        name: 'Payroll',
        url: 'http://bmo.com'
    }]
},
{
    name: 'Customer Service',
    color: 'magenta',
    icon: 'icon-secure_32',
    url: 'http://amazon.com',
    sublinks: [{
        name: 'General Ledger',
        url: 'http://bmo.com'
    },
    {
        name: 'Accounts Payable',
        url: 'http://bmo.com'
    },
    {
        name: 'Accounts Receivable',
        url: 'http://bmo.com'
    },
    {
        name: 'Payroll',
        url: 'http://bmo.com'
    }]
},
{
    name: 'Transportation',
    color: 'lime',
    icon: 'icon-flow_32',
    url: 'http://stackoverflow.com',
    sublinks: [{
        name: 'General Ledger',
        url: 'http://bmo.com'
    },
    {
        name: 'Accounts Payable',
        url: 'http://bmo.com'
    },
    {
        name: 'Accounts Receivable',
        url: 'http://bmo.com'
    },
    {
        name: 'Payroll',
        url: 'http://bmo.com'
    }]
},
{
    name: 'Financials',
    color: 'teal',
    icon: 'icon-world_32',
    url: 'http://google.com',
    sublinks: [{
        name: 'General Ledger',
        url: 'http://bmo.com'
    },
    {
        name: 'Accounts Payable',
        url: 'http://bmo.com'
    },
    {
        name: 'Accounts Receivable',
        url: 'http://bmo.com'
    },
    {
        name: 'Payroll',
        url: 'http://bmo.com'
    }]
},
{
    name: 'Customer Service',
    color: 'magenta',
    icon: 'icon-secure_32',
    url: 'http://amazon.com',
    sublinks: [{
        name: 'General Ledger',
        url: 'http://bmo.com'
    },
    {
        name: 'Accounts Payable',
        url: 'http://bmo.com'
    },
    {
        name: 'Accounts Receivable',
        url: 'http://bmo.com'
    },
    {
        name: 'Payroll',
        url: 'http://bmo.com'
    }]
},
{
    name: 'Transportation',
    color: 'lime',
    icon: 'icon-flow_32',
    url: 'http://stackoverflow.com',
    sublinks: [{
        name: 'General Ledger',
        url: 'http://bmo.com'
    },
    {
        name: 'Accounts Payable',
        url: 'http://bmo.com'
    },
    {
        name: 'Accounts Receivable',
        url: 'http://bmo.com'
    },
    {
        name: 'Payroll',
        url: 'http://bmo.com'
    }]
}];

var userData = {
    name: 'John Doe',
    company: ['SIA Innovations, Lemieux, John Works Everywhere'],
    dashboardLinks: [{
        category: 'Financials',
        linkName: 'Accounts Payable',
        color: 'teal',
        icon: 'icon-flow_32',
        url: 'http://google.com'
    },
    {
        category: 'Transportation',
        linkName: 'Truck info',
        color: 'magenta',
        icon: 'icon-client_32',
        url: 'http://amazon.com'
    },
    {
        category: 'Customer Service',
        linkName: 'Client Lookup',
        color: 'lime',
        icon: 'icon-workspace_32',
        url: 'http://stackoverflow.com'
    },
    {
        category: 'Financials',
        linkName: 'Jet Fuel',
        color: 'red',
        icon: 'icon-flow_32',
        url: 'http://google.com'
    },
    {
        category: 'Bagel Fridays',
        linkName: 'Can Melt',
        color: 'orange',
        icon: 'icon-secure_32',
        url: 'http://amazon.com'
    },
    {
        category: 'Salad Thursdays',
        linkName: 'Steel Beams',
        color: 'indigo',
        icon: 'icon-tools_32',
        url: 'http://stackoverflow.com'
    },
    {
        category: 'Transportation',
        linkName: 'Truck info',
        color: 'magenta',
        icon: 'icon-client_32',
        url: 'http://amazon.com'
    },
    {
        category: 'Customer Service',
        linkName: 'Client Lookup',
        color: 'lime',
        icon: 'icon-workspace_32',
        url: 'http://stackoverflow.com'
    },
    {
        category: 'Financials',
        linkName: 'Jet Fuel',
        color: 'red',
        icon: 'icon-flow_32',
        url: 'http://google.com'
    },
    {
        category: 'Bagel Fridays',
        linkName: 'Can Melt',
        color: 'warmgray',
        icon: 'icon-secure_32',
        url: 'http://amazon.com'
    },
    {
        category: 'Salad Thursdays',
        linkName: 'Steel Beams',
        color: 'green',
        icon: 'icon-tools_32',
        url: 'http://stackoverflow.com'
    },
    {
        category: 'Transportation',
        linkName: 'Truck info',
        color: 'magenta',
        icon: 'icon-client_32',
        url: 'http://amazon.com'
    },
    {
        category: 'Customer Service',
        linkName: 'Client Lookup',
        color: 'lime',
        icon: 'icon-workspace_32',
        url: 'http://stackoverflow.com'
    },
    {
        category: 'Financials',
        linkName: 'Jet Fuel',
        color: 'red',
        icon: 'icon-flow_32',
        url: 'http://google.com'
    },
    {
        category: 'Bagel Fridays',
        linkName: 'Can Melt',
        color: 'orange',
        icon: 'icon-secure_32',
        url: 'http://amazon.com'
    },
    {
        category: 'Salad Thursdays',
        linkName: 'Steel Beams',
        color: 'indigo',
        icon: 'icon-tools_32',
        url: 'http://stackoverflow.com'
    }]
};

ReactDOM.render(<App userData={userData} commonSenseLinkList={commonSenseLinkList} />, document.getElementById('root'));
registerServiceWorker();
