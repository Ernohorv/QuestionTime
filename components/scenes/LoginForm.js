import React, { Component } from 'react';
import {View, Button, Text, StyleSheet} from 'react-native';
import { Card, CardItem, Container, Content, Header, Body, Input, Item, Label } from 'native-base';
import firebase from 'react-native-firebase';
import { Spinner } from '../common/Spinner'
import t from 'tcomb-form-native';

let Form = t.form.Form;

let Login = t.struct({
    email: t.String,
    password: t.String
});

export class LoginForm extends Component {

    state = {
        email: '',
        password: '',
        error: '',
        loading: false
    };

    onLogin() {
        const { email, password } = this.state;

        this.setState({error: '', loading: true});

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(this.onLoginSucces.bind(this))
            .catch(() => {
                firebase.auth().createUserWithEmailAndPassword(email, password)
                    .then(this.onLoginSucces.bind(this))
                    .catch(() => {
                        this.setState({ error: 'Authentication failed.'});
                    });
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
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <Form
                ref='form'
                type={Login}/>
            </View>
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