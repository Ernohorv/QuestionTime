import React, { Component } from 'react';
import App from '../../App';
import { Button, Text, Container, Content } from 'native-base';
import firebase from 'react-native-firebase';
import timer from 'react-native-timer';

export default class GameScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            questions: [],
            questionNo: 0,
            questionSec: 30,
            Question: '',
            Answer_A: '',
            Answer_B: '',
            Answer_C: '',
            Selected: [false, false, false],
            start: false,
            timer: null,
            counter: 0
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
                questionSec: items[0].doc._data.SecondsRemaining,
            });
            this.setQuestions();
        });
    }

    isReady(startRef) {
        startRef.onSnapshot((querySnapshot) => {

            const items = [];
            querySnapshot.forEach((doc) => {
                const {title} = doc.data();
                items.push({
                    _key: doc.id,
                    doc,
                    title,
                });
                this.setState({start: items[0].doc._data.Ready});

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
            counter: this.state.counter + 1
        });
    }

    render() {
        if(this.state.start) {
            while(this.state.counter !== 1000) {
                let timer = setInterval(this.tick(), 1000);
                this.setState({timer});
            }

        }
        return (
            <Container style={{ backgroundColor: 'whitesmoke' }}>
                <Content>
                    <Text style={{ alignSelf: 'center', marginTop: 30, fontSize: 64, color: 'darkslategrey' }}>{this.state.counter}</Text>
                    <Text style={{ alignSelf: 'center', marginTop: 50, fontSize: 24, color: 'darkslategrey' }}>{this.state.Question}</Text>
                    <Button rounded light={!this.state.Selected[0]} danger={this.state.Selected[0]} onPress={() => this.selectA()} style={{ alignSelf: 'center', justifyContent: 'flex-start', width: '80%', marginBottom: 15, marginTop: 15 }}>
                        <Text>{this.state.Answer_A}</Text>
                    </Button>
                    <Button rounded light={!this.state.Selected[1]} danger={this.state.Selected[1]} onPress={() => this.selectB()} style={{ alignSelf: 'center', justifyContent: 'flex-start', width: '80%', marginBottom: 15 }}>
                        <Text>{this.state.Answer_B}</Text>
                    </Button>
                    <Button rounded light={!this.state.Selected[2]} danger={this.state.Selected[2]} onPress={() => this.selectC()} style={{ alignSelf: 'center', justifyContent: 'flex-start', width: '80%', marginBottom: 15 }}>
                        <Text>{this.state.Answer_C}</Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}

