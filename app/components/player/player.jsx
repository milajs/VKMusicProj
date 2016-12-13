import React, { Component } from 'react';
import ReactPlayer from 'react-player';

var css = require('../../styles/player.styl');

class Player extends Component {
	constructor(props) {
		super(props);

		this.state = {
			played: 0,
			volume: 0.8,
		};
	}

  togglePlay() {
		this.props.togglePlay();
	}

	changeAudio(direction) {
		this.props.changeAudio(direction);
	}

	onSeekChange(e) {
		this.setState({ played: parseFloat(e.target.value) });
		this.refs.player.seekTo(parseFloat(e.target.value));
	}

	onProgress(e) {
		this.setState({ played: parseFloat(e.played) });
	}

	setVolume(e) {
		this.setState({ volume: parseFloat(e.target.value) });
	}

	render() {
    const { audioModel = {}, isPlaying } = this.props;
    const ButtonValue = !isPlaying ? '▶' : '||';

		return (
			<div className="player-body">
				<ReactPlayer
					ref='player'
					url={audioModel.url}
					playing={isPlaying}
					volume={this.state.volume}
					className="player"
					seekTo={this.props.played}
					onProgress={this.onProgress.bind(this)}
					onEnded={this.changeAudio.bind(this, 'next')}
				/>

				<input
					type="button"
					className="play-btn-on-player"
					value={ButtonValue}
					onClick={this.togglePlay.bind(this)}
				/>

				<button className="pervios-audio" onClick={this.changeAudio.bind(this, 'prev')}>
          <img className="switch-buttons-pic" src={require('../../media/prev-arrow.png')} />
        </button>

				<button className="next-audio" onClick={this.changeAudio.bind(this, 'next')}>
          <img className="switch-buttons-pic" src={require('../../media/next-arrow.png')} />
        </button>

				<div className="current-song-on-player">
					<p className="artist-on-player"> {audioModel.artist} </p>
					<p className="title-on-player"> - </p>
					<p className="title-on-player"> {audioModel.title} </p>
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
