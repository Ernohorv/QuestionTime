import React, { Component } from 'react';
import { Button, Text, Container, Content, Thumbnail } from 'native-base';
import firebase from 'react-native-firebase';
import HomeScreenStyle from '../styles/HomeScreenStyle';

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
        return <Container
            style=
                {{backgroundColor: 'crimson'}}>
            <Content>
                <Thumbnail
                    large
                    source={{uri: 'https://pbs.twimg.com/profile_images/649344745328607232/XsUnHdyH_400x400.jpg'}}
                    style={HomeScreenStyle.thumbnailStyle}/>
                <Text
                    style={
                        HomeScreenStyle.thumbText}>
                    Alexander Hamilton
                </Text>
                <Button
                    rounded
                    bordered
                        onPress={() => this.startGame()}
                        style={
                            HomeScreenStyle.startButton}>
                    <Text
                        style={{
                            color: 'white'}}>
                        Start game
                    </Text>
                </Button>
                <Button
                    rounded
                    bordered
                        onPress={() => this.logOut()}
                        style={
                            HomeScreenStyle.logOutButton}>
                    <Text style={{color: 'white'}}>Log out</Text>
                </Button>
            </Content>
        </Container>;
    }
}