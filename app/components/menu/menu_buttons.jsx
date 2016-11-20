import React, { Component } from 'react';

class MenuButtons extends Component {
	HandleLoad() {
		this.props.HandleLoadAudios();
	}

	HandleRecommend() {
		this.props.HandleLoadRecommendations();
	}

	HandleLogOut() {
		this.props.onLogOut();
	}

	render() {
		var authStateString;

		return (
			<div className="menu-buttons-block">
				<button className="menu-button" onClick={this.HandleLoad.bind(this)}>Мои аудиозаписи</button>
				<button className="menu-button" onClick={this.HandleRecommend.bind(this)}>Рекомендации</button>
				<button className="menu-button" onClick={this.HandleLogOut.bind(this)}>Выйти</button>
			</div>
		)
	}
}

export default MenuButtons
