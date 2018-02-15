module.exports = {
  path: 'AccountsPayable',
  getComponent(location, cb) {
    require.ensure([], (require) => {
      cb(null, require('./../../pages/AccountsPayable/AccountsPayable.js'))
    })
  }
}
