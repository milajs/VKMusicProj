import React, { Component } from 'react';
import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';

import * as audioActions from '../actions/audioActions';
import { loadAudios } from '../api';

import AudioRow from '../components/audios/audioRow';

class AudioList extends Component {
	handleNewAudioPlay(audiomodel) {
		this.props.handleUpdatePlaying(audiomodel);
	}

	render() {
		var _data = this.props.Audiolist;
    const { audioList = {} } = this.props.state;

		return (
			<div className="audio-section">
				<table>
					<tbody>
						{audioList.map(function(audioModel, i) {
							return <AudioRow
										{...this.props}
										{...this.state}
										audio={audioModel}
										handleNewAudioRow={this.handleNewAudioPlay.bind(this)}
										audioIndex={i}
										key={i}
									/>
						}.bind(this))}
					</tbody>
				</table>
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
export default connect(mapStateToProps, mapDispatchToProps)(AudioList)
