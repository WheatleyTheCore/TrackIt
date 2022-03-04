import React, {useState, useEffect, useContext} from 'react'
import {View, SafeAreaView, Text, Button} from 'react-native'
import List from '../components/List'
import { AppDataContext } from '../DataMgmt/AppDataContext'

//this might need new list components
export default ({navigation}) => {

    const context = useContext(AppDataContext)


    const clickHandler = (destination: string, params?: object): void => {
        navigation.navigate(destination, params ? params : null)
    }

    const createNewEntryHandler = (): void => {
        navigation.navigate("AddEntry")
    }  

    return (
        <SafeAreaView>
            <List listData={context?.collectionNames} clickHandler={clickHandler} deleteHandler={context?.deleteCollection} />
            <Button title="create new collection" onPress={() => createNewEntryHandler()} />
        </SafeAreaView>
    )
}