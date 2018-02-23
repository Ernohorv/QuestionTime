import React, { Component } from 'react';
import App from '../../App';
import { Button , Text, Container, Content, Input, Item, Grid, Form, Label } from 'native-base';

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
        this.props.navigation.navigate('Home');
    }

    checkPassword(){
        if(this.state.password != this.state.confirmPassword){
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
                            <Input onChange={(value) => {this.setState({password: value}); this.checkPassword() } }/>
                        </Item>
                        <Item floatingLabel error={this.state.invalidPass}>
                            <Label>Confirm Password</Label>
                            <Input onChange={(value) => {this.setState({confirmPassword: value}); this.checkPassword() } }/>
                        </Item>
                        <Button full onPress={() => this.onClick() } style={{alignSelf: 'center'}}>
                            <Text>Register </Text>
                        </Button>
                    </Form>
                </Content>
            </Container>
        );
    }
}

