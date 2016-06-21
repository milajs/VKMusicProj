import React, { Component, PropTypes } from 'react';
import MenuSection from './menu/menu_section.jsx';
import PlayerSection from './player/player_section.jsx';
import AudioList from './audios/audio_list.jsx';

var css = require('./style.styl');


var audios_array = [];
var search_result = [];

function vk_getaudios (callback) {

  VK.Api.call('audio.get', {count: 50}, function(r) { 

    if(r.error) {
      console.log("audio.get error ->" + JSON.stringify(r.error));
    } else {

      audios_array = r.response;
      //console.log('Список аудио 50 штук: ' + JSON.stringify(audios_array));
      callback(r.response);

    }

  }); 

}

function vk_searchaudio (query,callback) {

    VK.Api.call('audio.search', {q: query}, function(r) { 

        if(r.error) {
            console.log("audio.search error ->" + JSON.stringify(r.error));
        } else {

            search_result = r.response;
            search_result.shift();

            //console.log('результаты поиска:  ' + JSON.stringify(search_result));
            callback(search_result);
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
      Playing: false,
      CurrentQuery: ''
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
    var audiomodel = audiolist[indexLastPlayedAudio+1];
    this.handleUpdatePlaying(audiomodel);
  }

  OnChangeAudioSearchQuery(query) {

      if (query != '') {

        vk_searchaudio(query,function(audio_list) {

          if (audio_list) {

            this.setState( {Audiolist: audio_list} );

          }

        }.bind(this));

    } else {

      this.HandleLoadAudios();

    }

  }

  render() {

    return (

      <div>
        <MenuSection {...this.state} />
        <PlayerSection 
          {...this.state}
          {...this.props}
          playPause={this.playPause.bind(this)}
          nextAudioByEnd={this.nextAudioByEnd.bind(this)}
          OnChangeAudioSearchQuery={this.OnChangeAudioSearchQuery.bind(this)}

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