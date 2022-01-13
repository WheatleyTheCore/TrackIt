import React, {useState, useEffect, useContext} from 'react'
import {View, SafeAreaView, Text} from 'react-native'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'

import {loadAllCollectionNames} from '../DataMgmt/storageUtils'
import useCollectionList from '../DataMgmt/collectionListHook'
import List from '../components/List'
import { AppDataContext } from '../DataMgmt/AppDataContext'

export default ({navigation}) => {

    const [collectionNames, setCollectionNames] = useState<string[]>([])
    const [didLoadCollectionNames, setDidLoadCollectionNames] = useState(false)
    
    setCollectionNames(AppDataContext.collectionNames)

    // useEffect(() => {
    //     if (!didLoadCollectionNames) {
    //         loadAllCollectionNames(setCollectionNames)
    //         setDidLoadCollectionNames(true)
    //     }
    // }, [didLoadCollectionNames])

    return (
        <SafeAreaView>
            <List listData={collectionNames} />
        </SafeAreaView>
    )
}