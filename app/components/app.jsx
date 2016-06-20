import React, { Component, PropTypes } from 'react';
import MenuSection from './menu/menu_section.jsx';
import PlayerSection from './player/player_section.jsx';
import AudioList from './audios/audio_list.jsx';

var css = require('./style.styl');


var audios_array = [];

function vk_getaudios (callback) {
  VK.Api.call('audio.get', {count: 50}, function(r) { 

    if(r.error) {
      console.log("audio.get error ->" + JSON.stringify(r.error));
    } else {

      audios_array = r.response;

      console.log('Список аудио 50 штук: ' + JSON.stringify(audios_array));
      callback(r.response);
    }
  }); 
}


class App extends Component {

    constructor(props){
    super(props);
    this.state = {
      audiolist: [],
    };
  }

  HandleLoadAudios() {

    vk_getaudios(function (audiosArray){
      if (audiosArray) {
        console.log('alist: ' + audiosArray)
        this.setState( {audiolist: audiosArray} );
      }
    }.bind(this))

  }

  render() {
    return (

      <div>
        <MenuSection {...this.state} />
        <PlayerSection />
        <AudioList {...this.state} HandleLoadAudios={this.HandleLoadAudios.bind(this)} />
      </div>

    )
  }

}

export default App