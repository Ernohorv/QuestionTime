import React, { Component } from 'react';
import Leaderboard from 'react-native-leaderboard';

export default class HighScoreSceen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [
                {userName: 'Jim', highScore: 0},
                {userName: 'Bobby', highScore: 1000},
                {userName: 'Cica', highScore: 999999999999999}

            ]
        }
    }

    render() {
        return (
          <Leaderboard
              sortBy='highScore'
              labelBy='userName'
              data={this.state.data}/>
        );
    }
}