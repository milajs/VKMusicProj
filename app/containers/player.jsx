import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';

import * as menuActions from '../actions/menuActions';

import Player from '../components/player/player_body.jsx';
import SearchField from '../components/player/search_field.jsx';

var css = require('../styles/player.styl');

class PlayerSection extends Component {
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
				<SearchField {...this.props} />
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
    menuActions: bindActionCreators(menuActions, dispatch),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(PlayerSection)
