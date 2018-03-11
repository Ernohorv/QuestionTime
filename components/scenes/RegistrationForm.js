import React, { Component } from 'react';
import { Button, Text, Container, Content, Input, Item, Label, Form, Title } from 'native-base';
import firebase from 'react-native-firebase';
import RegistrationStyle from '../styles/RegistrationStyle';

export default class RegistrationForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            confirmPassword: '',
            error: '',
            invalidPass: true,
            loading: false,
            formData: {},
            email: '',
            password: '',
            username: '',
        };
    }

    checkPassword() {
        if (this.state.password.valueOf() !== this.state.confirmPassword.valueOf()) {
            this.setState({
                invalidPass: true
            });
        }
        else {
            this.setState({
                invalidPass: false
            });
        }
    }

    onRegister = () => {
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(
                (success) => {
                    console.log(success);
                    success.updateProfile({
                        displayName: this.state.username,
                    }).catch(
                        (err) => {
                            this.error = err;
                        });
                }).catch(
            (err) => {
                this.error = err;
            });

        this.props.navigation.navigate('Welcome');
    };

    render() {
        return (
            <Container style={{ backgroundColor: 'whitesmoke' }}>
                <Content>
                    <Text style={RegistrationStyle.titleText}>Q</Text>
                    <Form>
                        <Item floatingLabel style={{ marginTop: 5 }}>
                            <Label style={{ color: 'crimson' }}>Username</Label>
                            <Input
                                onChangeText={(username) => this.setState({ username })}
                                style={{ color: 'darkgrey' }} />
                        </Item>

                        <Item floatingLabel>
                            <Label style={{ color: 'crimson' }}>Email</Label>
                            <Input
                                onChangeText={(email) => this.setState({ email })}
                                style={{ color: 'darkgrey' }} />
                        </Item>

                        <Item floatingLabel>
                            <Label style={{ color: 'crimson' }}>Password</Label>
                            <Input
                                onChangeText={(password) => this.setState({ password })}
                                secureTextEntry={true}
                                style={{ color: 'darkgrey' }} />
                        </Item>

                        <Item floatingLabel>
                            <Label style={{ color: 'crimson' }}>Confirm password</Label>
                            <Input
                                onChangeText={(confirmPassword) => this.setState({ confirmPassword })}
                                secureTextEntry={true}
                                style={{ color: 'darkgrey' }} />
                        </Item>
                    </Form>

                    <Button
                        rounded
                        onPress={() =>
                            this.onRegister()}
                        style={RegistrationStyle.registerButton}>
                        <Text style={{ color: 'crimson' }}>Sign Up</Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}