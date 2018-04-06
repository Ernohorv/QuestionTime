import React, { Component } from 'react';
import firebase from 'react-native-firebase';
import { Text, Button, Container, Content, Input, Item, Label, Form } from 'native-base';
import LoginStyle from "../styles/LoginStyle";
import ImageResizer from 'react-native-image-resizer';

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
            nameOK: false,

        }
        var email = firebase.auth().currentUser.email;
        this.userRef = firebase.firestore().collection("Users").doc(email);
        this.storageRef = firebase.storage().ref('profiles/'+email+'.jpg');
    }

    onNameChange(name){
        if(name.length < 4){
            this.setState({
                nameOK: false,
            });
        }
        else{
            this.setState({
                nameOK: true,
            });
        }
    }

    changeName() {
        if(this.state.nameOK){
            this.userRef.update({
                name: this.state.userName.valueOf(),
            });
        }        
    }

    goBack() {
        this.props.navigation.navigate('Home');
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
                ImageResizer.createResizedImage(response.path, 600, 600, 'JPEG', 80)
                .then((resimg) => {
                    this.storageRef.putFile(resimg.uri, {cacheControl: 'max-age=300000'})
                    .then((success) => {
                    })
                    .catch((error) => {
                        console.log(error);
                    });
                })
                .catch((err) => {
                    console.log(err);
                })

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
                            style={{ marginTop: 30 }}
                            error={!this.state.nameOK} success={this.state.nameOK}>
                            <Label style={{ color: 'crimson' }}>Username</Label>
                            <Input
                                onChangeText={(userName) => {this.setState({ userName }), this.onNameChange(userName)}}
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
