global.pages = {

    AccountsPayable: {
        widgets : [{
            name: 'toolBox',
            endpoint: global.endpoints.toolBox.dev
        }, {
            name: 'dataTable',
            title: 'Accounts Payable',
            endpoint: global.endpoints.accountsPayable.dev,
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
            endpoint: global.endpoints.cashDisbursement.dev,
            bootStrapClass : 'col-lg-6 col-sm-12',
            options: {}
        }, {
            name: 'dataChart',
            title: 'accountsPayableChart',
            endpoint: global.endpoints.cashDisbursement.dev,
            bootStrapClass : 'col-lg-6 col-sm-12',
            type: 'pie',
            aggregateBy: 'type',
            calculateBy: 'totalDue',
            label: 'accountsPayableChart',
            buildTable: true
        }, {
            name: 'dataTable',
            title: 'Testing Table',
            endpoint: global.endpoints.summary.dev,
            bootStrapClass : 'col-lg-6 col-sm-12',
            options: {}
        }, {
            name: 'slidingToolbox',
            endpoint: global.endpoints.sliding.dev
        }
    ]},

    Payroll: {
        widgets : [{
            name: 'dataTable',
            title: 'Payroll',
            endpoint: global.endpoints.accountsPayable.dev,
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
            endpoint: global.endpoints.cashDisbursement.dev,
            bootStrapClass : 'col-lg-6 col-sm-12',
            type: 'pie',
            aggregateBy: 'type',
            calculateBy: 'totalDue',
            label: 'accountsPayableChart',
            buildTable: true
        }, {
            name: 'dataTable',
            title: 'Payroll',
            endpoint: global.endpoints.summary.dev,
            bootStrapClass : 'col-lg-6 col-sm-12',
            options: {}
        }
    ]}
};
