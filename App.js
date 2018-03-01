import React, { Component } from 'react';
import {
    View, StyleSheet, Button, Text
} from 'react-native';

import firebase from 'react-native-firebase';
import { Fab, Icon, Container, Header, Input, Content, Card, CardItem, Body, Form, Item, Label } from 'native-base';

import {
    StackNavigator,
} from 'react-navigation';

import LoginForm  from './components/scenes/LoginForm';
import RegistrationForm from './components/scenes/RegistrationForm';
import HomeScreen from './components/scenes/HomeScreen';
import GameScreen from './components/scenes/GameScreen';
import WelcomeScreen from "./components/scenes/WelcomeScreen";

const RootStack = StackNavigator(
{
    Login: { screen: LoginForm , navigationOptions : { header : null } },
    Registration: { screen: RegistrationForm , navigationOptions : { header : null } },
    Home: { screen: HomeScreen , navigationOptions : { header : null } },
    Game: { screen: GameScreen , navigationOptions : { header : null } },
    Welcome: { screen: WelcomeScreen, navigationOptions: { header: null }},

},
    { initialRouteName: 'Welcome' },
);

export default class App extends Component {
    constructor(props){
        super(props);
        this.state = { loading: true };
    }
    

    componentWillMount() {
        /*const config = {
            apiKey: 'AIzaSyDgyEuBEzyqCWfaFQwwx0CwHsyp8AH_Yw8',
            authDomain: 'react-native-test-b5bec.firebaseapp.com',
            databaseURL: 'https://react-native-test-b5bec.firebaseio.com',
            projectId: 'react-native-test-b5bec',
            storageBucket: 'react-native-test-b5bec.appspot.com',
            messagingSenderId: '1059337201276'
        };

        firebase.initializeApp(config);
        */
    }

    /**
     * Stop listening for authentication state changes
     * when the component unmounts.
     */
    ComponentWillUnMount() {

        this.authSubscription();
    }

    componentDidMount() {
        this.authSubscription = firebase.auth().onAuthStateChanged((user) => {
            this.setState({
                loading: false,
                user,
            });
        });
    }

    render() {
        return (
            /*<View>
                <Button title="Login" onPress={Actions.login()}>
                    <Text>hi</Text>
                </Button>
            </View>*/
            <RootStack />

            
            /*<Container>
                <Header>Registration</Header>
                <Content>
                    <Button full onPress={() => this.registrationForm.bind(this)}></Button>
                    <Button full onPress={() => this.loginForm.bind(this)}></Button>
                </Content>
            </Container>*/
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
