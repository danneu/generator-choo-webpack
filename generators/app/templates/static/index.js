
// Webpack entry-point

// Load style entry-point
require('./css/index.scss')

// Load choo entry-point
const app = require('../src')
document.body.appendChild(app.start())
