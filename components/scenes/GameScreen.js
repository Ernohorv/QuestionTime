import React, { Component } from 'react';
import App from '../../App';
import { Button, Text, Container, Content } from 'native-base';
import firebase from 'react-native-firebase';

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
        };
        this.questionsRef = firebase.firestore().collection("Games").doc("Game1").collection("Questions");
        this.gameRef = firebase.firestore().collection("Games").doc("Game1").collection("Progress");
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

    componentDidMount() {
        this.getQuestionsFromDatabase(this.questionsRef);
        this.listenForGameProgress(this.gameRef);
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
            Selected : [true, false, false],
        })
    }

    selectB() {
        this.setState({
            Selected : [false, true, false],
        })
    }

    selectC() {
        this.setState({
            Selected : [false, false, true],
        })
    }




    render() {
        return (
            <Container>
                <Content>
                    <Text>It's Question Time !!!</Text>
                    <Text>{this.state.questionSec} seconds remaining</Text>
                    <Text>{this.state.Question}</Text>
                    <Button rounded bordered full info={!this.state.Selected[0]} onPress={() => this.selectA()} style={{ alignSelf: 'center' }}>
                        <Text>{this.state.Answer_A}</Text>
                    </Button>
                    <Button rounded bordered full info={!this.state.Selected[1]} onPress={() => this.selectB()} style={{ alignSelf: 'center' }}>
                        <Text>{this.state.Answer_B}</Text>
                    </Button>
                    <Button rounded bordered full info={!this.state.Selected[2]} onPress={() => this.selectC()} style={{ alignSelf: 'center' }}>
                        <Text>{this.state.Answer_C}</Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}

