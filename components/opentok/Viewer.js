import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity,Dimensions } from "react-native";
import OpenTok, {Subscriber } from 'react-native-opentok';
import type { Ref } from 'react';
var {height, width} = Dimensions.get('window');

const sessionId = '2_MX40NjA5NjAxMn5-MTUyMzExNDQ1NjY1OH5LK3NKQ05mb0k0RWttbGZtUVhLVjNQOC9-fg';
const token = 'T1==cGFydG5lcl9pZD00NjA5NjAxMiZzaWc9NDExMTk4NDI0MjVlN2JlYjJmZGE1ZTY2OTdkZTc2Z' +
    'GYxNTQwYWYxMTpzZXNzaW9uX2lkPTJfTVg0ME5qQTVOakF4TW41LU1UVXlNekV4TkRRMU5qWTFPSDVMSzNOS1Ew' +
    'NW1iMGswUld0dGJHWnRVVmhMVmpOUU9DOS1mZyZjcmVhdGVfdGltZT0xNTIzMTE0NTI4Jm5vbmNlPTAuNTQxNTg1Mz' +
    'UwNDMyNzgzNCZyb2xlPXN1YnNjcmliZXImZXhwaXJlX3RpbWU9MTUyNTcwNjUyNSZpbml0aWFsX2xheW91dF9jbGFzc19saXN0PQ==';


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