import React, {useState, useEffect, useContext} from 'react'
import {View, SafeAreaView, Text} from 'react-native'
import { AppDataContext } from '../DataMgmt/AppDataContext'

export default ({navigation}) => {

    const context = useContext(AppDataContext)

    return (
        <View>
            <Text>{JSON.stringify(context?.currentCollection.entries)}</Text>
        </View>
    )
}