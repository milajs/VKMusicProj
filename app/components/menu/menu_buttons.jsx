import React, { Component, PropTypes } from 'react';

class MenuButtonsList extends Component {
	HandleLogIn() {
		VK.Auth.login(function(cb) {
			this.setState({IsAuth : true});
		}.bind(this),1034);
	}

	HandleLoad() {
		this.props.HandleLoadAudios();
	}

	HandleRecommend() {
		this.props.HandleLoadRecommendations();
	}

	HandleLogOut() {
		VK.Auth.logout(function (cb) {
			this.setState({IsAuth : false});

		}.bind(this));
	}

	HandleAuthAction() {
		if (this.props.IsAuth == true) {
			this.HandleLogOut();
		} else {
			this.HandleLogIn();
		}
	}

	render() {
		var authStateString;

		if (this.props.IsAuth == true) {
			authStateString	= "Log out";
		} else {
			authStateString = "Log in";
		}

		return (
			<div className="menu-buttons-block">
				<button className="menu-button" onClick={this.HandleLoad.bind(this)} > My audios </button>
				<button className="menu-button" onClick={this.HandleRecommend.bind(this)} > Recommendations </button>
				<button className="menu-button" onClick={this.HandleAuthAction.bind(this)} > {authStateString} </button>
			</div>
		)
	}
}

MenuButtonsList.propTyes = {
	HandleLoadAudios: PropTypes.func.isRequired,
	HandleLoadRecommendations: PropTypes.func.isRequired,
	IsAuth: PropTypes.bool.isRequired
};

export default MenuButtonsList
