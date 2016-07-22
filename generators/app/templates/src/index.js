
const choo = require('choo')
const html = require('choo/html')

const app = choo()

app.model({
  state: {
    counter: 0
  },
  reducers: {
    increment: (_, state) => ({ counter: state.counter + 1 })
  },
  effects: {},
  subscriptions: []
})


const view = (state, prev, send) => {
  return html `
<% if (bootstrap) { -%>
    <div class="container">
      <h1>Hello world</h1>
      <button 
        class="btn btn-default"
        onclick=${() => send('increment')}
      >
        ${state.counter} clicks
      </button>
    </div>
<% } else { -%>
    <div>
      <h1>Hello world</h1>
      <button onclick=${() => send('increment')}>
        ${state.counter} clicks
      </button>
    </div>
<% } -%>
  `
}

app.router((route) => [
  route('/', view)
])

module.exports = app
