import React, { Component, PropTypes } from 'react';

class SearchField extends Component {
	handleInput(event) {
		this.props.onChange(event.target.value)
	}

	render() {
		return (
			<div>
				<input
          type="text"
          className="search-audio-input"
          placeholder="Search audio"
          onChange={this.handleInput.bind(this)}
        />
			</div>
		)
	}
}

export default SearchField
