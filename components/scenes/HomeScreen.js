import React, { Component } from 'react';
import { Button, Text, Container, Content, Thumbnail } from 'native-base';
import firebase from 'react-native-firebase';
import HomeScreenStyle from '../styles/HomeScreenStyle';
import {
    View,
    TouchableOpacity
} from 'react-native';

import Styles from '../opentok/Styles';

export default class HomeScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            pictureUrl: ' ',
            lobby: false,
            buttonDisable: false,
            lobbyOpen: false,
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

    publish(){
        this.props.navigation.navigate('Publish');
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
                <View style={Styles.eventContainer}>
                    <TouchableOpacity style={Styles.eventBox} onPress={()=>this.publish()}>
                        <View style={{ flex: 0.2, alignItems: 'center',justifyContent:'center' }}>
                        </View>
                        <View style={{flex:0.8,justifyContent:'center'}}>
                            <Text style={Styles.locBtnText}> Publish </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={Styles.eventBox} onPress={()=>this.view()}>
                        <View style={{ flex: 0.2, alignItems: 'center',justifyContent:'center' }}>
                        </View>
                        <View style={{flex:0.8,justifyContent:'center'}}>
                            <Text style={Styles.locBtnText}> View </Text>
                        </View>
                    </TouchableOpacity>
                </View>

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