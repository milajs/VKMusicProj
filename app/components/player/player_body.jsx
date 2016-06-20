import React, { Component, PropTypes } from 'react';
import ReactPlayer from 'react-player';


class Player extends Component {

	constructor(props) {
		super(props);

		this.state = {
			ButtonValue: '▶',
			played: 0
		};
	}

	onSeekChange(event) {    
        this.setState({ played: parseFloat(event.target.value) });
        this.refs.player.seekTo(parseFloat(event.target.value));
    }

	render() {

		return (

			<div className="player-body">

				<ReactPlayer 
					ref='player'
					url={this.props.Audiourl} 
					playing={this.props.playing}
					className="player"
					seekTo={this.props.played} 
				/> 

				<input type="button" className="play-btn-on-player" value={this.state.ButtonValue} />
				<button className="pervios-audio"> <img className="switch-buttons-pic" src={require('./../media/prev-arrow.png')} /> </button>
				<button className="next-audio"> <img className="switch-buttons-pic" src={require('./../media/next-arrow.png')} /> </button>
				<input type='range' className="progress-bar" min={0} max={1} step='any' value={this.state.played} onChange={this.onSeekChange.bind(this)} />
				<input type='range' className="volume-bar" min={0} max={1} step='any' />
				<img className="volume-pic" src={require('./../media/audio-speaker.png')} />
			</div>

		)
	}

}

Player.propTyes = {
	Audiourl: PropTypes.string.isRequired,
	playing: PropTypes.bool.isRequired
};

export default Player