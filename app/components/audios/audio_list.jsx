import React, { Component, PropTypes } from 'react';
import AudioRow from './audio_row.jsx';
import ReactDOM from 'react-dom';
// import InfiniteScroll from 'react-infinite-scroller'

// var scroll_position = 0;

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

AudioList.propTyes = {
	HandleLoadAudios: PropTypes.func.isRequired,
	Audiolist: PropTypes.array.isRequired,
	CurrentPlayedAudioModel: PropTypes.object.isRequired,
	playPause: PropTypes.func.isRequired,
	ButtonValue: PropTypes.string.isRequired
};

export default AudioList
