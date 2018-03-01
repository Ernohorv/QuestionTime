import React, {Component} from 'react';
import {Button, Text, Container, Content, Input, Item, Label, Form, Title, Body, Header} from 'native-base';
import firebase from 'react-native-firebase';
import {StyleSheet} from "react-native";

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
            <Container>
                <Content>
                    <Header>
                        <Body>
                        <Title style={{alignSelf: 'center'}}>Registration</Title>
                        </Body>
                    </Header>
                    <Form>
                        <Item floatingLabel>
                            <Label>Email</Label>
                            <Input onChangeText={(email) => this.setState({email})}/>
                        </Item>

                        <Item floatingLabel>
                            <Label>Password</Label>
                            <Input
                                onChangeText={(password) => this.setState({password})}
                                secureTextEntry={true}/>
                        </Item>

                        <Item floatingLabel>
                            <Label>Confirm password Ezt még nem használjuk</Label>
                            <Input
                                onChangeText={(confirmPassword) => this.setState({confirmPassword})}
                                secureTextEntry={true}/>
                        </Item>
                    </Form>

                    <Button full onPress={() => this.onRegister()} style={{alignSelf: 'center', marginTop: 20}}>
                        <Text>Register </Text>
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