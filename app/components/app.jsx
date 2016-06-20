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
      Audiolist: [],
      Audiourl: '',
      Playing: false
    };
  }

  HandleLoadAudios() {

    vk_getaudios(function (audiosArray){
      if (audiosArray) {
        console.log('alist: ' + audiosArray)
        this.setState( {Audiolist: audiosArray} );
      }
    }.bind(this))
  }

  handleUpdatePlaying(url) {
    this.setState( {Audiourl: url, playing: true} );

    console.log('loloasdadsad ->' + this.state.Audiourl);

    // this.setState( {value: this.state.playing ? '▶' : '||'} );

  }

  render() {

    console.log('url test' + this.state.Audiourl);
    return (

      <div>
        <MenuSection {...this.state} />
        <PlayerSection {...this.state} />
        <AudioList 
          {...this.state} 
          HandleLoadAudios={this.HandleLoadAudios.bind(this)}
          handleUpdatePlaying={this.handleUpdatePlaying.bind(this)} 
        />
      </div>

    )
  }

}

export default App