import React, { Component } from 'react';
import GameScreenStyle from '../styles/GameScreenStyle'
import { Button, Text, Container, Content } from 'native-base';
import firebase from 'react-native-firebase';
import HomeScreenStyle from "../styles/HomeScreenStyle";

var Sound = require('react-native-sound');
Sound.setCategory('Playback');
var alarm = new Sound('smoke_alarm.mp3', Sound.MAIN_BUNDLE, (error) => {
    if (error) {
        return;
    }
});

export default class GameScreen extends Component {

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
            highScore: [],
        };
        this.questionsRef = firebase.firestore().collection("Games").doc("Game1").collection("Questions");
        this.gameRef = firebase.firestore().collection("Games").doc("Game1").collection("Progress");
        this.startRef = firebase.firestore().collection("Start").doc("xJZq9ld1rnbDrHx7jthl").collection("Ready");
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
        });
    }

    listenForGameProgress(gameRef) {
        gameRef.onSnapshot((querySnapshot) => {

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
                questionNo: items[0].doc._data.QuestionNumber,
            });
            if(this.state.endGame !== true)
                this.setQuestions();
        });
    }

    isReady(startRef) {
        startRef.onSnapshot((querySnapshot) => {

            const items = [];
            querySnapshot.forEach((doc) => {
                const { title } = doc.data();
                items.push({
                    _key: doc.id,
                    doc,
                    title,
                });
                this.setState({ start: items[0].doc._data.Ready })
                this.setState({ endGame: items[0].doc._data.EndGame })
                if (items[0].doc._data.Ready) {
                    this.setState({
                        counter: 10,
                        noTime: false,
                        Selected: [false, false, false],
                        timerID: setInterval(() => this.tick(), 1000),
                    });
                }
            });
        });
    }

    componentDidMount() {
        this.getQuestionsFromDatabase(this.questionsRef);
        this.listenForGameProgress(this.gameRef);
        this.isReady(this.startRef);
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
                }));

            }
            else {
                this.setState({
                    endGame: true,
                });
                clearInterval(this.state.timerID);
            }
            if (this.state.questionNo === this.state.questions.length) {
                this.setState({
                    endGame: true,
                });
                clearInterval(this.state.timerID);
            }

            if(this.state.questionNo !== this.state.questions.length)
                this.setQuestions();

        }
    }

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
                            style={HomeScreenStyle.pointText}>
                            {this.state.points} / {this.state.questions.length}
                        </Text>
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
                            <Text>{firebase.auth().currentUser.displayName.toString()}</Text>
                        </Content>
                    </Container>
                );
            }
        }
    }
}