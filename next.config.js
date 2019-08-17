const path = require('path')

module.exports = {
  webpack (config, options) {
    config.resolve.alias['components'] = path.join(__dirname, 'components')
    config.resolve.alias['util'] = path.join(__dirname, 'util')
    config.resolve.alias['material-ui'] = path.join(__dirname, 'material-ui')
    config.resolve.alias['static'] = path.join(__dirname, 'static')
    return config
  }
}