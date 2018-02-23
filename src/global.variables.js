/**
 * GLOBAL variables
 * Temporary solution to reflect how session info storage and cookies would work.
 * For language switching, company switch management, etc.
 */

global.loggedIn = true;
global.company = 'BOW';
global.paths = {
    dev: '/',
    prod: '/commonsense/',
    devReactLink: '/commonsense/react/',
    prodReactLink: '/commonsense/react/',
    prodServletLink: '/commonsense/servlet/',
    devServletLink: '/commonsense/react/',
    devCategoryLinks: 'dashboard/',
    devCategoryLinksParam: ':code',
    prodCategoryLinks: 'com.sia.commonsense.shared.LoginServlet?code=',
    prodCategoryLinksParam: ''
};

global.endpoints = {
    companies:  {
        prod: global.paths.dev+'services/user/portal/companies',
        dev: '/webservices/Companies.json'
    },
    accordion: {
        prod: global.paths.dev+'services/user/portal/menu',
        dev: '/webservices/FullMenu.json'
    },
    accountsPayable:  {
        prod: global.paths.dev+'services/finance/accounts-payable',
        dev: '/webservices/AccountsPayable.json'
    },
    cashDisbursement: {
        prod: global.paths.dev+'services/finance/accounts-payable/cash-disbursement',
        dev: '/webservices/AccountsPayableCashDisbursement.json'
    },
    summary: {
        prod: global.paths.dev+'services/finance/accounts-payable/summary',
        dev: '/webservices/AccountsPayableSummary.json'
    },
    toolBox: {
        prod: global.paths.devReactLink+'webservices/AccountsPayableToolbox.json', /* TODO: Create data endpoint for this */
        dev: '/webservices/AccountsPayableToolbox.json'
    },
    sliding: {
        prod: global.paths.devReactLink+'webservices/AccountsPayableSlidingToolBox.json', /* TODO: Create data endpoint for this  */
        dev: '/webservices/AccountsPayableSlidingToolBox.json'
    },
    session: {
        prod: global.paths.dev+'services/user/session',
        dev: null /* No need for session storage on dev */
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
