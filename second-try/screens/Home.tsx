import React, {useState, useEffect} from 'react'
import {View, SafeAreaView, Text} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default ({navigation}) => {
    return (
        <View>
            <Text>The home page goes here</Text>
            <TouchableOpacity onPress={() => {
                navigation.navigate("Settings")
            }}><Text>Next!</Text></TouchableOpacity>
        </View>
    )
}