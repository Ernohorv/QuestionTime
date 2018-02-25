import React, { Component } from 'react';
import App from '../../App';
import { Button , Text, Container, Content, Input, Item, Grid, Form, Label } from 'native-base';
import firebase from 'react-native-firebase';

export default class RegistrationForm extends Component {

    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            error: '',
            invalidPass: true,
            loading: false
        };
    }

    onClick() {

        //this.onRegister();

        this.props.navigation.navigate('Home');
        console.log(this.state.password);
    }

    checkPassword(){
        if(this.state.password.valueOf() !== this.state.confirmPassword.valueOf()){
            this.setState({
               invalidPass: true
            });
        }
        else{
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
    };

    render() {
        return (
            <Container>
                <Content>
                    <Form>
                        <Item floatingLabel>
                            <Label>Email</Label>
                            <Input onChange={(value) => this.setState({email: value}) }/>
                        </Item>
                        <Item floatingLabel error={this.state.invalidPass}>
                            <Label>Password</Label>
                            <Input onChange={(value) => {this.setState({password: value.toString()}); this.checkPassword() } }/>
                        </Item>
                        <Item floatingLabel error={this.state.invalidPass}>
                            <Label>Confirm Password</Label>
                            <Input onChange={(value) => {this.setState({confirmPassword: value.toString()}); this.checkPassword() } }/>
                        </Item>
                        <Button full onPress={() => this.onClick() } style={{alignSelf: 'center', marginTop: 20}}>
                            <Text>Register </Text>
                        </Button>
                    </Form>
                </Content>
            </Container>
        );
    }
}