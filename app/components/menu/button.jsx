import React, { Component, PropTypes } from 'react';

class MenuButton extends Component {

	

  render() {
    return (

	<div>
		<button className="menu-button"> {this.props.value} </button>
	</div>

    )
  }

}

export default MenuButton