import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity,Dimensions } from "react-native";
import OpenTok, { Subscriber } from 'react-native-opentok';

const sessionId = '';
const token = '';

export default class Viewer extends Component<{}> {

    async componentWillMount() {
        await OpenTok.connect(sessionId, token);
        OpenTok.on(OpenTok.events.ON_SIGNAL_RECEIVED, e => console.log(e));
    }

    ref: Ref<typeof Viewer>;

    render() {
        return(
            <View style={styles.container}>
                <View style={{flex:0.9}}>
                    <Subscriber
                        sessionId={sessionId}
                        onSubscribeStart={() => { console.log('Watching started')}}
                        onSubscribeStop={() => { console.log('Watching started')}}
                            onSubscribeError={() => { console.log('Watching started')}}
                            style={{backgroundColor: 'black' }}
                            ref={ref => {
                            this.ref = ref;
                        }}
                            />
                </View>
            </View>
        );
    }

    cancelAndBack(){
        OpenTok.disconnect(sessionId)
        this.props.navigation.goBack()
    }
}