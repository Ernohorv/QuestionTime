import React, { Component } from 'react';
import {StyleSheet} from 'react-native';
import { Text, Button, Card, CardItem, Container, Content, Header, Body, Input, Item, Label } from 'native-base';
import firebase from 'react-native-firebase';
import { Spinner } from '../common/Spinner'
import t from 'tcomb-form-native';

const Form = t.form.Form;

const Login = t.struct({
    email: t.String,
    password: t.String
});

const options = {
    auto : 'placeholders',    
    fields: {
        password : {
            type : 'password',
            password : true,
            secureTextEntry : true
        },
        email : {
            error : 'Insert a valid email'
        }
    }
}

export default class LoginForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            error: 'nincs hiba',
            loading: false
        };
    }

    onLogin() {
        const { email, password } = this.state;

        this.setState({error: '', loading: true});
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(this.onLoginSucces.bind(this))
            .catch(() => {
                this.setState({ error: 'Authentication failed.'});
                /*
                firebase.auth().createUserWithEmailAndPassword(email, password)
                    .then(this.onLoginSucces.bind(this))
                    .catch(() => {
                        this.setState({ error: 'Authentication failed.'});
                    });*/
            });
    }

    renderButton() {
        if(this.state.loading) {
            return <Spinner />;
        }
    }

    onLoginSucces() {
        this.setState({
            email: '',
            password: '',
            loading: false,
            error: ''
        });
        this.props.navigation.navigate('Registration');
    }

    render() {
        return (
            <Container style={styles.container}>
                <Form
                ref='form'
                type={Login}
                options={options}
                />
                <Button onPress={() => this.onLogin()}>
                    <Text>Login</Text>
                </Button>
                <Text>{this.state.error}</Text>
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