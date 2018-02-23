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

const RootStack = StackNavigator(
{
    Login: { screen: LoginForm , navigationOptions : { header : null } },
    Registration: { screen: RegistrationForm , navigationOptions : { header : null } },
    Home: { screen: HomeScreen , navigationOptions : { header : null } },
    Game: { screen: GameScreen , navigationOptions : { header : null } },

},
    { initialRouteName: 'Registration' },
);

export default class App extends Component {
    constructor(props){
        super(props);
        this.state = { loggedIn: false };
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

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ loggedIn: true });
            } else {
                this.setState({ loggedIn: false });
            }
        })
    }

    onRegister = () => {
        const { email, password } = this.state;
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .catch((error) => {
                console.warn('Error');
                alert(error.message);
            });
    };

    onLogin = () => {
        const { email, password } = this.state;
        firebase.auth().signInWithEmailAndPassword(email, password)
            .catch((error) => {
                console.warn('Error');
                alert(error.message);
            });
    };

    registrationForm() {
        //this.props.navigation.navigate('Registration');
    }

    loginForm() {
        //this.props.navigation.navigate('Login');
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
