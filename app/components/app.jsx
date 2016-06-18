import React, { Component, PropTypes } from 'react';
import MenuSection from './menu/menu_section.jsx';

var css = require('./style.styl'); 

//import img from './../src/content/images/program-brand-logo.jpg'
//import img from './media/nophoto.png'

class App extends Component {

  componentDidMount() {
      
    VK.Auth.login(function (cb) {
           console.log("test -> " + cb); 
      },1034);

  }

  render() {
    return (
      <div className="testbody">
        <img src={require('./media/nophoto.png')} />
      	<MenuSection />
      </div>
    )
  }

}

export default App