import React, { Component } from 'react';
import { Text, Button, Container, Content, Input, Item, Label, Form, Title } from 'native-base';
import GameScreenStyle from '../styles/GameScreenStyle'

export default class LobbyScreen extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container
                style={{
                    backgroundColor: 'whitesmoke'
                }}>
                <Content>
                    <Text
                        style={GameScreenStyle.soonText}>
                        Soon...                            
                    </Text>
                </Content>
            </Container>
        );
    }
}