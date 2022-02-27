import React, {useState, useEffect, useContext} from 'react'
import {View, SafeAreaView, Text, Button} from 'react-native'
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

    const createNewCollectionHandler = (): void => {
        context.currentCollection = context.collectionFactory();
        navigation.navigate("AddCollection")
    }
    

    useEffect(() => {
        if (!didLoadCollectionNames) {
            context.getAllCollectionNames()
            setDidLoadCollectionNames(true)
        }
    }, [didLoadCollectionNames])

    //TODO the keys for stuff are now GUIDs, we'll need to load all the collections into memory to get their names. 
    return (
        <SafeAreaView>
            <List listData={context?.collectionNames} clickHandler={clickHandler} deleteHandler={context?.deleteCollection} />
            <Button title="create new collection" onPress={() => createNewCollectionHandler()} />
        </SafeAreaView>
    )
}