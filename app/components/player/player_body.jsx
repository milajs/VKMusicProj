import React, { Component, PropTypes } from 'react';
import ReactPlayer from 'react-player';


class Player extends Component {

	constructor(props) {
		super(props);

		this.state = {
			ButtonValue: '▶'
		};
	}

	render() {
		return (

			<div className="player-body">

				<ReactPlayer 
					ref='player'
					playing
					className="player" 
				/> 

				<input type="button" className="play-btn-on-player" value={this.state.ButtonValue} />
				<button className="pervios-audio"> <img className="switch-buttons-pic" src="http://cs415216.vk.me/u138009602/docs/0db858380268/prev-arrow.png" /> </button>
				<button className="next-audio"> <img className="switch-buttons-pic" src="http://cs615430.vk.me/u138009602/docs/91670ae29878/next-arrow.png" /> </button>
				<input type='range' className="progress-bar" min={0} max={1} step='any' />
				<input type='range' className="volume-bar" min={0} max={1} step='any' />
				<img className="volume-pic" src="http://cs415521.vk.me/u138009602/docs/835c5ecbaae0/audio-speaker.png" />
			</div>

		)
	}

}

export default Player