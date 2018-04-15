import React, { Component } from 'react';
import { Text, Button, Container, Content, Input, Item, Label, Form, Title } from 'native-base';
import GameScreenStyle from '../styles/GameScreenStyle'
import OpenTok, { Publisher, Subscriber} from 'react-native-opentok';
import type { Ref } from 'react';
import {Dimensions} from "react-native";
var {height, width} = Dimensions.get('window');

const sessionId = '2_MX40NjA5NjAxMn5-MTUyMzExNDQ1NjY1OH5LK3NKQ05mb0k0RWttbGZtUVhLVjNQOC9-fg';
const token = 'T1==cGFydG5lcl9pZD00NjA5NjAxMiZzaWc9NDExMTk4NDI0MjVlN2JlYjJmZGE1ZTY2OTdkZTc2Z' +
    'GYxNTQwYWYxMTpzZXNzaW9uX2lkPTJfTVg0ME5qQTVOakF4TW41LU1UVXlNekV4TkRRMU5qWTFPSDVMSzNOS1Ew' +
    'NW1iMGswUld0dGJHWnRVVmhMVmpOUU9DOS1mZyZjcmVhdGVfdGltZT0xNTIzMTE0NTI4Jm5vbmNlPTAuNTQxNTg1Mz' +
    'UwNDMyNzgzNCZyb2xlPXN1YnNjcmliZXImZXhwaXJlX3RpbWU9MTUyNTcwNjUyNSZpbml0aWFsX2xheW91dF9jbGFzc19saXN0PQ==';


export default class QuestionScreen extends Component {
    constructor(props) {
        super(props);
    }

    async componentWillMount() {
        await OpenTok.connect(sessionId, token);
        OpenTok.on(OpenTok.events.ON_SIGNAL_RECEIVED, e => console.log(e));
    }

    ref: Ref<typeof Viewer>;

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

                    <Subscriber
                        sessionId={sessionId}
                        style={{backgroundColor: 'black',height:height/4, width: width/4, alignSelf: 'center', justifyContent: 'center'}}
                        ref={ref => {
                            this.ref = ref;
                        }}
                    />
                </Content>
            </Container>
        );
    }
}