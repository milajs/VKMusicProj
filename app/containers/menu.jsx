import React, { Component } from 'react';
import { connect } from 'react-redux';

import { bindActionCreators } from 'redux'

import UserData from '../components/menu/userData';
import MenuButtonsList from '../components/menu/menu_buttons';

import * as menuActions from '../actions/menuActions';
import * as authActions from '../actions/authActions';
import { logOut } from '../api';
import { loadUserData } from '../api';

var css = require('../styles/menu.styl');

class Menu extends Component {
  componentWillMount() {
    this.load();
  }

  load() {
    loadUserData((data) => {
      if (data) {
        this.props.menuActions.getUserData(data);
      }
    });
  }

  HandleLogOut() {
    logOut((status) => {
      this.props.authActions.logIn(status);
    });
  }

	render() {
    const { state } = this.props;
    const { user = {} } = state;

		return (
			<div className="menu-section">
				<UserData data={user} />
				<MenuButtonsList onLogOut={this.HandleLogOut.bind(this)} {...this.state} {...this.props}  />
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
    menuActions: bindActionCreators(menuActions, dispatch),
    authActions: bindActionCreators(authActions, dispatch),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Menu)
