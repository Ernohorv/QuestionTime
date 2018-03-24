import React, { Component } from 'react';
import { Text, Button, Container, Content, Input, Item, Label, Form, Title } from 'native-base';
import firebase from 'react-native-firebase';
import LoginStyle from '../styles/LoginStyle'
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
            .catch((err) => {
                console.warn(err);
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
                    <Text style={LoginStyle.titleText}>Q</Text>
                    <Form>
                        <Item
                            floatingLabel
                            style={{ marginTop: 30 }}>
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

                    <Button
                        rounded
                        onPress={() =>
                            this.onLogin()}
                        style={LoginStyle.loginButton}>
                        <Text style={{ color: 'crimson' }}>Login</Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}