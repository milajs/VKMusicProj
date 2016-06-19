import React, { Component, PropTypes } from 'react';


class SearchField extends Component {

	render() {
		return (

			<div>

				<input type="text" className="search-audio-input" placeholder="Search audio" />
				<input type="submit" className="search-button" value="Search" />

			</div>

		)
	}

}

export default SearchField