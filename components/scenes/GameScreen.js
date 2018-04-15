import React, { Component } from 'react';
import GameScreenStyle from '../styles/GameScreenStyle'
import { Button, Text, Container, Content } from 'native-base';
import OpenTok, { Publisher } from 'react-native-opentok';
import firebase from 'react-native-firebase';
import type { Ref } from 'react';
import {Dimensions} from "react-native";
import Viewer from "../opentok/Viewer";
var {height, width} = Dimensions.get('window');

var Sound = require('react-native-sound');
Sound.setCategory('Playback');
var alarm = new Sound('smoke_alarm.mp3', Sound.MAIN_BUNDLE, (error) => {
    if (error) {
        return;
    }
});

const sessionId = '2_MX40NjA5NjAxMn5-MTUyMzExNDQ1NjY1OH5LK3NKQ05mb0k0RWttbGZtUVhLVjNQOC9-fg';
const token = 'T1==cGFydG5lcl9pZD00NjA5NjAxMiZzaWc9NDExMTk4NDI0MjVlN2JlYjJmZGE1ZTY2OTdkZTc2Z' +
    'GYxNTQwYWYxMTpzZXNzaW9uX2lkPTJfTVg0ME5qQTVOakF4TW41LU1UVXlNekV4TkRRMU5qWTFPSDVMSzNOS1Ew' +
    'NW1iMGswUld0dGJHWnRVVmhMVmpOUU9DOS1mZyZjcmVhdGVfdGltZT0xNTIzMTE0NTI4Jm5vbmNlPTAuNTQxNTg1Mz' +
    'UwNDMyNzgzNCZyb2xlPXN1YnNjcmliZXImZXhwaXJlX3RpbWU9MTUyNTcwNjUyNSZpbml0aWFsX2xheW91dF9jbGFzc19saXN0PQ==';

export default class GameScreen extends Component<{}> {

    constructor(props) {
        super(props);
        this.state = {
            questions: [],
            questionNo: 0,
            Question: '',
            Answer_A: '',
            Answer_B: '',
            Answer_C: '',
            Correct: 0,
            Selected: [false, false, false],
            start: false,
            counter: 10,
            noTime: false,
            timerID: null,
            endGame: false,
            points: 0,
            highScore: 0,
        };
        var email = firebase.auth().currentUser.email;
        this.questionsRef = firebase.firestore().collection("Games").doc("Game1").collection("Questions");
        this.startRef = firebase.firestore().collection("Start").doc("Ready");
        this.userRef = firebase.firestore().collection("Users").doc(email);
        this.scoreRef = firebase.firestore().collection("Games").doc("Game1").collection("Players").doc(email);
    }

    getQuestionsFromDatabase(questionsRef) {
        questionsRef.onSnapshot((querySnapshot) => {

            const items = [];
            querySnapshot.forEach((doc) => {
                const { title } = doc.data();
                items.push({
                    _key: doc.id,
                    doc,
                    title,
                });
            });

            this.setState({
                questions: items,
            });

            this.setQuestions();
        });
    }

    isReady(startRef) {
        startRef.onSnapshot((querySnapshot) => {
                this.setState({ start: querySnapshot.data().Ready })
                if (querySnapshot.data().Ready) {
                    this.setState({
                        counter: 10,
                        noTime: false,
                        Selected: [false, false, false],
                        timerID: setInterval(() => this.tick(), 1000),
                    });
                    this.scoreRef.set({
                        score: this.state.points,
                    });
                }
        });
    }

    getUserData(userRef) {
        userRef.onSnapshot((querySnapshot) => {
            this.setState({
                highScore: querySnapshot.data().score,
            });
        });
    }

    componentDidMount() {
        this.getQuestionsFromDatabase(this.questionsRef);
        this.isReady(this.startRef);
        this.getUserData(this.userRef);
    }

    async componentWillMount() {
        await OpenTok.connect(sessionId, token);
        OpenTok.on(OpenTok.events.ON_SIGNAL_RECEIVED, e => console.log(e));
    }

