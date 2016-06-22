import React, { Component, PropTypes } from 'react';
import AudioRow from './audio_row.jsx';
import ReactDOM from 'react-dom';
import InfiniteScroll from 'react-infinite-scroller'

var scroll_position = 0;

class AudioList extends Component {

	componentDidMount() {
		this.props.HandleLoadAudios();
		window.addEventListener('scroll', this.handleScroll);
	}

	handleNewAudioPlay(audiomodel) {
		this.props.handleUpdatePlaying(audiomodel);
	}

	componentWillUnmount() {
    	window.removeEventListener('scroll', this.handleScroll);
	}

	handleScroll() {

		let body = document.body;
    	let	html = document.documentElement;

		let scrollSize = Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
	    let scrollOffset = body.scrollTop;
	    let windowHeight = window.innerHeight;
	    scroll_position = scrollSize - scrollOffset - windowHeight;

	    console.log('value -> ', scroll_position);
	    console.log('value scrollSize -> ', scrollSize);
	    console.log('value scrollOffset -> ', scrollOffset)
	    console.log('value windowHeight -> ', windowHeight);


	    if (scroll_position < 200) {
	    	console.log(':::: LOAD MORE :::::');
	    	this.props.HandleLoadAudios();
	    } 
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