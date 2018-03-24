import React, { Component } from 'react';
import { Button, Text, Container, Content, Input, Item, Label, Form, Title } from 'native-base';
import firebase from 'react-native-firebase';
import RegistrationStyle from '../styles/RegistrationStyle';

export default class RegistrationForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: ' ',
            email: '',
            password: '',
            username: '',
            emailOK: false,
            passwordOK: false,
            usernameOK: false,
        };
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

    onNameChange(name){
        if(name.length < 4){
            this.setState({
                nameOK: false,
            });
        }
        else{
            this.setState({
                nameOK: true,
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
        if(err.code = "auth/email-already-in-use"){
            this.setState({
                error: 'Email already registered'
            });
        }
    }

    onRegister = () => {
        if(!this.state.emailOK && !this.state.passwordOK && !this.state.nameOK){
            this.setState({
                error: 'Fix validation errors',
            });            
        }
        else{
            firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(this.state.email, this.state.password)
            .then(
                (success) => {
                    var data = {
                        name: this.state.username.valueOf(),
                        score: 0,
                    }
                    var db = firebase.firestore().collection('Users').doc(success.user.uid).set(data);
                    this.props.navigation.navigate('Home');
                }).catch(
                    (err) => {
                        this.processError(err);
                    });
        }
    };

    render() {
        return (
            <Container style={{ backgroundColor: 'whitesmoke' }}>
                <Content>
                    <Text style={RegistrationStyle.titleText}>Q</Text>
                    <Form>
                        <Item floatingLabel style={{ marginTop: 5 }} error={!this.state.nameOK} success={this.state.nameOK}>
                            <Label style={{ color: 'crimson' }}>Username</Label>
                            <Input
                                onChangeText={(username) => {this.setState({ username }, this.onNameChange(username))}}
                                style={{ color: 'darkgrey' }} />
                        </Item>

                        <Item floatingLabel error={!this.state.emailOK} success={this.state.emailOK}>
                            <Label style={{ color: 'crimson' }}>Email</Label>
                            <Input
                                onChangeText={(email) => {this.setState({ email }, this.onEmailChange(email))}}
                                style={{ color: 'darkgrey' }} />
                        </Item>

                        <Item floatingLabel error={!this.state.passwordOK} success={this.state.passwordOK}>
                            <Label style={{ color: 'crimson' }}>Password</Label>
                            <Input
                                onChangeText={(password) => {this.setState({ password },this.onPasswordChange(password))}}
                                secureTextEntry={true}
                                style={{ color: 'darkgrey' }} />
                        </Item>
                    </Form>
                    <Text style={RegistrationStyle.errorText}>
                        {this.state.error}
                    </Text>
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