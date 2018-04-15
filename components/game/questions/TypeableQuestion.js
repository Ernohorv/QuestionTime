import React, { Component } from 'react';
import { Text, Button, Container, Content, Input, Item, Label, Form, Title } from 'native-base';
import GameScreenStyle from '../styles/GameScreenStyle'

export default class TypeableQuestion extends Component {
    constructor(props) {
        super(props);
        this.setState({
            Answer: '',
        });
    }
    
    render() {
        return (
            <Container
                style={{
                    backgroundColor: 'whitesmoke'
                }}>
                <Content>
                    <Text
                        style={GameScreenStyle.counterText}>
                        {this.props.Counter}
                    </Text>
                    <Text
                        style={GameScreenStyle.questionText}>
                        {this.props.Question}
                    </Text>
                    <Input onChangeText={(answer) => this.setState({ Answer: answer })}/>
                </Content>
            </Container>
        );
    }
}