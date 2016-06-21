import React, { Component, PropTypes } from 'react';
import MenuSection from './menu/menu_section.jsx';
import PlayerSection from './player/player_section.jsx';
import AudioList from './audios/audio_list.jsx';

var css = require('./style.styl');


var audios_array = [];
var search_result = [];
var user_id = [];

function vk_getaudios (callback) {

  VK.Api.call('audio.get', {count: 50}, function(r) { 

    if(r.error) {
      console.log("audio.get error ->" + JSON.stringify(r.error));
    } else {

      audios_array = r.response;
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
            callback(search_result);
        }
    }); 
}


function vk_getrecommend (callback) {

    VK.Api.call('audio.getRecommendations', {user_id: user_id}, function(r) { 

        if(r.error) {
            console.log("audio.getRecommendations error ->" + JSON.stringify(r.error));
        } else {

            search_result = r.response;
            search_result.shift();
            callback(search_result);
            console.log("audio.getRecommendations results ->" + r.response);
        }
    }); 
}


function vk_getuserphoto (callback) {
  VK.Api.call('users.get', {fields: 'photo_200'}, function(r) { 

    if(r.error) {
      console.log("users.get error ->" + JSON.stringify(r.error));
    } else {

      var user = r.response;

      console.log('Данные пользователя ' + JSON.stringify(user[0]));
      callback(user[0]);
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
      CurrentQuery: '',
      User_id: 0,
      ImageUrl: '',
      UserFirstName: '',
      UserLastName: '',
      IsAuth:false
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

  HandleLoadRecommendations() {

    console.log("search recommendations"); 

    vk_getrecommend(function(RecArray) {
          if (RecArray) {
            this.setState( {Audiolist: RecArray} );
          }
        }.bind(this));
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


  GetUserData() {
    console.log(':::: id get ::::');

    vk_getuserphoto(function (userData){

      if (userData) {
        this.setState( {
                IsAuth:true,
                User_id: userData.uid,
                ImageUrl: userData.photo_200, 
                UserFirstName: userData.first_name, 
                UserLastName: userData.last_name} );
        user_id = userData.uid;
      }
    }.bind(this))
  }


  nextAudioByEnd() {
    this.playNextAudio();
  }


  playNextAudio() {

    var audiolist = this.state.Audiolist;
    var indexLastPlayedAudio = audiolist.indexOf(this.state.CurrentPlayedAudioModel);

    if (indexLastPlayedAudio === audiolist.length - 1 ) {

      var audiomodel = audiolist[0];

    } else {

      var audiomodel = audiolist[indexLastPlayedAudio+1];
    }

    this.handleUpdatePlaying(audiomodel);

  }


  playPrevAudio() {

    var audiolist = this.state.Audiolist;
    var indexLastPlayedAudio = audiolist.indexOf(this.state.CurrentPlayedAudioModel);

    if (indexLastPlayedAudio === 0) {

      var audiomodel = audiolist[audiolist.length - 1];

    } else {

      var audiomodel = audiolist[indexLastPlayedAudio-1];

    }

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
        <MenuSection 
          {...this.state} 
          {...this.props} 
          HandleLoadRecommendations={this.HandleLoadRecommendations.bind(this)}
          HandleLoadAudios={this.HandleLoadAudios.bind(this)}
          GetUserData={this.GetUserData.bind(this)}
        />
        <PlayerSection 
          {...this.state}
          {...this.props}
          playPause={this.playPause.bind(this)}
          nextAudioByEnd={this.nextAudioByEnd.bind(this)}
          OnChangeAudioSearchQuery={this.OnChangeAudioSearchQuery.bind(this)}
          playPrevAudio={this.playPrevAudio.bind(this)}
          playNextAudio={this.playNextAudio.bind(this)}

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