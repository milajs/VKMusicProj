import React, { Component, PropTypes } from 'react';
import UserData from './user_data.jsx';
import MenuButtonsList from './menu_buttons.jsx';


class MenuSection extends Component {

  render() {
    return (

		<div className="menu-section">
			<UserData />
			<MenuButtonsList />
		</div>

    )
  }

}

export default MenuSection