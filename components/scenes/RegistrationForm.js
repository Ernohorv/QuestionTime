import React, { Component } from 'react';
import { Button, Text, Container, Content, Input, Item, Label, Form, Title, Body } from 'native-base';
import firebase from 'react-native-firebase';
import { StyleSheet } from "react-native";

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
            password: ''
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
            .catch((error) => {
                console.warn('Error');
            });

        this.props.navigation.navigate('Welcome');
    };

    render() {
        return (
            <Container style={{ backgroundColor: 'whitesmoke' }}>
                <Content>
                    <Text style={{ color: 'crimson', fontSize: 200, alignSelf: 'center', fontFamily: '' }}>Q</Text>
                    <Form>
                        <Item floatingLabel style={{ marginTop: 30 }}>
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

                    <Button rounded onPress={() => this.onRegister()} style={{ width: '80%', alignSelf: 'center', justifyContent: 'center', backgroundColor: 'white', marginTop: 50, marginBottom: 15 }}>
                        <Text style={{ color: 'crimson' }}>Sign Up</Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        marginTop: 50,
        padding: 20,
        backgroundColor: '#ffffff',
    },
});