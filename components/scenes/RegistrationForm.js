import React from 'react';
import App from '../../App';
import { Button } from 'native-base';

export default class RegistrationForm extends React.Component {

    onClick() {
        this.props.navigation.navigate('Login');
    }

    render() {
        return (
            <View>
                <Button onPress={() => onClick()}>
                    <Text> Click Me! </Text>
                </Button>
            </View>
        );
    }
}

