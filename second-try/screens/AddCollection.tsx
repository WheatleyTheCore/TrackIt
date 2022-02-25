import React, {useState, useContext} from 'react'
import {View, SafeAreaView, Text} from 'react-native'
import { AppDataContext } from '../DataMgmt/AppDataContext'


export default () => {
    const context = useContext(AppDataContext)

    return (
        <View>
            <Text>{JSON.stringify(context?.currentCollection)}</Text>
        </View>
    )
}