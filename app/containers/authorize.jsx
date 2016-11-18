import React, { Component } from 'react';
import { connect } from 'react-redux';

import { bindActionCreators } from 'redux'

class Menu extends Component {
  componentWillMount() {
    this.load();
  }

  load() {
    loadUserData((data) => {
      if (data) {
        this.props.menuActions.getUserData(data);
      }
    });
  }

	render() {
    const { state } = this.props;
    const { user = {} } = state;

		return (
			<div className="menu-section">
				<UserData data={user} />
				<MenuButtonsList {...this.state} {...this.props}  />
			</div>
		)
	}
}

function mapStateToProps(state) {
  return {
    state
  }
}
function mapDispatchToProps(dispatch) {
  return {
    menuActions: bindActionCreators(menuActions, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Menu)
