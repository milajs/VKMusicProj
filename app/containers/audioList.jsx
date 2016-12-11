import React, { Component } from 'react';
import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';

import * as audioActions from '../actions/audioActions';
import * as playerActions from '../actions/playerActions';
import { loadAudios } from '../api';

import AudioRow from '../components/audios/audioRow';

class AudioList extends Component {
  componentWillMount() {
    this.load();
  }

  load() {
    loadAudios(0, (items, count) => {
      if (items) {
        const payload = {
          audio: items[0],
          isPlaying: false,
        };

        this.props.audioActions.getAudioList(items);
        this.props.audioActions.changeAudio(payload);
      }
    });
  }

	toggleAudio(audioModel) {
    const { currentAudio = {}, isPlaying } = this.props.state;

    if (currentAudio.id === audioModel.id) {
      this.props.playerActions.togglePlay(!isPlaying);

    } else {
      const payload = {
        audio: audioModel,
        isPlaying: true,
      };

      this.props.audioActions.changeAudio(payload);
    }
	}

	render() {
    const { audioList = [], currentAudio = {}, isPlaying } = this.props.state;

		return (
			<div className="audio-section">
				<table>
          <tbody>
  					{audioList.map(function(audioModel, i) {
  						return <AudioRow
      									audio={audioModel}
                        currentAudio={currentAudio}
      									toggleAudio={this.toggleAudio.bind(this)}
                        isPlaying={isPlaying}
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

function mapStateToProps(state) {
  return {
    state
  }
}
function mapDispatchToProps(dispatch) {
  return {
    audioActions: bindActionCreators(audioActions, dispatch),
    playerActions: bindActionCreators(playerActions, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AudioList)
