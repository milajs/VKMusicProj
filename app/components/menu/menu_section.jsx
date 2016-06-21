import React, { Component, PropTypes } from 'react';
import UserData from './user_data.jsx';
import MenuButtonsList from './menu_buttons.jsx';


class MenuSection extends Component {

  render() {
    return (

		<div className="menu-section">
			<UserData {...this.state} {...this.props} />
			<MenuButtonsList {...this.state} {...this.props}  />
		</div>

    )
  }

}

MenuSection.propTyes = {
	HandleLoadRecommendations: PropTypes.func.isRequired,
	GetUserData: PropTypes.func.isRequired,
	User_id: PropTypes.number.isRequired,
    ImageUrl: PropTypes.string.isRequired,
    UserFirstName: PropTypes.string.isRequired,
    UserLastName: PropTypes.string.isRequired,
    IsAuth: PropTypes.bool.isRequired

};

export default MenuSection