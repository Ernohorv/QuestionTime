import React, { Component } from 'react';
import { Text, Button, Container, Content, Input, Item, Label, Form, Title } from 'native-base';
import GameScreenStyle from '../styles/GameScreenStyle'

export default class EndGameScreen extends Component {
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
                    style={GameScreenStyle.scoreText}>
                    Score
                </Text>
                <Text
                    style={GameScreenStyle.pointText}>
                    {this.props.playerPoints} / {this.props.maxPoints}
                </Text>
                <Button
                    rounded
                    bordered
                    onPress={() => this.props.homeScreen()}
                    style={
                        GameScreenStyle.homeButton}>
                    <Text
                        style={{
                            color: 'crimson'
                        }}>
                        Back to home
            </Text>
                </Button>
            </Content>
        </Container>
        );
    }
}