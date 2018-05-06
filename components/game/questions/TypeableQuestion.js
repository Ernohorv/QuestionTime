import React, { Component } from 'react';
import { Text, Button, Container, Content, Input, Item, Label, Form, Title } from 'native-base';
import GameScreenStyle from '../../styles/GameScreenStyle'

export default class TypeableQuestion extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            Answer: '',
        });
    }

    componentDidMount() {
        this.props.onRef(this)
    }

    componentWillUnmount() {
        this.props.onRef(undefined)
    }

    getResult(){
        if(this.state.Answer === this.props.Question.doc._data.Correct){
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
                    <Input value={this.state.Answer} style={{ color: 'black', width: '80%', alignSelf: 'center', justifyContent: 'center', backgroundColor: 'white', marginTop: 30,}} onChangeText={(answer) => this.setState({ Answer: answer })}/>
                </Content>
            </Container>
        );
    }
}