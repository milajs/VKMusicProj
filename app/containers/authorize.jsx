import React, { Component } from 'react';
import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';

import * as authActions from '../actions/authActions';
import { logIn } from '../api';

const css = require('../styles/authorize.styl');

class Menu extends Component {
  HandleLogIn() {
    logIn((status) => {
      this.props.authActions.logIn(status);
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
          <button className="button" onClick={this.HandleLogIn.bind(this)}>Войти через VK</button>
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
    authActions: bindActionCreators(authActions, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Menu)
