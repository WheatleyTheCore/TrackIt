import React, {useState, useEffect, useContext} from 'react'
import {View, SafeAreaView, Text, Button} from 'react-native'
import EntryListItem from '../components/EntryListItem'
import List from '../components/List'
import { AppDataContext } from '../DataMgmt/AppDataContext'

//this might need new list components
export default ({navigation}) => {
    const context = useContext(AppDataContext)
    
    const [entries, setEntries] = useState(context?.currentCollection.entreis)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setEntries([...context?.currentCollection.entries]) //wait for context to update and set the data. This is a hack, and will (hopefully) be fixed later
            setIsLoading(false)
        }, 100)
      
  }, [isLoading])

    if (isLoading) {
        return (
            <Text>Loading...</Text>
        )
    }


    const clickHandler = (destination: string, params?: object): void => {
        navigation.navigate(destination, params ? params : null)
    }

    const createNewEntryHandler = (): void => {
        navigation.navigate("AddEntry")
    }  

    return (
        <SafeAreaView>
            {entries.map((entry, index) => {
                let now = new Date(entry.datetime_of_initial_submit)
                let entryDate = now.toLocaleDateString()
                let entryTime = now.toTimeString()
                return (
                    <EntryListItem 
                    key={index}
                    item={`${entryDate}, at ${entryTime}`} 
                    index={index} 
                    deleteHandler={(index) => {
                        context?.deleteEntry(entry.datetime_of_initial_submit)
                        setTimeout(() => {
                            //console.log('updating state!')
                            setEntries([...context?.currentCollection.entries]) //wait for context to update and set the data. This is a hack, and will (hopefully) be fixed later
                        }, 100) //not triggering update... for some reason
                    }}
                    clickHandler={clickHandler}
                    />
                )
            })}
            <Button title="add entry" onPress={() => createNewEntryHandler()} />
        </SafeAreaView>
    )
}