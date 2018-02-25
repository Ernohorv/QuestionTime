import React, {Component} from 'react';
import { Button , Text, Container, Content, Input, Item, Grid, Form, Label, Header, Card, CardItem, Body, Title } from 'native-base';
import { View } from 'react-native';

export default class WelcomeScreen extends Component {

    constructor(props){
        super(props);
    }

    render() {
        return(
            <Container>
                <Content>
                    <Header>
                        <Body>
                            <Title style={{alignSelf: 'center'}}>Welcome to question time!</Title>
                        </Body>
                    </Header>

                    <View>
                        <Button full onPress={() => this.props.navigation.navigate('Registration')} style={{marginBottom: 20, marginTop: 50}}>
                            <Text>Registration</Text>
                        </Button>

                        <Button full onPress={() => this.props.navigation.navigate('Login')}>
                        <Text>Login</Text>
                        </Button>
                    </View>
                </Content>
            </Container>
        );
    }
}