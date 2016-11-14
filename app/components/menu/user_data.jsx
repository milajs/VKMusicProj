import React, { Component, PropTypes } from 'react';

class UserData extends Component {
	componentWillMount() {
		this.props.GetUserData();
	}

	getAvatarImage() {
		var avatarImage;

		if (this.props.IsAuth == false) {
			avatarImage = require('../../media/no-photo.png');
		} else {
			avatarImage = this.props.ImageUrl;
		}
		return avatarImage;
	}

	render() {
		return (
			<div>
				<img className="user-img" src={this.getAvatarImage()} />
				<p className="user-name"> {this.props.UserFirstName} </p>
				<p className="user-name"> {this.props.UserLastName} </p>
			</div>
		)
	}
}

UserData.propTyes = {
	GetUserData: PropTypes.func.isRequired,
	User_id: PropTypes.number.isRequired,
    ImageUrl: PropTypes.string.isRequired,
    UserFirstName: PropTypes.string.isRequired,
    UserLastName: PropTypes.string.isRequired,
    IsAuth: PropTypes.bool.isRequired
};

export default UserData
