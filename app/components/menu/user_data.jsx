import React, { Component, PropTypes } from 'react';


class UserData extends Component {

  render() {
    return (

	<div>
		<img className="user-img" src={require('./../media/no-photo.png')} />
		<p className="user-name"> User first name </p>
		<p className="user-name"> User last name </p>
	</div>

    )
  }

}

export default UserData