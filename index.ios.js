/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import Meteor, { createContainer, MeteorListView } from 'react-native-meteor';
Meteor.connect('http://www.realto.ch/websocket')
Meteor.loginWithPassword('stian.haklev@epfl.ch', 'Password', err => console.log(err))

export class HomeScreen extends Component {
    renderItem(e) {
    return (e.title && e.title.length > 0 ? 
      <View><Text>{e.title}</Text>
      {e.text ? <Text>{e.text}</Text> : null}<Text>-------------</Text></View> : null)
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
       <MeteorListView
          collection="posts"
          renderRow={this.renderItem}
        />      
      </View>
    );
  }
}

export const realto2 = createContainer(params=>{
  const handle = Meteor.subscribe('allPosts');
 
  return {
    todosReady: handle.ready(),
  };
}, HomeScreen)


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('realto2', () => realto2);
