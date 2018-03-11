import React, { Component } from 'react';
import firebase from 'react-native-firebase';
import { Text, Button, Container, Content, Input, Item, Label, Form } from 'native-base';
import LoginStyle from "../styles/LoginStyle";

export default class LoginForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userName: '',
        }
        var uuid = firebase.auth().currentUser.uid;
        this.userRef = firebase.firestore().collection("Users").doc(uuid);
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
                        <Text style={{ color: 'crimson' }}>Change</Text>
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
