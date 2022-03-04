import React, {useState, useContext, useEffect} from 'react'
import { useForm } from 'react-hook-form'
import {View, SafeAreaView, Text} from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import AddEntryForm from '../components/AddEntryForm'

import { AppDataContext } from '../DataMgmt/AppDataContext'


export default ({navigation}) => {

    setTimeout(() => {
        setSchema(context?.currentCollection.entrySchema) //wait for context to update before setting the data. This is a hack, and will (hopefully) be fixed later
    }, 5)

    const context = useContext(AppDataContext)
    const [isLoading, setIsLoading] = useState(true)
    const [schema, setSchema] = useState({})


    const { control, handleSubmit, formState: { errors } } = useForm({});
      const onSubmit = (data: any) => {
        data['datetime_of_initial_submit'] = new Date()
        context?.addEntry(data)
        navigation.navigate("ViewGraphedCollectionData")
      }

    useEffect(() => {
        if(context?.currentCollection != undefined) {
            setIsLoading(false)
            setSchema(context?.currentCollection.entrySchema)
        }

        
        

        
    }, [context?.currentCollection, isLoading])

    if (isLoading) return <Text>Loading....</Text>


    console.log(context?.currentCollection)

    

    return (
        <View>
            <AddEntryForm entrySchema={schema} handleSubmitForm={onSubmit}/>
        </View>
    )
}