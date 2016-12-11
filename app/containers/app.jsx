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
  constructor(props){
    super(props);

    this.state = {
      OffsetCounter: 0,
    };
  }

  nextAudioByEnd() {
    this.playNextAudio();
  }

  componentWillMount() {
    loadUserData((data) => {
      if (data) {
        this.props.userActions.getUserData(data);
      }
    });
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
     window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    let body = document.body;
    let html = document.documentElement;

    let scrollSize = Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
    let scrollOffset = body.scrollTop;
    let windowHeight = window.innerHeight;
    let scroll_position = scrollSize - scrollOffset - windowHeight;
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

            <Player
              {...this.state}
              {...this.props}
              nextAudioByEnd={this.nextAudioByEnd.bind(this)}
            />
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
