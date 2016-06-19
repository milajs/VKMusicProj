import React, { Component, PropTypes } from 'react';
import MenuSection from './menu/menu_section.jsx';
import PlayerSection from './player/player_section.jsx';

var css = require('./style.styl');


class App extends Component {

  componentDidMount() {
      
  }

  render() {
    return (

      <div>
        <MenuSection />
        <PlayerSection />
      </div>

    )
  }

}

export default App