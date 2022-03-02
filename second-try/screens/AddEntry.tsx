import React, {useState, useContext, useEffect} from 'react'
import { useForm } from 'react-hook-form'
import {View, SafeAreaView, Text} from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import AddEntryForm from '../components/AddEntryForm'

import { AppDataContext } from '../DataMgmt/AppDataContext'


export default ({navigation}) => {
    const context = useContext(AppDataContext)
    const [isLoading, setIsLoading] = useState(true)

    const { control, handleSubmit, formState: { errors } } = useForm({});
      const onSubmit = data => {
        console.log(data)
      }

    useEffect(() => {
        if(context?.currentCollection != undefined) {
            setIsLoading(false)
        }
    }, [context?.currentCollection, isLoading])

    if (isLoading) return <Text>Loading....</Text>

    

    console.log(context?.currentCollection)

    return (
        <View>
            <AddEntryForm entrySchema={context?.currentCollection.entrySchema} handleSubmitForm={onSubmit}/>
        </View>
    )
}