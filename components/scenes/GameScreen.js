import React, { Component } from 'react';
import GameScreenStyle from '../styles/GameScreenStyle'
import { Button, Text, Container, Content } from 'native-base';
import firebase from 'react-native-firebase';
import Viewer from "../opentok/Viewer";
import LobbyScreen from "../game/LobbyScreen"
import QuestionScreen from "../game/QuestionScreen"
import NoTimeScreen from "../game/NoTimeScreen"
import EndGameScreen from "../game/EndGameScreen"

var Sound = require('react-native-sound');
Sound.setCategory('Playback');
var alarm = new Sound('smoke_alarm.mp3', Sound.MAIN_BUNDLE, (error) => {
    if (error) {
        return;
    }
});

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

    setQuestions() {
        this.setState({
            Question: this.state.questions[this.state.questionNo],
        });
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
            if (this.QuestionScreenRef.getResult()) {
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

    render() {
        if (this.state.endGame) {
            return (
                <EndGameScreen
                    playerPoints={this.state.points}
                    maxPoints={this.state.questions.length} 
                    homeScreen={this.homeScreen.bind(this)} />
            );
        }
        else if (!this.state.start) {
            return(
                <LobbyScreen />
            )            
        }
        else {
            if (this.state.noTime) {
                return (
                    Cica
                );
            }
            else {
                return (
                    <QuestionScreen 
                        Counter={this.state.counter}
                        Question={this.state.Question}
                        onRef={ref => (this.QuestionScreenRef = ref)} />
                );
            }
        }
    }
}