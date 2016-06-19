import React, { Component, PropTypes } from 'react';
import Player from './player_body.jsx';
import SearchField from './search_field.jsx';


class PlayerSection extends Component {

	render() {
		return (

			<div className="player-block">
				<Player />
				<SearchField />
			</div>

		)
	}

}

export default PlayerSection