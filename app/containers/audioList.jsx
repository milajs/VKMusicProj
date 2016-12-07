import React, { Component } from 'react';
import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';

import * as audioActions from '../actions/audioActions';
import { loadAudios } from '../api';

import AudioRow from '../components/audios/audioRow';

class AudioList extends Component {
  componentWillMount() {
    this.load();
  }

  load() {
    loadAudios(0, (items, count) => {
      if (items) {
        this.props.audioActions.getAudioList(items);
      }
    });
  }

	toggleAudio(audioModel) {
		this.props.audioActions.chacgeAudio(audioModel);
	}

	render() {
    const { audioList = [], currentAudio = {}, isPlaying } = this.props.state;

		return (
			<div className="audio-section">
				<table>
          <tbody>
  					{audioList.map(function(audioModel, i) {
  						return <AudioRow
  									{...this.props}
  									{...this.state}
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
    audioActions: bindActionCreators(audioActions, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AudioList)
