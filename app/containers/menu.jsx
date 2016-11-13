import React, { Component } from 'react';
import { connect } from 'react-redux';

import UserData from '../components/menu/user_data.jsx';
import MenuButtonsList from '../components/menu/menu_buttons.jsx';

class Menu extends Component {
	render() {
		return (
			<div className="menu-section">
				<UserData {...this.state} {...this.props} />
				<MenuButtonsList {...this.state} {...this.props}  />
			</div>
		)
	}
}

function mapStateToProps (state) {
  return {
    state
  }
}

export default connect(mapStateToProps)(Menu)
