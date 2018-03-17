import React, { Component } from 'react';
import { Button, Text, Container, Content, Thumbnail } from 'native-base';
import firebase from 'react-native-firebase';
import HomeScreenStyle from '../styles/HomeScreenStyle';

export default class HomeScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            pictureUrl: ' ',
        };
        
        var uuid = firebase.auth().currentUser.uid;
        this.pictureRef = firebase.storage().ref('profiles/'+uuid+'.png');
        this.userRef = firebase.firestore().collection("Users").doc(uuid);
    }

    getUserData(userRef) {
        userRef.onSnapshot((querySnapshot) => {
            this.setState({
                userName: querySnapshot.data().name,
            });
        });
    }

    componentWillMount() {
        this.getUserData(this.userRef);
        this.pictureRef.getDownloadURL()
        .then((url) => {
            this.setState({
                pictureUrl: url,
            })
        })
        .catch((error) => {
            this.getEmptyImage()
        });
    }

    getEmptyImage(){
        firebase.storage().ref('profiles/empty.png').getDownloadURL()
        .then((url) => {
            this.setState({
                pictureUrl: url,
            })
        })
        .catch((error) => {
            console.log(error);
        });
    }

    startGame() {
        this.props.navigation.navigate('Game');
    }

    logOut() {
        firebase.auth().signOut();
        this.props.navigation.navigate('Welcome');
    }

    profilPage() {
        this.props.navigation.navigate('Profile');
    }

    highScore() {
        this.props.navigation.navigate('HighScore');
    }

    render() {
        return <Container
            style=
            {{ backgroundColor: 'crimson' }}>
            <Content>
                <Thumbnail
                    large
                    source={{ uri: this.state.pictureUrl }}
                    style={HomeScreenStyle.thumbnailStyle} />
                <Text
                    style={
                        HomeScreenStyle.thumbText}>
                    {this.state.userName}
                </Text>
                <Button
                    rounded
                    bordered
                    onPress={() => this.startGame()}
                    style={
                        HomeScreenStyle.startButton}>
                    <Text
                        style={{
                            color: 'white'
                        }}>
                        Start game
                    </Text>
                </Button>
                <Button
                    rounded
                    bordered
                    onPress={() => this.profilPage()}
                    style={
                        HomeScreenStyle.profileButton}>
                    <Text
                        style={{
                            color: 'white'
                        }}>
                        Profile
                    </Text>
                </Button>
                <Button
                    rounded
                    bordered
                    onPress={() => this.highScore()}
                    style={
                        HomeScreenStyle.profileButton}>
                    <Text
                        style={{
                            color: 'white'
                        }}>
                        Highscore
                    </Text>
                </Button>
                <Button
                    rounded
                    bordered
                    onPress={() => this.logOut()}
                    style={
                        HomeScreenStyle.logOutButton}>
                    <Text style={{ color: 'white' }}>Log out</Text>
                </Button>
            </Content>
        </Container>;
    }
}