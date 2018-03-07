import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Button,
    Text,
    BackHandler,
    BackAndroid
} from 'react-native';

import firebase from 'react-native-firebase';
import { Fab, Icon, Container, Header, Input, Content, Card, CardItem, Body, Form, Item, Label } from 'native-base';

import {
    StackNavigator, withNavigation, NavigationActions
} from 'react-navigation';

import LoginForm from './components/scenes/LoginForm';
import RegistrationForm from './components/scenes/RegistrationForm';
import HomeScreen from './components/scenes/HomeScreen';
import GameScreen from './components/scenes/GameScreen';
import WelcomeScreen from "./components/scenes/WelcomeScreen";

const RootStack = StackNavigator(
    {
        Login: { screen: LoginForm, navigationOptions: { header: null } },
        Registration: { screen: RegistrationForm, navigationOptions: { header: null } },
        Home: { screen: HomeScreen, navigationOptions: { header: null } },
        Game: { screen: GameScreen, navigationOptions: { header: null } },
        Welcome: { screen: WelcomeScreen, navigationOptions: { header: null } },

    },
    { initialRouteName: 'Welcome' },
);

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = { loading: true };
    }

    /**
     * Stop listening for authentication state changes
     * when the component unmounts.
     */
    ComponentWillUnMount() {

        this.authSubscription();
        BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressAndroid);
    }

    componentDidMount() {
        this.authSubscription = firebase.auth().onAuthStateChanged((user) => {
            this.setState({
                loading: false,
                user,
            });
        });

        BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressAndroid);
    }

    onBackButtonPressAndroid = () => {
        BackHandler.exitApp();
    };

    render() {
        return (
            <RootStack />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        marginTop: 50,
        padding: 20,
        backgroundColor: '#ffffff',
    },
});
