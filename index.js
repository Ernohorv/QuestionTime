import React, { Component } from 'react';  
import { AppRegistry } from 'react-native';
import App from './App';


export default class QuestionTime extends Component {
    render() {
        return (
            <App />
        );
    }
}

AppRegistry.registerComponent('QuestionTime', () => QuestionTime);
