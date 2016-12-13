import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';

import Authorize from './authorize';
import Menu from './menu';
import Player from './player';
import AudioList from './audioList';

import * as userActions from '../actions/userActions';
import { loadUserData } from '../api';

const css = require('../styles/style.styl');

class App extends Component {
  componentWillMount() {
    loadUserData((data) => {
      if (data) {
        this.props.userActions.getUserData(data);
      }
    });
  }

  render() {
    const { state } = this.props;
    const { user = {} } = state;

    return (
      <div>
        {!user.uid &&
          <Authorize />
        }

        {user.uid &&
          <div>
            <Menu />

            <Player />

            <AudioList />
          </div>
        }
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
    userActions: bindActionCreators(userActions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
