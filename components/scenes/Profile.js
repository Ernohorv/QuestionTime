import React, { Component } from 'react';
import firebase from 'react-native-firebase';
import { Text, Button, Container, Content, Input, Item, Label, Form } from 'native-base';
import LoginStyle from "../styles/LoginStyle";

var ImagePicker = require('react-native-image-picker');

// More info on all the options is below in the README...just some common use cases shown here
var options = {
  title: 'Select Avatar',
  customButtons: [
    {name: 'delete', title: 'Delete existing'},
  ],
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};

export default class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userName: '',

        }
        var uuid = firebase.auth().currentUser.uid;
        this.userRef = firebase.firestore().collection("Users").doc(uuid);
        this.storageRef = firebase.storage().ref('profiles/'+uuid+'.jpg');
    }

    changeName() {
        this.userRef.update({
            name: this.state.userName.valueOf(),
        });
        this.props.navigation.navigate('Home');
    }

    goBack() {
        this.props.navigation.navigate('Home');
    }

    componentDidMount(){

    }

    changePhoto() {

        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
            }
            else if (response.error) {
            }
            else if (response.customButton) {
                if(response.customButton === "delete"){
                    this.storageRef.delete()
                    .then((success) => {
                    })
                    .catch((error) => {
                        console.log(error);
                    });
                }
            }
            else {
                this.storageRef.putFile(response.uri, {cacheControl: 'max-age=30000'})
                .then((success) => {
                })
                .catch((error) => {
                    console.log(error);
                });
            }
        });

    }

    render() {

        return (
            <Container>
                <Content>
                    <Form>
                        <Item
                            floatingLabel
                            style={{ marginTop: 30 }}>
                            <Label style={{ color: 'crimson' }}>Username</Label>
                            <Input
                                onChangeText={(userName) => this.setState({ userName })}
                                style={{ color: 'darkgrey' }} />
                        </Item>
                    </Form>

                    <Button
                        rounded
                        onPress={() =>
                            this.changeName()}
                        style={LoginStyle.loginButton}>
                        <Text style={{ color: 'crimson' }}>Change name</Text>
                    </Button>

                    <Button
                        rounded
                        onPress={() => this.changePhoto()}
                        style={LoginStyle.loginButton}>
                        <Text style={{ color: 'crimson' }}>Change pic</Text>
                    </Button>

                    <Button
                        rounded
                        onPress={() =>
                            this.goBack()}
                        style={LoginStyle.loginButton}>
                        <Text style={{ color: 'crimson' }}>Go back</Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}
