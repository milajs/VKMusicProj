import React, { Component, PropTypes } from 'react';


class AudioRow extends Component {

	handleClick() { 
		this.props.handleNewAudioRow(this.props.audio); 

		console.log('audio id  -->  ' + this.props.audio.id);
		console.log('current audio id  -->  ' + this.props.CurrentPlayedAudioModel.id);
	}

	render() {

		var selectedClass;
		var value;

		if (this.props.CurrentPlayedAudioModel != null) {

			if (this.props.audio.id === this.props.CurrentPlayedAudioModel.id) {
				selectedClass = "audio-row selected";
				value = this.props.ButtonValue;


			} else {
				selectedClass = "audio-row"
				value = "▶";
			}

		} else {
			selectedClass = "audio-row"
			value = "▶";
		}

		return (

			<tr className={selectedClass}>
				<td className="artist"> {this.props.audio.artist} </td>
				<td className="title"> {this.props.audio.title} </td>
				<td className="buttons-onrow">
					<input type="button" className="stop-btn-onrow" onClick={this.handleClick.bind(this)} value={value} /> 
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
	CurrentPlayedAudioModel: PropTypes.object.isRequired,
	ButtonValue: PropTypes.string.isRequired
};


export default AudioRow