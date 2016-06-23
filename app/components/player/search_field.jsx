import React, { Component, PropTypes } from 'react';


class SearchField extends Component {

	handleInput(event) {
		console.log('inputttt' + event.target.value);
		console.log('props ->' + this.props);
		this.props.OnChangeAudioSearchQuery(event.target.value)
	}

	render() {
		return (

			<div>
				<input type="text" className="search-audio-input" placeholder="Search audio" onChange={this.handleInput.bind(this)} />
			</div>

		)
	}
 
}


SearchField.propTyes = {
	SearchAudio: PropTypes.func.isRequired,
	OnChangeAudioSearchQuery: PropTypes.func.isRequired
};

export default SearchField