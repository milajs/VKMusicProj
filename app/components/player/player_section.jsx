import React, { Component, PropTypes } from 'react';
import Player from './player_body.jsx';


class PlayerSection extends Component {

	render() {
		return (

			<div className="player-block">
				<Player />
			</div>

		)
	}

}

export default PlayerSection