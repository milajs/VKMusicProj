import React, { Component, PropTypes } from 'react';

function vk_getuserphoto (callback) {
	VK.Api.call('users.get', {fields: 'photo_200'}, function(r) { 

		if(r.error) {
			console.log("users.get error ->" + JSON.stringify(r.error));
		} else {

			var user = r.response;

			console.log('Данные пользователя ' + JSON.stringify(user[0]));
			callback(user[0]);
		}
	}); 
}

class UserData extends Component {

	constructor(props) {
		super(props);

		this.state = {
			IsAuth:false,
			ImageUrl: "",
			UserFirstName: '',
			UserLastName: ''
		};
	}


	componentDidMount() {

		vk_getuserphoto(function (userData){

			if (userData) {
				this.setState( {IsAuth:true,
								ImageUrl: userData.photo_200, 
								UserFirstName: userData.first_name, 
								UserLastName: userData.last_name} );
			}
		}.bind(this))
	}

	getAvatarImage() {
		var avatarImage;

		if (this.state.IsAuth == false) {
			avatarImage = require('./../media/no-photo.png');
		} else {
			avatarImage = this.state.ImageUrl;
		}

		return avatarImage;
	}


	render() {

		return (
			<div>
				<img className="user-img" src={this.getAvatarImage()} />
				<p className="user-name"> {this.state.UserFirstName} </p>
				<p className="user-name"> {this.state.UserLastName} </p>
			</div>
		)
	}
}

export default UserData