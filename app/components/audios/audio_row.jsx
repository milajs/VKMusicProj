import React, { Component, PropTypes } from 'react';


class AudioRow extends Component {

	constructor(props) {
		super(props);

		this.state = {
			Value: '▶'
		};
	}

	handleClick() { 
		this.props.handleNewAudioRow(this.props.audio.url);
	}

	render() {
		return (

			<tr>
				<td className="artist"> {this.props.audio.artist} </td>
				<td> {this.props.audio.title} </td>
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
};


export default AudioRow