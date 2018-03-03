import React, { Component } from 'react';
import { Button, Text, Container, Content, Input, Item, Grid, Form, Label, Card, CardItem, Body, Title } from 'native-base';
import { View } from 'react-native';

export default class WelcomeScreen extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container style={{ backgroundColor: 'crimson' }}>
                <Content>
                    <View>
                        <Text style={{color: 'white', fontSize: 200, alignSelf: 'center', fontFamily: ''}}>Q</Text>
                        <Button rounded bordered onPress={() => this.props.navigation.navigate('Registration')} style={{ marginBottom: 10, marginTop: 150, width: '80%', alignSelf: 'center', justifyContent: 'center', borderColor: 'white' }}>
                            <Text style={{ color: 'white' }}>Sign Up</Text>
                        </Button>

                        <Button rounded onPress={() => this.props.navigation.navigate('Login')} style={{ width: '80%', alignSelf: 'center', justifyContent: 'center', backgroundColor: 'white' }}>
                            <Text style={{ color: 'crimson' }}>Login</Text>
                        </Button>
                    </View>
                </Content>
            </Container>
        );
    }
}