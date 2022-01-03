import React, {useState, useEffect} from 'react'
import {View, SafeAreaView, Text} from 'react-native'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'

import {loadAllCollectionNames} from '../utils/storageUtils'

export default ({navigation}) => {

    const [collectionNames, setCollectionNames] = useState([])
    const [didLoadCollectionNames, setDidLoadCollectionNames] = useState(false)

    useEffect(() => {
        if (!didLoadCollectionNames) {
            loadAllCollectionNames(setCollectionNames)
            setDidLoadCollectionNames(true)
        }
    }, [didLoadCollectionNames])

    return (
        <SafeAreaView>
            <FlatList
            data={collectionNames}
            renderItem={({item, index}) => {
                return (
                    <Text key={index.toString()}>{item}</Text>
                )
            }}
            />
        </SafeAreaView>
    )
}