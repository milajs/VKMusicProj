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

    	console.log('kek');

    	this.state = {
    		ImageUrl: "http://cs415829.vk.me/u138009602/docs/eca9b792fdf9/no-photo.png",
    	};
  	}


  	componentDidMount() {

  		// let {imgUrl} = this.state;
  	    
  	 //    console.log('imageURL -> ' + imgUrl);

  	}

  	//src={require(this.state.imgURL)}

	render() {

		console.log('render image url -> ' + this.state.ImageUrl);

	    return (
			<div>
				<img className="user-img" src={this.state.ImageUrl}/>
				<p className="user-name"> User first name </p>
				<p className="user-name"> User last name </p>
			</div>
    	)
  	}

}

export default UserData