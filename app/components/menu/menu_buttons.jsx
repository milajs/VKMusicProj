import React, { Component } from 'react';

class MenuButtons extends Component {
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

		return (
			<div className="menu-buttons-block">
				<button className="menu-button" onClick={this.HandleLoad.bind(this)}>Мои аудиозаписи</button>
				<button className="menu-button" onClick={this.HandleRecommend.bind(this)}>Рекомендации</button>
				<button className="menu-button" onClick={this.HandleAuthAction.bind(this)}>Выйти</button>
			</div>
		)
	}
}

export default MenuButtons
