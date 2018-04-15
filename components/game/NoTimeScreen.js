import React, { Component } from 'react';
import { Text, Button, Container, Content, Input, Item, Label, Form, Title } from 'native-base';
import GameScreenStyle from '../styles/GameScreenStyle'

export default class NoTimeScreen extends Component {
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
                    <Text style={GameScreenStyle.correctText}>
                        The correct answer is...
                        {this.props.Counter}
                    </Text>
                    <Text
                        style={GameScreenStyle.questionText}>
                        {this.props.Question}
                    </Text>
                    <Button
                        rounded
                        light={!this.props.Selected[0]}
                        warning={this.props.Selected[0] &&
                            this.props.Correct !== 0}
                        success={this.props.Correct === 0}
                        style={GameScreenStyle.answerAtext}>
                        <Text>
                            {this.props.Answer_A}
                        </Text>
                    </Button>
                    <Button
                        rounded
                        light={!this.props.Selected[1]}
                        warning={this.props.Selected[1] &&
                            this.props.Correct !== 1}
                        success={this.props.Correct === 1}
                        style={GameScreenStyle.answerText}>
                        <Text>
                            {this.props.Answer_B}
                        </Text>
                    </Button>
                    <Button
                        rounded
                        light={!this.props.Selected[2]}
                        warning={this.props.Selected[2] &&
                            this.props.Correct !== 2}
                        success={this.props.Correct === 2}
                        style={GameScreenStyle.answerText}>
                        <Text>
                            {this.props.Answer_C}
                        </Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}