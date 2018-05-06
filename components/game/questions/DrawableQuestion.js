import React, { Component } from 'react';
import { Text, Button, Container, Content, Input, Item, Label, Form, Title } from 'native-base';
import GameScreenStyle from '../../styles/GameScreenStyle'
import { Image } from 'react-native';
import firebase from 'react-native-firebase';

export default class DrawableQuestion extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            Answer: '',
            pictureUrl: ' ',
        });

        this.pictureRef = firebase.storage().ref('draw/drawing.png');
    }

    componentDidMount() {
        this.props.onRef(this)
        this.pictureRef.getDownloadURL()
        .then((url) => {
            this.setState({
                pictureUrl: url,
            })
        })
        .catch((error) => {
            this.getImage();
        });
    }

    componentWillUnmount() {
        this.props.onRef(undefined)
    }

    getResult(){
        if(this.state.Answer === this.props.Question.doc._data.Correct){
            return true;
        }
        else{
            return false;
        }
    }
    
    render() {
        return (
            <Container
                style={{
                    backgroundColor: 'whitesmoke'
                }}>
                <Content>
                    <Text
                        style={GameScreenStyle.questionText}>
                        {this.props.Question.doc._data.Question}
                    </Text>
                    <Input value={this.state.Answer} style={{ color: 'black', width: '80%', alignSelf: 'center', justifyContent: 'center', backgroundColor: 'white', marginTop: 30,}} onChangeText={(answer) => this.setState({ Answer: answer })}/>
                    <Image
                        style={{width: 300, height: 500, alignSelf: 'center'}}
                        source={{uri: this.state.pictureUrl}}
                        />
                </Content>
            </Container>
        );
    }
}