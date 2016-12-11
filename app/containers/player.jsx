import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';

import * as audioActions from '../actions/audioActions';
import * as playerActions from '../actions/playerActions';
import { searchAudios, loadAudios } from '../api';

import Player from '../components/player/player_body.jsx';
import SearchField from '../components/player/search_field.jsx';

var css = require('../styles/player.styl');

class PlayerSection extends Component {
  handleSearch(value) {
    searchAudios(value, (items) => {
      if (items) {
        this.props.audioActions.getAudioList(items);
      }
    });
  }

  handleLoadAudios() {
    loadAudios(0, (items, count) => {
      if (items) {
        this.props.audioActions.getAudioList(items);
      }
    });
  }

  togglePlay() {
    const { isPlaying } = this.props.state;

    this.props.playerActions.togglePlay(!isPlaying);
  }

  changeAudio(direction) {
    const { audioList = [], currentAudio = {} } = this.props.state;
    const currentIndex = audioList.indexOf(currentAudio);

    if (direction === `prev` && currentIndex !== 0) {
      const payload = {
        audio: audioList[currentIndex - 1],
        isPlaying: true,
      };

      this.props.audioActions.changeAudio(payload);
    }

    if (direction === `next` && currentIndex !== audioList.length - 1) {
      const payload = {
        audio: audioList[currentIndex + 1],
        isPlaying: true,
      };

      this.props.audioActions.changeAudio(payload);
    }
  }

	render() {
    const { state } = this.props;
    const { audioList = [], isPlaying , currentAudio = {}} = state;

		return (
			<div className="player-block">
				<Player
          audioModel={currentAudio}
          isPlaying={isPlaying}
          togglePlay={this.togglePlay.bind(this)}
          changeAudio={this.changeAudio.bind(this)}
        />

				<SearchField
          onChange={this.handleSearch.bind(this)}
          onLoadAudios={this.handleLoadAudios.bind(this)}
        />
			</div>
		)
	}
}

function mapStateToProps(state) {
  return {
    state
  }
}
function mapDispatchToProps(dispatch) {
  return {
    audioActions: bindActionCreators(audioActions, dispatch),
    playerActions: bindActionCreators(playerActions, dispatch),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(PlayerSection)
