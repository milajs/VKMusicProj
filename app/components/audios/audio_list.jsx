import React, { Component, PropTypes } from 'react';
import AudioRow from './audio_row.jsx';

// var audios_array = [];

// function vk_getaudios (callback) {
// 	VK.Api.call('audio.get', {count: 50}, function(r) { 

// 		if(r.error) {
// 			console.log("audio.get error ->" + JSON.stringify(r.error));
// 		} else {

// 			audios_array = r.response;

// 			console.log('Список аудио 50 штук: ' + JSON.stringify(audios_array));
// 			callback(r.response);
// 		}
// 	}); 
// }


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
	CurrentPlayedAudioModel: PropTypes.object.isRequired
};

export default AudioList