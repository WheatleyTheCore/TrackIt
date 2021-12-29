import React, {useState, useEffect} from 'react'
import {View, SafeAreaView, Text, TouchableOpacity} from 'react-native'

export default ({navigation}) => {
    return (
        <View>
            <Text>Editing entries happens here</Text>
            <TouchableOpacity onPress={() => {
                navigation.navigate("EditCollection")
            }}><Text>Next!</Text></TouchableOpacity>
        </View>
    )
}