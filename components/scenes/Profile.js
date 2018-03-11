import React, { Component } from 'react';
import firebase from 'react-native-firebase';
import { Text, Button, Container, Content, Input, Item, Label, Form } from 'native-base';
import LoginStyle from "../styles/LoginStyle";

export default class LoginForm extends Component {

    constructor(props) {
        super(props);
        this.state= {
            userName: '',
        }
    }

    changeName() {

        let user = firebase.auth().currentUser;
        let userName = this.state.userName;
        user.updateProfile({
            displayName: userName
        }).then(function () {

            var displayName = user.displayName;
            console.log(displayName);

        }, function (error) {

        })
    }

    render() {

        return(
            <Container>
                <Content>
                    <Text>Profile</Text>
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
                        <Text style={{ color: 'crimson' }}>Change</Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}
