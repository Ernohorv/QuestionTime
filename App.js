import React, { Component } from 'react';
import {
    BackHandler,
} from 'react-native';

import firebase from 'react-native-firebase';
import { Fab, Icon, Container, Header, Input, Content, Card, CardItem, Form, Item, Label } from 'native-base';
import { StackNavigator } from 'react-navigation';
import LoginForm from './components/scenes/LoginForm';
import RegistrationForm from './components/scenes/RegistrationForm';
import HomeScreen from './components/scenes/HomeScreen';
import GameScreen from './components/scenes/GameScreen';
import WelcomeScreen from "./components/scenes/WelcomeScreen";
import HighScoreScreen from "./components/scenes/HighScoreScreen";
import Profile from "./components/scenes/Profile";
import Publish from "./components/opentok/Publish";
import Viewer from "./components/opentok/Viewer";
import OneSignal from 'react-native-onesignal';
import DrawingScene from "./components/scenes/DrawingScene";

const RootStack = StackNavigator(
    {
        Login: { screen: LoginForm, navigationOptions: { header: null } },
        Registration: { screen: RegistrationForm, navigationOptions: { header: null } },
        Home: { screen: HomeScreen, navigationOptions: { header: null } },
        Game: { screen: GameScreen, navigationOptions: { header: null } },
        Welcome: { screen: WelcomeScreen, navigationOptions: { header: null } },
        HighScore: { screen: HighScoreScreen, navigationOptions: { header: null} },
        Profile: { screen: Profile, navigationOptions: { header: null } },
        Publish: { screen: Publish, navigationOptions: { header: null } },
        Viewer: { screen: Viewer, navigationOptions: { header: null } },
        DrawingScene: { screen: DrawingScene, navigationOptions: { header: null } },
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

    componentWillUnMount() {

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