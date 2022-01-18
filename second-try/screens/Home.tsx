import React, {useState, useEffect, useContext} from 'react'
import {View, SafeAreaView, Text} from 'react-native'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'

import {loadAllCollectionNames} from '../DataMgmt/storageUtils'
import List from '../components/List'
import { AppDataContext } from '../DataMgmt/AppDataContext'

export default ({navigation}:any) => {

    const context = useContext(AppDataContext)
    const [didLoadCollectionNames, setDidLoadCollectionNames] = useState(false)

    const clickHandler = (destination: string, params?: object): void => {
        navigation.navigate(destination, params ? params : null)
    }
    

    useEffect(() => {
        if (!didLoadCollectionNames) {
            loadAllCollectionNames().then(collectionNames => {
                context?.setCollectionNames(collectionNames)
                context?.saveCollection({entrySchema: {},
                    notes:"",
                    entries: []}, 'testing')
            })
            setDidLoadCollectionNames(true)
        }
    }, [didLoadCollectionNames])

    return (
        <SafeAreaView>
            <List listData={context?.collectionNames} clickHandler={clickHandler} deleteHandler={context?.removeCollection} />
        </SafeAreaView>
    )
}