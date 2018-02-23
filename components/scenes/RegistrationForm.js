import React, { Component } from 'react';
import App from '../../App';
import { Button , Text, Container} from 'native-base';

export default class RegistrationForm extends Component {

    onClick() {
        this.props.navigation.navigate('Login');
    }

    render() {
        return (
            <Container>
                <Button onPress={() => this.onClick()}>
                    <Text> Click Me! </Text>
                </Button>
            </Container>
        );
    }
}

