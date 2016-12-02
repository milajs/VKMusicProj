import React, { Component } from 'react';
import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';

import * as authActions from '../actions/authActions';
import * as userActions from '../actions/userActions';
import { logIn, loadUserData } from '../api';

const css = require('../styles/authorize.styl');

class Menu extends Component {
  HandleAuthorize() {
    logIn(() => {
      this.props.authActions.logIn();
      this.load();
    });
  }

  load() {
    loadUserData((data) => {
      if (data) {
        this.props.userActions.getUserData(data);
      }
    });
  }

	render() {
    const { state } = this.props;
    const { user = {} } = state;

		return (
      <div className="container">
        <video autoPlay loop poster="../media/Cheer-Up.jpg">
          <source src="../media/Cheer-Up.webm" type="video/webm"></source>
          <source src="../media/Cheer-Up.mp4" type="video/mp4"></source>
          <source src="../media/Cheer-Up.ogg" type="video/ogg"></source>
        </video>

        <div className="overlay">
          <button className="button" onClick={this.HandleAuthorize.bind(this)}>Войти через VK</button>
        </div>
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
    authActions: bindActionCreators(authActions, dispatch),
    userActions: bindActionCreators(userActions, dispatch),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Menu)
