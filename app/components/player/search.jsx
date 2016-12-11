import React, { Component, PropTypes } from 'react';

var css = require('../../styles/player.styl');

class SearchField extends Component {
	handleInput(e) {
    if (e.target.value === ``) {
      this.props.onLoadAudios()
    } else {
      this.props.onChange(e.target.value)
    }
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
