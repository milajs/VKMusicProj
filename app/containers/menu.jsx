import React, { Component } from 'react';
import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';

import UserData from '../components/menu/userData';
import MenuButtonsList from '../components/menu/buttons';

import * as userActions from '../actions/userActions';
import * as authActions from '../actions/authActions';
import * as audioActions from '../actions/audioActions';
import { logOut, loadUserData, loadAudios, loadRecommendations } from '../api';

var css = require('../styles/menu.styl');

class Menu extends Component {
  componentWillMount() {
    loadUserData((data) => {
      if (data) {
        this.props.userActions.getUserData(data);
      }
    });
  }

  handleLoadAudios() {
    loadAudios(0, (items, count) => {
      if (items) {
        this.props.audioActions.getAudioList(items);
      }
    });
  }

  handleLoadRecommendations() {
    const { user = {} } = this.props.state;

    loadRecommendations(user.uid, (items) => {
      if (items) {
        this.props.audioActions.getAudioList(items);
      }
    });
  }

  HandleLogOut() {
    logOut(() => {
      this.props.authActions.logOut();
    });
  }

	render() {
    const { state } = this.props;
    const { user = {} } = state;

		return (
			<div className="menu-section">
				<UserData data={user} />

				<MenuButtonsList
          onLoadAudios={this.handleLoadAudios.bind(this)}
          onLoadRecommendations={this.handleLoadRecommendations.bind(this)}
          onLogOut={this.HandleLogOut.bind(this)}
        />
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
    userActions: bindActionCreators(userActions, dispatch),
    authActions: bindActionCreators(authActions, dispatch),
    audioActions: bindActionCreators(audioActions, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Menu)
