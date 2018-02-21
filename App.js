/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Text,
  View
} from 'react-native';

import firebase from 'react-native-firebase';


export default class App extends Component {

  componentWillMount() {
    firebase.auth()
      .signInAndRetrieveDataWithEmailAndPassword('1234567zzz@gmail.com', '123456')
      .then(credential => {
        if (credential) {
          firebase.messaging().getInitialNotification().then(notif => {
            //console.warn("INITIAL NOTIFICATION", notif)
          });
          firebase.messaging().onMessage(payload => {
            /*firebase.messaging().createLocalNotification({
              title: 'My app',
              body: 'Hello world',
              icon: 'ic_launcher',
              priority: 'high',
              click_action: 'ACTION',
              show_in_foreground: true,
              sound: 'default',
              opened_from_tray: true
            })*/
          });
        }
      }).catch((error) => {
        console.warn("Api call error");
        alert(error.message);
      });
  }

  render() {
    return (
      <View>
        <Text>AUT Semester Project</Text>
      </View>
    );
  }
}