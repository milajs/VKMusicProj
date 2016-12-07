import React, { Component, PropTypes } from 'react';

class AudioRow extends Component {

	handleClick() {
		this.props.toggleAudio(this.props.audio);
	}

	render() {
    const { audio = {}, currentAudio = {}, isPlaying } = this.props;
    const isCurrentAudio = audio.id == currentAudio.id;

    const value = (isCurrentAudio && isPlaying) ? '||' : "▶";

		var selectedClass;

		if (this.props.CurrentPlayedAudioModel != null) {

			if (this.props.audio.id === this.props.CurrentPlayedAudioModel.id) {
				selectedClass = "audio-row selected";
			} else {
				selectedClass = "audio-row"
			}
		} else {
			selectedClass = "audio-row"
		}

		return (
			<tr className={selectedClass}>
				<td className="artist"> {audio.artist} </td>
				<td className="title"> {audio.title} </td>
				<td className="buttons-onrow">
					<input type="button" className="stop-btn-onrow" onClick={this.handleClick.bind(this)} value={value} />
					<a href={audio.url} download="audio.mp3">
						<button className="download-btn"><img className="download-img" src={require('../../media/download.png')}/></button>
					</a>
				</td>
			</tr>
		)
	}
}

export default AudioRow