    setQuestions() {
        this.setState({
            Question: this.state.questions[this.state.questionNo].doc._data.Question,
            Answer_A: this.state.questions[this.state.questionNo].doc._data.Answer_A,
            Answer_B: this.state.questions[this.state.questionNo].doc._data.Answer_B,
            Answer_C: this.state.questions[this.state.questionNo].doc._data.Answer_C,
            Correct: this.state.questions[this.state.questionNo].doc._data.Correct,
        });
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

    updateHighScore() {
        this.userRef.update({
            score: this.state.highScore + this.state.points,
        });
    }

    tick() {
        this.setState({
            counter: this.state.counter - 1,
        });
        if (this.state.counter <= 3) {
            alarm.play((success => {
                if (success) {
                }
                else {
                    alarm.reset();
                }
            }));
        }
        if (this.state.counter <= 0) {
            if (this.state.Selected[this.state.Correct]) {
                this.setState((prevState, props) => ({
                    points: prevState.points + 1,
                    Selected: [false, false, false],
                    questionNo: prevState.questionNo + 1,
                    counter: 10,
                }))
                alarm.stop();
            }
            else {
                this.setState({
                    endGame: true,
                });
                clearInterval(this.state.timerID);
                this.updateHighScore();
            }
            if (this.state.questionNo === this.state.questions.length) {
                this.setState({
                    endGame: true,
                });
                clearInterval(this.state.timerID);
                this.updateHighScore();
            }

            if (this.state.questionNo !== this.state.questions.length)
                this.setQuestions();

                this.scoreRef.set({
                    score: this.state.points,
                });

        }
    }

    homeScreen() {
        this.props.navigation.navigate('Home');
    }

    ref: Ref<typeof Viewer>;

    render() {
        if (this.state.endGame) {
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
                            {this.state.points} / {this.state.questions.length}
                        </Text>
                        <Button
                            rounded
                            bordered
                            onPress={() => this.homeScreen()}
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
        else if (!this.state.start) {
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
        else {
            if (this.state.noTime) {
                return (
                    <Container
                        style={{
                            backgroundColor: 'whitesmoke'
                        }}>
                        <Content>
                            <Text
                                style={
                                    GameScreenStyle.correctText}>
                                The correct answer is...
                                {this.state.counter}
                            </Text>
                            <Text
                                style={GameScreenStyle.questionText}>
                                {this.state.Question}
                            </Text>
                            <Button
                                rounded
                                light={!this.state.Selected[0]}
                                warning={this.state.Selected[0] &&
                                    this.state.Correct !== 0}
                                success={this.state.Correct === 0}
                                style={GameScreenStyle.answerAtext}>
                                <Text>
                                    {this.state.Answer_A}
                                </Text>
                            </Button>
                            <Button
                                rounded
                                light={!this.state.Selected[1]}
                                warning={this.state.Selected[1] &&
                                    this.state.Correct !== 1}
                                success={this.state.Correct === 1}
                                style={GameScreenStyle.answerText}>
                                <Text>
                                    {this.state.Answer_B}
                                </Text>
                            </Button>
                            <Button
                                rounded
                                light={!this.state.Selected[2]}
                                warning={this.state.Selected[2] &&
                                    this.state.Correct !== 2}
                                success={this.state.Correct === 2}
                                style={GameScreenStyle.answerText}>
                                <Text>
                                    {this.state.Answer_C}
                                </Text>
                            </Button>
                        </Content>
                    </Container>
                );
            }
            else {
                return (
                    <Container
                        style={{
                            backgroundColor: 'whitesmoke'
                        }}>
                        <Content>
                            <Text
                                style={GameScreenStyle.counterText}>
                                {this.state.counter}
                            </Text>
                            <Text
                                style={GameScreenStyle.questionText}>
                                {this.state.Question}
                            </Text>
                            <Button
                                rounded
                                light={!this.state.Selected[0]}
                                danger={this.state.Selected[0]}
                                onPress={() => this.selectA()}
                                style={GameScreenStyle.answerAtext}>
                                <Text>
                                    {this.state.Answer_A}
                                </Text>
                            </Button>
                            <Button
                                rounded
                                light={!this.state.Selected[1]}
                                danger={this.state.Selected[1]}
                                onPress={() => this.selectB()}
                                style={GameScreenStyle.answerText}>
                                <Text>
                                    {this.state.Answer_B}
                                </Text>
                            </Button>
                            <Button
                                rounded
                                light={!this.state.Selected[2]}
                                danger={this.state.Selected[2]}
                                onPress={() => this.selectC()}
                                style={GameScreenStyle.answerText}>
                                <Text>{this.state.Answer_C}</Text>
                            </Button>

                            <Subscriber
                                sessionId={sessionId}
                                style={{backgroundColor: 'black',height:height / 4, width: width / 4,  }}
                                ref={ref => {
                                    this.ref = ref;
                                }}
                            />
                        </Content>
                    </Container>
                );
            }
        }
    }
}