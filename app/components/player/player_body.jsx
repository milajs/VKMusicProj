import React, { Component } from 'react';
import ReactPlayer from 'react-player';

var css = require('../../styles/player.styl');

class Player extends Component {
	constructor(props) {
		super(props);

		this.state = {
			played: 0,
			volume: 0.8
		};
	}

	onSeekChange(event) {
		this.setState({ played: parseFloat(event.target.value) });
		this.refs.player.seekTo(parseFloat(event.target.value));
	}

	onProgressHandle(event) {
		this.setState({ played: parseFloat(event.played) });
	}

	setVolume(event) {
		this.setState({ volume: parseFloat(event.target.value) });
	}

	onClick() {
		this.props.playPause();
	}

	onEndedHandle() {
		this.props.nextAudioByEnd();
	}

	ChangeAudioPrev() {
		this.props.playPrevAudio();
	}

	ChangeAudioNext() {
		this.props.playNextAudio();
	}

	render() {
    const { currentAudio = {} } = this.props;

		return (
			<div className="player-body">
				<ReactPlayer
					ref='player'
					url={this.props.Audiourl}
					playing={this.props.playing}
					volume={this.state.volume}
					className="player"
					seekTo={this.props.played}
					onProgress={this.onProgressHandle.bind(this)}
					onEnded={this.onEndedHandle.bind(this)}
				/>

				<input
					type="button"
					className="play-btn-on-player"
					value={this.props.ButtonValue}
					onClick={this.onClick.bind(this)}
				/>

				<button className="pervios-audio" onClick={this.ChangeAudioPrev.bind(this)}> <img className="switch-buttons-pic" src={require('../../media/prev-arrow.png')} /> </button>
				<button className="next-audio" onClick={this.ChangeAudioNext.bind(this)}> <img className="switch-buttons-pic" src={require('../../media/next-arrow.png')} /> </button>

				<div className="current-song-on-player">
					<p className="artist-on-player"> {currentAudio.artist} </p>
					<p className="title-on-player"> - </p>
					<p className="title-on-player"> {this.props.CurrentTitle} </p>
				</div>

				<input
					type='range'
					className="progress-bar"
					min={0}
					max={1}
					step='any'
					value={this.state.played}
					onChange={this.onSeekChange.bind(this)}
				/>
				<input
					type='range'
					className="volume-bar"
					min={0}
					max={1}
					step='any'
					value={this.state.volume}
					onChange={this.setVolume.bind(this)}
				/>
				<img className="volume-pic" src={require('../../media/audio-speaker.png')} />
			</div>
		)
	}
}

export default Player
