import React, {useState, useEffect} from 'react'
import {View, SafeAreaView, Text} from 'react-native'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'

import {loadAllCollectionNames} from '../DataMgmt/storageUtils'
import useCollectionList from '../DataMgmt/collectionListHook'
import List from '../components/List'

export default ({navigation}) => {

    const [collectionNames, setCollectionNames] = useState([])
    const [didLoadCollectionNames, setDidLoadCollectionNames] = useState(false)

    // useEffect(() => {
    //     if (!didLoadCollectionNames) {
    //         loadAllCollectionNames(setCollectionNames)
    //         setDidLoadCollectionNames(true)
    //     }
    // }, [didLoadCollectionNames])

    return (
        <SafeAreaView>
            <List listData={['asdf', 'sdfgh', 'asdf']} />
        </SafeAreaView>
    )
}