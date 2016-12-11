import React, { Component } from 'react';

class MenuButtons extends Component {
	HandleLoadAudios() {
		this.props.onLoadAudios();
	}

	HandleLoadRecommendations() {
		this.props.onLoadRecommendations();
	}

	HandleLogOut() {
		this.props.onLogOut();
	}

	render() {
		var authStateString;

		return (
			<div className="menu-buttons-block">
				<button className="menu-button" onClick={this.HandleLoadAudios.bind(this)}>Мои аудиозаписи</button>
				<button className="menu-button" onClick={this.HandleLoadRecommendations.bind(this)}>Рекомендации</button>
				<button className="menu-button" onClick={this.HandleLogOut.bind(this)}>Выйти</button>
			</div>
		)
	}
}

export default MenuButtons
