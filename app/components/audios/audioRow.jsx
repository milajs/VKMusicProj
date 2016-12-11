import React, { Component, PropTypes } from 'react';

const css = require('../../styles/audioList.styl');

class AudioRow extends Component {

	handleClick() {
		this.props.toggleAudio(this.props.audio);
	}

	render() {
    const { audio = {}, currentAudio = {}, isPlaying } = this.props;
    const isCurrentAudio = audio.id == currentAudio.id;

    const value = (isCurrentAudio && isPlaying) ? '||' : "▶";

		const selectedClass = isCurrentAudio ? "audio-row selected" : "audio-row";

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
