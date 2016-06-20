import React, { Component, PropTypes } from 'react';


class AudioRow extends Component {

	constructor(props) {
		super(props);

		this.state = {
			Value: '▶',
			selectedClass: "audio-row"
		};
	}

	handleClick() { 
		this.props.handleNewAudioRow(this.props.audio); 
	}

	render() {

		var selectedClass;

		if (this.props.CurrentPlayedAudioModel != null) {

			if (this.props.audio.aid === this.props.CurrentPlayedAudioModel.aid) {
				selectedClass = "audio-row selected"
			} else {
				selectedClass = "audio-row"
			}

		} else {
			selectedClass = "audio-row"
		}

		return (

			<tr className={selectedClass}>
				<td className="artist"> {this.props.audio.artist} </td>
				<td className="title"> {this.props.audio.title} </td>
				<td className="buttons-onrow">
					<input type="button" className="stop-btn-onrow" onClick={this.handleClick.bind(this)} value={this.state.Value} /> 
					<a href={this.props.audio.url} download="audio.mp3">
						<button className="download-btn"> <img className="download-img" src={require('./../media/download.png')}/> </button>
					</a>
				</td>
			</tr>

		)
	}
}


AudioRow.propTyes = {
	handleUpdatePlaying: PropTypes.func.isRequired,
	CurrentPlayedAudioModel: PropTypes.object.isRequired
};


export default AudioRow