import React, { Component } from 'react';
import {StyleSheet} from 'react-native';
import { Text, Button, Container, Content, Header, Input, Item, Label, Form, Body, Title } from 'native-base';
import firebase from 'react-native-firebase';
import { Spinner } from '../common/Spinner'

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
        this.props.navigation.navigate('Game');
    }

    render() {
        return (
            <Container>
                <Content>
                    <Header>
                        <Body>
                        <Title style={{alignSelf: 'center'}}>Login</Title>
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
                    </Form>

                    <Button full onPress={() => this.onLogin()} style={{alignSelf: 'center', marginTop: 20}}>
                        <Text>Login </Text>
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