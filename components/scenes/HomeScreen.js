import React, { Component } from 'react';
import App from '../../App';
import { Button, Text, Container, Content, Thumbnail} from 'native-base';
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
            <Container>
                <Content>
                    <Text>Next Game: Majd egyszer</Text>
                    <Button onPress={() => this.startGame()}>
                        <Text>Start game</Text>
                    </Button>
                    <Text>Alexander Hamilton</Text>
                    <Thumbnail large source={{ uri: 'https://pbs.twimg.com/profile_images/649344745328607232/XsUnHdyH_400x400.jpg' }} />
                    <Button onPress={() => this.logOut()}>
                        <Text>Log out</Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}

