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
        }, 60)
      
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
                let entryDate = new Date(entry.datetime_of_initial_submit).toLocaleDateString()
                return (
                    <EntryListItem 
                    item={entryDate} 
                    index={index} 
                    deleteHandler={(index) => {
                        context?.deleteEntry(index)
                        setTimeout(() => {
                            setEntries([[...context?.currentCollection.entries]]) //wait for context to update and set the data. This is a hack, and will (hopefully) be fixed later
                            console.log([[...context?.currentCollection.entries]]) //wait for context to update and set the data. This is a hack, and will (hopefully) be fixed later

                        }, 1000)
                    }}
                    clickHandler={clickHandler}
                    />
                )
            })}
            <Button title="add entry" onPress={() => createNewEntryHandler()} />
        </SafeAreaView>
    )
}