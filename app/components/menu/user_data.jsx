import React, { Component } from 'react';

class UserData extends Component {
	render() {
    const { data = {} } = this.props;
    const imgUrl = data.photo_200 || require('../../media/no-photo.png');

    return (
			<div>
				<img className="user-img" src={imgUrl} />
				<p className="user-name"> {data.first_name} </p>
				<p className="user-name"> {data.last_name} </p>
			</div>
		)
	}
}

export default UserData
