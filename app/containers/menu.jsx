import React, { Component } from 'react';
import { connect } from 'react-redux';

import { bindActionCreators } from 'redux'

import UserData from '../components/menu/user_data.jsx';
import MenuButtonsList from '../components/menu/menu_buttons.jsx';

import * as menuActions from '../actions/menuActions'

class Menu extends Component {
  componentWillMount() {
    this.load();
  }

  load() {
    const data = {
      firstName: `Иван`,
      lastName: `Иванов`,
    }
    this.props.menuActions.getUserData(data);
  }

	render() {
		return (
			<div className="menu-section">
				<UserData {...this.state} {...this.props} />
				<MenuButtonsList {...this.state} {...this.props}  />
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
    menuActions: bindActionCreators(menuActions, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Menu)
