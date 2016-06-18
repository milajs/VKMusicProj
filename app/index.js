import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/app'

VK.init({
    apiId: 5505191
});

ReactDOM.render(<App />, document.getElementById('root'))
