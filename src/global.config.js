import './global.env.js';

global.paths = {
    dev: {
        BASE_URL: '/',
        REACT_LINK: '/commonsense/react/',
        SERVLET_LINK: '/commonsense/react/',
        DASHBOARD: 'dashboard/',
        BUILD_ROUTE: 'commonsense/react/'
    },

    prod: {
        BASE_URL: '/commonsense/',
        REACT_LINK: '/commonsense/react/',
        SERVLET_LINK: '/commonsense/servlet/',
        DASHBOARD: 'dashboard/',
        BUILD_ROUTE: 'react/'
    }

};

global.endpoints  = {
    dev: {
        SESSION: '/webservices/Session.json',
        COMPANIES: '/webservices/Companies.json',
        ACCORDION: '/webservices/FullMenu.json',
        ACCOUNTS_PAYABLE: '/webservices/AccountsPayable.json',
        ACCOUNTS_PAYABLE_CASH_DISBURSEMENT: '/webservices/AccountsPayableCashDisbursement.json',
        ACCOUNTS_PAYABLE_SUMMARY: '/webservices/AccountsPayableSummary.json',
        ACCOUNTS_PAYABLE_TOOLBOX: '/webservices/AccountsPayableToolbox.json',
        ACCOUNTS_PAYABLE_SLIDING: '/webservices/AccountsPayableSlidingToolBox.json',
        PAYROLL: '/webservices/AccountsPayable.json',
        PAYROLL_SUMMARY: '/webservices/AccountsPayableSummary.json',
        PAYROLL_SLIDING: '/webservices/AccountsPayableSlidingToolBox.json'
    },

    prod: {
        SESSION: '/services/user/session',
        COMPANIES: '/services/user/portal/companies',
        ACCORDION: '/services/finance/accounts-payable',
        ACCOUNTS_PAYABLE: '/services/finance/accounts-payable',
        ACCOUNTS_PAYABLE_CASH_DISBURSEMENT: '/services/finance/accounts-payable/cash-disbursement',
        ACCOUNTS_PAYABLE_SUMMARY: '/services/finance/accounts-payable/summary',
        ACCOUNTS_PAYABLE_TOOLBOX: '/commonsense/react/webservices/AccountsPayableToolbox.json',
        ACCOUNTS_PAYABLE_SLIDING: '/commonsense/react/webservices/AccountsPayableSlidingToolBox.json',
        PAYROLL: '/services/finance/accounts-payable',
        PAYROLL_SUMMARY: '/services/finance/accounts-payable/summary',
        PAYROLL_SLIDING: '/commonsense/react/webservices/AccountsPayableSlidingToolBox.json'
    }

};

global.colors =  [
    'rgb(45, 116, 218)',
    'rgb(18, 163, 180)',
    'rgb(254, 133, 0)',
    'rgb(169, 21, 96)',
    'rgb(119, 50, 187)',
    'rgb(254, 97, 0)',
    'rgb(227, 157, 20)',
    'rgb(60, 109, 240)',
    'rgb(227, 188, 19)',
    'rgb(91, 129, 33)',
    'rgb(4, 124, 192)',
    'rgb(0, 167, 143)',
    'rgb(230, 35, 37)',
    'rgb(0, 170, 94)',
    'rgb(194, 45, 213)',
    'rgb(90, 62, 200)'
];
