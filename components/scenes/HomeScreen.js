import React, { Component } from 'react';
import App from '../../App';
import { Button, Text, Container, Content, Thumbnail } from 'native-base';
import firebase from 'react-native-firebase';

export default class HomeScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    startGame() {
        this.props.navigation.navigate('Game');
    }

    logOut() {
        firebase.auth().signOut();
        this.props.navigation.navigate('Welcome');
    }

    render() {
        return (
            <Container style={{ backgroundColor: 'crimson' }}>
                <Content>
                    <Thumbnail large
                        source={{ uri: 'https://pbs.twimg.com/profile_images/649344745328607232/XsUnHdyH_400x400.jpg' }}
                        style={{ alignSelf: 'center', marginTop: 120 }} />
                    <Text style={{ alignSelf: 'center', color: 'white', marginTop: 15, fontSize: 20 }}>Alexander Hamilton</Text>
                    <Button rounded bordered
                        onPress={() => this.startGame()}
                        style={{ marginTop: 150, width: '80%', alignSelf: 'center', justifyContent: 'center', borderColor: 'white' }}>
                        <Text style={{ color: 'white' }}>Start game</Text>
                    </Button>
                    <Button rounded bordered
                        onPress={() => this.logOut()}
                        style={{ marginTop: 30, marginBottom: 15, width: '80%', alignSelf: 'center', justifyContent: 'center', borderColor: 'white' }}>
                        <Text style={{ color: 'white' }}>Log out</Text>
                    </Button>
                </Content>
            </Container >
        );
    }
}

