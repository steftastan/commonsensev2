import './global.config.js';

global.pages = {
    AccountsPayable: {
        widgets : [{
            name: 'toolBox',
            endpoint: global.endpoints[global.env].ACCOUNTS_PAYABLE_TOOLBOX
        }, {
            name: 'dataTable',
            title: 'Accounts Payable',
            endpoint: global.endpoints[global.env].ACCOUNTS_PAYABLE,
            bootStrapClass : 'col-12',
            options: {
                sizePerPageList: [ {
                text: '25', value: 25
                }, {
                text: '50', value: 50
                }, {
                text: '500', value: 500
                }],
                sizePerPage: 25
            }
        }, {
            name: 'dataTable',
            title: 'cashDisbursement',
            endpoint: global.endpoints[global.env].ACCOUNTS_PAYABLE_CASH_DISBURSEMENT,
            bootStrapClass : 'col-lg-6 col-sm-12',
            options: {}
        }, {
            name: 'dataChart',
            title: 'accountsPayableChart',
            endpoint: global.endpoints[global.env].ACCOUNTS_PAYABLE_CASH_DISBURSEMENT,
            bootStrapClass : 'col-lg-6 col-sm-12',
            type: 'pie',
            aggregateBy: 'type',
            calculateBy: 'totalDue',
            label: 'accountsPayableChart',
            buildTable: true
        }, {
            name: 'dataTable',
            title: 'Testing Table',
            endpoint: global.endpoints[global.env].ACCOUNTS_PAYABLE_SUMMARY,
            bootStrapClass : 'col-lg-6 col-sm-12',
            options: {}
        }, {
            name: 'slidingToolbox',
            endpoint: global.endpoints[global.env].ACCOUNTS_PAYABLE_SLIDING
        }
    ]},

    Payroll: {
        widgets : [{
            name: 'dataTable',
            title: 'Payroll',
            endpoint: global.endpoints[global.env].PAYROLL,
            bootStrapClass : 'col-12',
            options: {
                sizePerPageList: [ {
                text: '25', value: 25
                }, {
                text: '50', value: 50
                }, {
                text: '500', value: 500
                }],
                sizePerPage: 25
            }
        }, {
            name: 'dataChart',
            title: 'Payroll',
            endpoint: global.endpoints[global.env].PAYROLL_SUMMARY,
            bootStrapClass : 'col-lg-6 col-sm-12',
            type: 'pie',
            aggregateBy: 'type',
            calculateBy: 'totalDue',
            label: 'accountsPayableChart',
            buildTable: true
        }, {
            name: 'dataTable',
            title: 'Payroll',
            endpoint: global.endpoints[global.env].PAYROLL_SUMMARY,
            bootStrapClass : 'col-lg-6 col-sm-12',
            options: {}
        }
    ]}
};
