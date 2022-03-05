import React, {useState, useEffect, useContext} from 'react'
import {View, SafeAreaView, Text, TouchableOpacity} from 'react-native'
import AddEntryForm from '../components/AddEntryForm'
import { AppDataContext } from '../DataMgmt/AppDataContext'

export default ({route, navigation}) => {
    const context = useContext(AppDataContext)

    let {entryIndex} = route.params

    
    const [isLoading, setIsLoading] = useState(true)
    const [schema, setSchema] = useState({})
      
    useEffect(() => {
        if(context?.currentCollection != undefined) {
            setIsLoading(false)
            setSchema(context?.currentCollection.entrySchema)
            setTimeout(() => {
                setSchema(context?.currentCollection.entrySchema) //wait for context to update and set the data. This is a hack, and will (hopefully) be fixed later
            }, 10)
        }

        
    
        

        
    }, [context?.currentCollection, isLoading])

    if (isLoading) return <Text>Loading....</Text>


    console.log(context?.currentCollection)

    
    //TODO REPLACE ADD ENTRY FORM WITH EDIT ENTRY FORM HERE
    return (
        <View>
            <Text>{JSON.stringify(context?.currentCollection.entries[entryIndex])}</Text>
        </View>
    )
}