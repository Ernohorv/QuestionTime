import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity,Dimensions } from "react-native";
import OpenTok, { Publisher,Subscriber } from 'react-native-opentok';

const sessionId = "";
const token = "";

export default class Publish extends Component<{}> {

    async componentWillMount() {
        await OpenTok.connect(sessionId, token);
        OpenTok.on(OpenTok.events.ON_SIGNAL_RECEIVED, e => console.log(e));
    }

    ref: Ref<typeof Publisher>;

    render() {
        return(
            <View>
                <View style={{flex: 0.9}}>
                    <Publisher
                        sessionId = {sessionId}
                        onPublishStart={() => { console.log('Streaming Started')}}
                        onPublishStop={() => { console.log('Streaming Stopped')}}
                        onPublishError={() => { constructor.log('Streaming Error')}}
                        style={{backgroundColor: 'black'}}
                        ref={ref => {
                            this.ref = ref;
                        }}>

                    </Publisher>
                </View>
            </View>
        );
    }

    cancelAndBack() {
        OpenTok.disconnect(sessionId);
        this.props.navigation.goBack();
    }
}