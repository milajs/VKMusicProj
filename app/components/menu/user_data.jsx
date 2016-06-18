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
			ImageUrl: "http://cs415829.vk.me/u138009602/docs/eca9b792fdf9/no-photo.png",
			UserFirstName: 'User first name',
			UserLastName: 'User last name'
		};
	}


	componentDidMount() {

		vk_getuserphoto(function (userData){

			if (userData) {
				this.setState( {ImageUrl: userData.photo_200, 
								UserFirstName: userData.first_name, 
								UserLastName: userData.last_name} );
			}
		}.bind(this))
	}


	render() {

		console.log('render image url -> ' + this.state.ImageUrl);

		return (
			<div>
				<img className="user-img" src={this.state.ImageUrl} />
				<p className="user-name"> {this.state.UserFirstName} </p>
				<p className="user-name"> {this.state.UserLastName} </p>
			</div>
		)
	}
}

export default UserData