import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity,Dimensions } from "react-native";
import OpenTok, { Publisher } from 'react-native-opentok';
import Styles from '../opentok/Styles';
import type { Ref } from 'react';
var {height, width} = Dimensions.get('window');

const sessionId = '1_MX40NjA5NjAxMn5-MTUyMzEwNTg1MTIzMH4zZWtRcHVNbXB4ME5HaFJaOGUzdWlyYVN-UH4';
const token = 'T1==cGFydG5lcl9pZD00NjA5NjAxMiZzaWc9YjRhODZkNDZmZjAwNTIxMGU2NTN' +
    'hY2M5ZWU3MGQ0N2NlMTIzMWRiYTpzZXNzaW9uX2lkPTFfTVg0ME5qQTVOakF4TW41LU1UVXlNekV3TlR' +
    'nMU1USXpNSDR6Wld0UmNIVk5iWEI0TUU1SGFGSmFPR1V6ZFdseVlWTi1VSDQmY3JlYXRlX3RpbWU9MTUyM' +
    'zEwNTk0NSZub25jZT0wLjgwNjYwMTY1MDk3MjI1MDImcm9sZT1wdWJsaXNoZXImZXhwaXJlX3RpbWU9MTUyN' +
    'TY5Nzk0MiZpbml0aWFsX2xheW91dF9jbGFzc19saXN0PQ==';

export default class Publish extends Component<{}> {

    async componentWillMount() {
        await OpenTok.connect(sessionId, token);
        OpenTok.on(OpenTok.events.ON_SIGNAL_RECEIVED, e => console.log(e));
    }

    ref: Ref<typeof Publisher>;
    render() {
        return (
            <View style={styles.container}>
                <View style={{flex:0.7}}>
                    <Publisher
                        sessionId={sessionId}
                        onPublishStart={() => { console.log('started')}}
                        style={styles.publisher}
                        ref={ref => {
                            this.ref = ref;
                        }}
                    />
                </View>
                <View style={{flex:0.15,flexDirection:'row'}}>
                    <View style={{flex:0.2}}></View>
                    <TouchableOpacity
                        style={styles.iconBox}
                        onPress={() => {if (typeof this.ref !== 'string') this.ref.switchCamera()}}>
                    </TouchableOpacity>
                    <View style={{flex:0.2}}></View>
                </View>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    publisher:{
        backgroundColor: 'black',
        height:height,
        width: width
    },
    iconBox:{
        flex:0.3,
        margin:5,
        alignItems:'center',
        borderRadius:5,
        justifyContent:'center',
        borderWidth:1,
        backgroundColor:"transparent",
        borderColor:'white'
    },
    cancelBtn:{
        backgroundColor:'#E74C3C',
        flex:1,
        margin:10,
        alignItems:'center',
        justifyContent:'center'
    },
    headerIcon:{
        flex:0.1,
        justifyContent:'center',
        alignItems:'center',
        paddingLeft:5,
        paddingTop:10
    }
});