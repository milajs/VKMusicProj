import React, { Component, PropTypes } from 'react';
import MenuSection from './menu/menu_section.jsx';

var css = require('./style.styl');


class App extends Component {

  componentDidMount() {
      
      VK.Auth.login(function (cb) {
           console.log("test -> " + cb); 
      },1034);
  }

  render() {
    return (

      <div>
        <MenuSection />
      </div>

    )
  }

}

export default App