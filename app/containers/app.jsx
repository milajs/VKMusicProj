import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Authorize from './authorize';
import Menu from './menu';
import Player from './player';
import AudioList from './audioList';

const css = require('../styles/style.styl');

var audios_array = [];
var search_result = [];
var user_id = [];

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
      IsAuth: false,
      OffsetCounter: 0,
      TotalCountAudios: 0,
      CurrentArtist: '',
      CurrentTitle: ''
    };
  }

  playPause() {
    this.setState( {playing: !this.state.playing, ButtonValue: this.state.playing ? '▶' : '||'} );
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

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
     window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    let body = document.body;
    let html = document.documentElement;

    let scrollSize = Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
    let scrollOffset = body.scrollTop;
    let windowHeight = window.innerHeight;
    let scroll_position = scrollSize - scrollOffset - windowHeight;
  }

  render() {
    const { state } = this.props;
    const { isAuth } = state;

    if (isAuth === false) {
      return (
        <Authorize />
      )
    }
    if (isAuth === true) {
      return (
        <div>
          <Menu />

          <Player
            {...this.state}
            {...this.props}
            playPause={this.playPause.bind(this)}
            nextAudioByEnd={this.nextAudioByEnd.bind(this)}
            playPrevAudio={this.playPrevAudio.bind(this)}
            playNextAudio={this.playNextAudio.bind(this)}
          />
          <AudioList
            {...this.state}
            {...this.props}
          />
        </div>
      )
    }
  }
}

function mapStateToProps (state) {
  return {
    state
  }
}

export default connect(mapStateToProps)(App)
