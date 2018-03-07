import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Text, Button, Container, Content, Input, Item, Label, Form, Body, Title } from 'native-base';
import firebase from 'react-native-firebase';
import { Spinner } from '../common/Spinner'

export default class LoginForm extends Component {
    constructor(props) {
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

        this.setState({ error: '', loading: true });
        firebase.auth().signInAndRetrieveDataWithEmailAndPassword(email, password)
            .then(this.onLoginSucces.bind(this))
            .catch(() => {
                this.setState({ error: 'Authentication failed.' });
            });
    }

    renderButton() {
        if (this.state.loading) {
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
        this.props.navigation.navigate('Home');
    }

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
                    </Form>

                    <Button rounded onPress={() => this.onLogin()} style={{ width: '80%', alignSelf: 'center', justifyContent: 'center', backgroundColor: 'white', marginTop: 50, marginBottom: 15 }}>
                        <Text style={{ color: 'crimson' }}>Login</Text>
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