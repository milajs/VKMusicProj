import React, { Component, PropTypes } from 'react';

var audios_array = [];

function vk_getaudios (callback) {
	VK.Api.call('audio.get', {count: 30}, function(r) { 

		if(r.error) {
			console.log("audio.get error ->" + JSON.stringify(r.error));
		} else {

			audios_array = r.response;

			console.log('Список аудио 30 штук, ' + JSON.stringify(audios_array));
			callback(r.response);
		}
	}); 
}


class MenuButtonsList extends Component {

	HandleLogIn() {
		VK.Auth.login(function(cb) {
			console.log('login cb ->' + JSON.stringify(cb));
		},1034);
	}

	HandleLoadAudios() {
		
		vk_getaudios(function (audiosArray){
			// if (audiosArray) {
			//     this.props.handleUpdate(audiosArray);
			// }
		}.bind(this))
	}

	HandleLogOut() {
		VK.Auth.logout(function (cb) {
			console.log('logout cb ->' + JSON.stringify(cb)); 
		});
	}



	render() {
		return (

		<div className="menu-buttons-block">
			<button className="menu-button" onClick={this.HandleLogIn.bind(this)} > Log In </button>
			<button className="menu-button" onClick={this.HandleLoadAudios.bind(this)} > Load audio </button>
			<button className="menu-button" onClick={this.HandleLogOut.bind(this)} > Log Out </button>
		</div>

		)
	}
}

export default MenuButtonsList