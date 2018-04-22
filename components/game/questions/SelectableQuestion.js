import React, { Component } from 'react';
import { Text, Button, Container, Content, Input, Item, Label, Form, Title } from 'native-base';
import GameScreenStyle from '../../styles/GameScreenStyle'

export default class SelectableQuestion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Selected: [false, false, false],
        };
    }

    componentDidMount() {
        this.props.onRef(this)
    }

    componentWillUnmount() {
        this.props.onRef(undefined)
    }

    selectA() {
        this.setState({
            Selected: [true, false, false],
        })
    }

    selectB() {
        this.setState({
            Selected: [false, true, false],
        })
    }

    selectC() {
        this.setState({
            Selected: [false, false, true],
        })
    }

    clearSelection() {
        this.setState({
            Selected: [false, false, false],
        })
    }

    getResult(){
        if(this.state.Selected[this.props.Question.doc._data.Correct]){
            return true;
        }
        else{
            return false;
        }
    }
    
    render() {
        return (
            <Container
                style={{
                    backgroundColor: 'whitesmoke'
                }}>
                <Content>
                    <Text
                        style={GameScreenStyle.questionText}>
                        {this.props.Question.doc._data.Question}
                    </Text>
                    <Button
                        rounded
                        light={!this.state.Selected[0]}
                        danger={this.state.Selected[0]}
                        onPress={() => this.selectA()}
                        style={GameScreenStyle.answerAtext}>
                        <Text>
                            {this.props.Question.doc._data.Answer_A}
                        </Text>
                    </Button>
                    <Button
                        rounded
                        light={!this.state.Selected[1]}
                        danger={this.state.Selected[1]}
                        onPress={() => this.selectB()}
                        style={GameScreenStyle.answerText}>
                        <Text>
                            {this.props.Question.doc._data.Answer_B}
                        </Text>
                    </Button>
                    <Button
                        rounded
                        light={!this.state.Selected[2]}
                        danger={this.state.Selected[2]}
                        onPress={() => this.selectC()}
                        style={GameScreenStyle.answerText}>
                        <Text>{this.props.Question.doc._data.Answer_C}</Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}