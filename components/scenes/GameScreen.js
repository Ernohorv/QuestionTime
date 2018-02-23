import React, { Component } from 'react';
import App from '../../App';
import { Button, Text, Container, Content } from 'native-base';
import firebase from 'react-native-firebase';

export default class GameScreen extends Component {

    constructor(props) {
        firebase.auth().signInAndRetrieveDataWithEmailAndPassword('1234567zzz@gmail.com', '123456');
        super(props);
        this.state = {
            questions: [],
            questionNo: 0,
            Question: '',
            Answer_A: '',
            Answer_B: '',
            Answer_C: '',
        };
        this.itemsRef = firebase.firestore().collection("Games").doc("Game1").collection("Questions");
    }

    listenForItems(itemsRef) {
        itemsRef.onSnapshot((querySnapshot) => {

            const items = [];
            querySnapshot.forEach((doc) => {
                const { title } = doc.data();
                items.push({
                    _key: doc.id,
                    doc, // DocumentSnapshot
                    title,
                });
            });

            this.setState({
                questions: items,
            });
            this.initQuestions();
        });
    }

    componentDidMount() {
        this.listenForItems(this.itemsRef);
    }

    initQuestions() {
        this.setState({
            Question: this.state.questions[this.state.questionNo].doc._data.Question,
            Answer_A: this.state.questions[this.state.questionNo].doc._data.Answer_A,
            Answer_B: this.state.questions[this.state.questionNo].doc._data.Answer_B,
            Answer_C: this.state.questions[this.state.questionNo].doc._data.Answer_C,
        });
    }

    selectA() {
        this.setState({
            questionNo: this.state.questionNo + 1,
        });
        this.initQuestions();
    }

    selectB() {
        this.setState({
            questionNo: this.state.questionNo + 1,
        });
        this.initQuestions();
    }

    selectC() {
        this.setState({
            questionNo: this.state.questionNo + 1,
        });
        this.initQuestions();
    }


    render() {
        return (
            <Container>
                <Content>
                    <Text>It's Question Time !!!</Text>
                    <Text>{this.state.Question}</Text>
                    <Button rounded bordered info onPress={() => this.selectA()} style={{ alignSelf: 'center' }}>
                        <Text>{this.state.Answer_A}</Text>
                    </Button>
                    <Button rounded bordered info onPress={() => this.selectB()} style={{ alignSelf: 'center' }}>
                        <Text>{this.state.Answer_B}</Text>
                    </Button>
                    <Button rounded bordered info onPress={() => this.selectC()} style={{ alignSelf: 'center' }}>
                        <Text>{this.state.Answer_C}</Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}

