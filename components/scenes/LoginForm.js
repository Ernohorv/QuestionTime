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
            error: ' ',
            emailOK: false,
            passwordOK: false,
        };
    }

    onLogin() {
        if(!this.state.emailOK){
            this.setState({
                error: 'Invalid email',
            });            
        }
        else if(!this.state.passwordOK){
            this.setState({
                error: 'Invalid password',
            });            
        }
        else{
            const { email, password } = this.state;

            this.setState({ error: '', loading: true });
            firebase.auth().signInAndRetrieveDataWithEmailAndPassword(email, password)
                .then(this.onLoginSucces.bind(this))
                .catch((err) => {
                    this.processError(err);
                });
        }
        
    }

    onEmailChange(email){
        var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(regex.test(email)){
            this.setState({
                emailOK: true,
            });
        }
        else{
            this.setState({
                emailOK: false,
            });
        }
    }

    onPasswordChange(pass){
        if(pass.length < 6){
            this.setState({
                passwordOK: false,
            });
        }
        else{
            this.setState({
                passwordOK: true,
            });
        }
    }

    processError(err){
        switch(err.code){
            case 'auth/wrong-password':  this.setState({ error: 'Wrong password' }); break;
            case 'auth/user-not-found':  this.setState({ error: 'User not found' }); break;
            default: this.setState({ error: 'Authentication error' });
        }
    }
       

    onLoginSucces() {
        this.setState({
            email: '',
            password: '',
            error: ' '
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
                            style={{ marginTop: 30 }}
                            error={!this.state.emailOK} success={this.state.emailOK}>
                            <Label style={{ color: 'crimson' }}>Email</Label>
                            <Input
                                onChangeText={(email) => {this.setState({ email }), this.onEmailChange(email)}}
                                style={{ color: 'darkgrey' }} />
                        </Item>

                        <Item floatingLabel error={!this.state.passwordOK} success={this.state.passwordOK}>
                            <Label style={{ color: 'crimson' }}>Password</Label>
                            <Input
                                onChangeText={(password) => {this.setState({ password }), this.onPasswordChange(password)}}
                                secureTextEntry={true}
                                style={{ color: 'darkgrey' }} />
                        </Item>
                    </Form>
                    <Text style={LoginStyle.errorText}>
                        {this.state.error}
                    </Text>
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