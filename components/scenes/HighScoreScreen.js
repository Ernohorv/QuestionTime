import React, { Component } from 'react';
import { Button, Text, Container, Content } from 'native-base';
import Leaderboard from 'react-native-leaderboard';
import firebase from 'react-native-firebase';
import HighScoreStyle from '../styles/HighScoreStyle';
import { VictoryBar, VictoryChart, VictoryTheme } from 'victory-native';
import { View } from 'react-native';

export default class HighScoreScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [{ name: 'dummy', score: 0 },],
    };
        this.usersRef = firebase.firestore().collection("Users");
    }

    goBack() {
        this.props.navigation.navigate('Home');
    }

    getHighScores(usersRef) {
        usersRef.onSnapshot((querySnapshot) => {

            const items = [];
            querySnapshot.forEach((doc) => {
                items.push({
                    name: doc.data().name,
                    score: doc.data().score,
                });
            });

            this.setState({
                data: items,
            });
        });
    }

    componentDidMount() {
        this.getHighScores(this.usersRef);
    }

    render() {

        return (
            <Container
                style=
                {{ backgroundColor: 'whitesmoke' }}>
                <Content>
                    <Leaderboard
                        sortBy='score'
                        labelBy='name'
                        enableEmptySections='true'
                        data={this.state.data}/>
                    <Button
                        rounded
                        bordered
                        onPress={() => this.goBack()}
                        style={
                            HighScoreStyle.backButton}>
                        <Text style={{ color: 'crimson' }}>Go back</Text>
                    </Button>
                    <View style={HighScoreStyle.container}>
                    <VictoryChart width={500} theme={VictoryTheme.grayscale}>
                        <VictoryBar data={this.state.data} x= "name" y="score" />
                    </VictoryChart>
                    </View>
                </Content>
            </Container>
        );
    }
}