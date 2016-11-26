import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';

import * as audioActions from '../actions/audioActions';
import { loadAudios } from '../api';

import Player from './player';
import AudioList from './audioList';

var css = require('../styles/player.styl');

class MainContainer extends Component {
  componentWillMount() {
    this.load();
  }

  load() {
    loadAudios(0, (items, count) => {
      if (items) {
        this.props.audioActions.getAudioList(items);
      }
    });
  }

	render() {
		return (
			<div>
        <Player
          {...this.state}
          {...this.props}
        />
        <AudioList
          {...this.state}
          {...this.props}
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
    audioActions: bindActionCreators(audioActions, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(MainContainer)
