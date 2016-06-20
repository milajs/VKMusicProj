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
      ButtonValue: '▶',
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

  handleUpdatePlaying(audiomodel) {

    this.setState( {  

                      Audiourl: audiomodel.url,
                      CurrentPlayedAudioModel:audiomodel, 
                      playing: true, 
                      ButtonValue: '||'

                    } );

  }

  playPause() {

    this.setState( {playing: !this.state.playing, ButtonValue: this.state.playing ? '▶' : '||'} );

  }

  nextAudioByEnd() {

    var audiolist = this.state.Audiolist;

    var indexLastPlayedAudio = audiolist.indexOf(this.state.CurrentPlayedAudioModel);

    console.log('last played audio model in audiolist array -> ' + indexLastPlayedAudio);

    var audiomodel = audiolist[indexLastPlayedAudio+1];

    this.handleUpdatePlaying(audiomodel);

    // var audiomodel = audiolist[this.state.currentAudioIndex];

    // console.log('audio-model  --> ' + audiomodel);

    // this.handleUpdatePlaying(audiomodel);
  }

  render() {

    return (

      <div>
        <MenuSection {...this.state} />
        <PlayerSection 
          {...this.state}
          playPause={this.playPause.bind(this)}
          nextAudioByEnd={this.nextAudioByEnd.bind(this)}
        />
        <AudioList 
          {...this.state} 
          {...this.props} 
          HandleLoadAudios={this.HandleLoadAudios.bind(this)}
          handleUpdatePlaying={this.handleUpdatePlaying.bind(this)} 
        />
      </div>

    )
  }

}

export default App