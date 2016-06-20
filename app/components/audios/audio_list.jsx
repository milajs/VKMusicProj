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

	// constructor(props) {
	// 	super(props);

	// 	this.state = {
	// 		audiolist: []
	// 	};
	// }

	componentDidMount() {

		this.props.HandleLoadAudios();

		// vk_getaudios(function (audiosArray){
		// 	if (audiosArray) {
		// 		console.log('alist: ' + audiosArray)
		// 		this.setState( {audiolist: audiosArray} );
		// 	}
		// }.bind(this))
	}

	handleTest(url,key) {
		this.props.handleUpdate(url,key);
	}


	render() {

		var _data = this.props.audiolist

		return (

			<div className="audio-section">
				<table>
					<tbody>

						{_data.map(function(audioModel, i) {
							return <AudioRow 
										audio={audioModel} 
										handleUpdate={this.handleTest} 
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
	audiolist: PropTypes.array.isRequired
};

export default AudioList