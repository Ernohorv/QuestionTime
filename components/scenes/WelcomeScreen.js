import React, { Component } from 'react';
import { Button, Text, Container, Content, Input, Item, Grid, Form, Label, Card, CardItem, Title } from 'native-base';
import { View } from 'react-native';
import firebase from 'react-native-firebase';
import WelcomeStyle from '../styles/WelcomeStyle';

export default class WelcomeScreen extends Component {

    constructor(props) {
        super(props);
    }

    loginButton() {
        if (firebase.auth().currentUser != null) {
            this.props.navigation.navigate('Home');
        }
        else {
            this.props.navigation.navigate('Login');
        }
    }

    highScoreButon() {
        this.props.navigation.navigate('HighScore');
    }

    render() {
        return <Container style={{backgroundColor: 'crimson'}}>
            <Content>
                <View>
                    <Text style={WelcomeStyle.titleText}>Q</Text>
                    <Button
                        rounded
                        bordered
                        onPress={() =>
                            this.props.navigation.navigate('Registration')}
                        style={WelcomeStyle.signUpButton}>
                        <Text style={{color: 'white'}}>Sign Up</Text>
                    </Button>

                    <Button
                        rounded
                        onPress={() =>
                            this.loginButton()}
                        style={WelcomeStyle.loginButton}>
                        <Text style={{color: 'crimson'}}>Login</Text>
                    </Button>

                    <Button
                        rounded
                        onPress={() =>
                            this.highScoreButon()}
                        style={WelcomeStyle.highScoreButton}>
                        <Text style={{color: 'crimson'}}>HighScore</Text>
                    </Button>
                </View>
            </Content>
        </Container>;
    }
}