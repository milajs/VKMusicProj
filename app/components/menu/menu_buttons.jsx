import React, { Component, PropTypes } from 'react';


class MenuButtonsList extends Component {

	HandleLogIn() {
		VK.Auth.login(function(cb) {
			console.log('login cb ->' + JSON.stringify(cb));
		},1034);
	}

	HandleLoad() {		
		this.props.HandleLoadAudios();
	}

	HandleLogOut() {
		VK.Auth.logout(function (cb) {
			console.log('logout cb ->' + JSON.stringify(cb)); 
		});
	}



	render() {
		return (

		<div className="menu-buttons-block">
			<button className="menu-button" onClick={this.HandleLogIn.bind(this)} > Log In </button>
			<button className="menu-button" onClick={this.HandleLoad.bind(this)} > Load audio </button>
			<button className="menu-button" onClick={this.HandleLogOut.bind(this)} > Log Out </button>
		</div>

		)
	}
}

MenuButtonsList.propTyes = {
	HandleLoadAudios: PropTypes.func.isRequired,
};

export default MenuButtonsList