import React from 'react';
import {
  View,
} from 'react-native';


import s from '../../../styles/style'


import UserPage from './UserPage'

export default class Screen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lang: props.lang,
      navigation: props.navigation,
      route: props.route,
      users: props.users,
    };
  }

  // Hide navBar
  async componentDidMount() {
    this.props.setTab(false)
  }
  componentWillUnmount() {
    this.props.setTab(true)
  }

  render() {
    return (
      <View style={[s.container, s.backColor]} >
        <UserPage
          lang={this.state.lang}
          navigation={this.state.navigation}
          route={this.state.route}
          users={this.props.users}
        />
      </View >
    );
  }
}
