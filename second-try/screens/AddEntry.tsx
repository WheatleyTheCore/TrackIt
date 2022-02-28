import React, {useState, useContext} from 'react'
import {View, SafeAreaView, Text} from 'react-native'
import { FlatList } from 'react-native-gesture-handler'

import { AppDataContext } from '../DataMgmt/AppDataContext'


export default ({navigation}) => {
    const context = useContext(AppDataContext)

    return (
        <View>
            <Text>{JSON.stringify(context?.currentCollection)}</Text>
            <FlatList data={Object.keys(context?.currentCollection.entrySchema)} keyExtractor={item => item} renderItem={({index, item}) => {
            return (
                <Text>{item}</Text>
            )
        }} />
        </View>
    )
}