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
            lobby: false,
            buttonDisable: false,
            lobbyOpen: false,
            latitude: null,
            longitude: null,
            error: null,
        };
        
        let email = firebase.auth().currentUser.email;
        this.pictureRef = firebase.storage().ref('profiles/'+email+'.jpg');
        this.userRef = firebase.firestore().collection("Users").doc(email);
        this.lobbyRef = firebase.firestore().collection("Start").doc("Ready");
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
        this.getUserImage();
    }

    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchId);
    }

    getUserImage(){
        this.pictureRef.getDownloadURL()
        .then((url) => {
            this.setState({
                pictureUrl: url,
            })
        })
        .catch((error) => {
            this.getImage();
        });
    }

    startLobby(lobbyRef) {
        lobbyRef.onSnapshot((querySnapshot) => {
            this.setState({ start:querySnapshot.data().Ready })
            if (querySnapshot.data().LobbyOpen) {
                this.setState({
                    lobby: true,
                    buttonDisable: true
                });
            }
            else {
                this.setState({
                    lobby: false,
                    buttonDisable: false
                });
            }
            this.setState({ lobbyOpen: querySnapshot.data().LobbyOpen })
        });
    }

    componentDidMount() {
        this.startLobby(this.lobbyRef);

        this.watchId = navigator.geolocation.watchPosition(
            (position) => {
               this.setState({
                   latitude: position.coords.latitude,
                   longitude: position.coords.longitude,
                   error: null,
               });
            },
            (error) => this.setState({error: error.message}),
            { enableHighAccuracy: true,
                timeout: 20000,
                maximumAge: 1000,
                distanceFilter: 10 },
        );

        if(firebase.auth().currentUser.email === "ernohorv@gmail.com"){
            this.props.navigation.navigate("Publish");
        }
    }

    getImage(){
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

    isButtonDisabled(){
        if(this.state.lobbyOpen){
            return HomeScreenStyle.startButton;
        }
        else{
            return HomeScreenStyle.startButtonDisabled;
        }
    }

    isButtonDisabledText(){
        if(this.state.lobbyOpen){
            return {color: 'white'};
        }
        else{
            return {color: 'grey'};
        }
    }

    view(){
        this.props.navigation.navigate('Viewer');
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
                    disabled= {!this.state.lobbyOpen}
                    style={
                        this.isButtonDisabled()}>
                    <Text
                        style={this.isButtonDisabledText()}>
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