import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity,Dimensions } from "react-native";
import OpenTok, {Subscriber } from 'react-native-opentok';
import type { Ref } from 'react';
var {height, width} = Dimensions.get('window');

const sessionId = '1_MX40NjA5NjAxMn5-MTUyMzEwNTg1MTIzMH4zZWtRcHVNbXB4ME5HaFJaOGUzdWlyYVN-UH4';
const token = 'T1==cGFydG5lcl9pZD00NjA5NjAxMiZzaWc9ZGJhZjE4OTlkZDExYTFhMDkyNTczNWQwMDI4YWRkMzJ' +
    'mNWUxMDhhNDpzZXNzaW9uX2lkPTFfTVg0ME5qQTVOakF4TW41LU1UVXlNekV3TlRnMU1USXpNSDR6Wld0UmNIVk5iWEI0' +
    'TUU1SGFGSmFPR1V6ZFdseVlWTi1VSDQmY3JlYXRlX3RpbWU9MTUyMzEwNTkwMSZub25jZT0wLjI3NjQ1MzMxMTA2MDYz' +
    'NTMmcm9sZT1zdWJzY3JpYmVyJmV4cGlyZV90aW1lPTE1MjU2OTc4OTgmaW5pdGlhbF9sYXlvdXRfY2xhc3NfbGlzdD0=';


export default class Viewer extends Component<{}> {

    async componentWillMount() {
        await OpenTok.connect(sessionId, token);
        OpenTok.on(OpenTok.events.ON_SIGNAL_RECEIVED, e => console.log(e));
    }

    ref: Ref<typeof Viewer>;
    render() {
        return (
            <View style={styles.container}>
                <View style={{flex:0.9}}>
                    <Subscriber
                        sessionId={sessionId}
                        style={{backgroundColor: 'black',height:height, width: width,  }}
                        ref={ref => {
                            this.ref = ref;
                        }}
                    />
                </View>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    cancel: {
        backgroundColor:'#E74C3C',
        flex:1,
        margin:5,
        alignItems:'center',
        borderRadius:5,
        justifyContent:'center'
    }
});