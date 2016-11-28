import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';

import * as audioActions from '../actions/audioActions';
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

	render() {
    const { state } = this.props;
    const { audioList = [] } = state;

    const hasCurrentAudio = Object.keys(state.currentAudio).length > 0;
    const audioModel = hasCurrentAudio ? state.currentAudio : audioList[0];

		return (
			<div className="player-block">
				<Player
          {...this.props}
          audioModel={audioModel}
        />
				<SearchField
          {...this.props}
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
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(PlayerSection)
