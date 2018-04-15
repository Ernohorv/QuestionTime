import React, { Component } from 'react';
import { Text, Button, Container, Content, Input, Item, Label, Form, Title } from 'native-base';
import GameScreenStyle from '../styles/GameScreenStyle'

export default class SelectableQuestion extends Component {
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
                        style={GameScreenStyle.counterText}>
                        {this.props.Counter}
                    </Text>
                    <Text
                        style={GameScreenStyle.questionText}>
                        {this.props.Question}
                    </Text>
                    <Button
                        rounded
                        light={!this.props.Selected[0]}
                        danger={this.props.Selected[0]}
                        onPress={() => this.props.selectA()}
                        style={GameScreenStyle.answerAtext}>
                        <Text>
                            {this.props.Answer_A}
                        </Text>
                    </Button>
                    <Button
                        rounded
                        light={!this.props.Selected[1]}
                        danger={this.props.Selected[1]}
                        onPress={() => this.props.selectB()}
                        style={GameScreenStyle.answerText}>
                        <Text>
                            {this.props.Answer_B}
                        </Text>
                    </Button>
                    <Button
                        rounded
                        light={!this.props.Selected[2]}
                        danger={this.props.Selected[2]}
                        onPress={() => this.props.selectC()}
                        style={GameScreenStyle.answerText}>
                        <Text>{this.props.Answer_C}</Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}