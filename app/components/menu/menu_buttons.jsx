import React, { Component, PropTypes } from 'react';


class MenuButtonsList extends Component {

	HandleLogIn() {

		VK.Auth.login(function(cb) {
			console.log('cb ->' + cb);},1034);
    }


	render() {
		return (

		<div className="menu-buttons-block">
			<button className="menu-button" onClick={this.HandleLogIn.bind(this)} > Log In </button>
			<button className="menu-button" > Load audio </button>
			<button className="menu-button" > Log Out </button>
		</div>

		)
	}
}

export default MenuButtonsList