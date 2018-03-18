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
            counter : 10,
            buttonDisable: false,
        };
        
        let uuid = firebase.auth().currentUser.uid;
        this.pictureRef = firebase.storage().ref('profiles/'+uuid+'.png');
        this.userRef = firebase.firestore().collection("Users").doc(uuid);
        this.lobbyRef = firebase.firestore().collection("Start").doc("xJZq9ld1rnbDrHx7jthl").collection("Ready");
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
            this.getImage()
        });
    }

    startLobby(lobbyRef) {
        lobbyRef.onSnapshot((querySnapshot) => {

            const items = [];
            querySnapshot.forEach((doc) => {
                const { title } = doc.data();
                items.push({
                    _key: doc.id,
                    doc,
                    title,
                });
                this.setState({ start: items[0].doc._data.Ready })
                if (items[0].doc._data.LobbyOpen) {
                    this.setState({
                        counter: 10,
                        timerID: setInterval(() => this.tick(), 1000),
                    });
                }else {
                    this.setState({
                        counter: 10,
                    })
                }
            });
        });
    }

    componentDidMount() {
        this.startLobby(this.lobbyRef);
    }

    tick() {
        this.setState({
            counter: this.state.counter - 1,
        });

        if (this.state.counter <= 0) {
            this.setState({ buttonDisable: true});
        }
    }

    getImage(){
        firebase.storage().ref('profiles/' + firebase.auth().currentUser.uid + '.png').getDownloadURL()
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
                    disabled= {this.state.buttonDisable}
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