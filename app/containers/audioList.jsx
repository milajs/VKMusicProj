import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';

import AudioRow from '../components/audios/audioRow';

class AudioList extends Component {
	componentDidMount() {
		this.props.HandleLoadAudios();
	}

	handleNewAudioPlay(audiomodel) {
		this.props.handleUpdatePlaying(audiomodel);
	}

	render() {
		var _data = this.props.Audiolist

		return (
			<div className="audio-section">
				<table>
					<tbody>
						{_data.map(function(audioModel, i) {
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

export default AudioList
