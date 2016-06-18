import React, { Component, PropTypes } from 'react';
import MenuButton from './button.jsx';

class MenuButtonsList extends Component {

	onClick() {

		console.log('onclick works -_-');

		// VK.Auth.login(function(cb) {
		// 	console.log('cb ->' + cb);},1034);
    }


	render() {
		return (

		<div className="menu-buttons-block">
			<button className="menu-button" onClick={this.onClick.bind(this)} > Log In </button>
			<MenuButton value="Load audio" />
			<MenuButton value="Log Out" />
		</div>

		)
	}
}

export default MenuButtonsList