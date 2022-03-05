import React, {useState, useContext} from 'react'
import {View, SafeAreaView, Text, TextInput, Button} from 'react-native'
import CreateCollectionForm from '../components/CreateCollectionForm'
import { AppDataContext } from '../DataMgmt/AppDataContext'
import uuid from 'react-native-uuid'
export default () => {
    const context = useContext(AppDataContext)


    const jsonSchema = {
        title: 'Test Form',
        Fields: [
            {
                id: uuid.v4(),
                name: 'field 1',
                type:'text',
                required:{
                    value:true,
                    message:'Employee First Name is required'
                },
                // validation:function(val){
                //     return val.length >=5 || 'Min Length is 5';
                // }
            },
        ]
    };

    const [schema, setSchema] = useState(jsonSchema)
    const [title, setTitle] = useState('title')

    // const updateSchemaValue = (schema: object, property: string, value: any) => {
    //     let schemaCopy = {...schema}
    //     schemaCopy.Fields[schemaCopy.Fields.indexOf(schemaCopy.Fields.find(element => element.id == property))].name = data[property]

    // }

    return (
        <View>
            <TextInput
                style={{borderBottomColor: '#000', borderBottomWidth: 2, marginBottom: 4}}
                onChangeText={setTitle}
                value={title}
            />
            <CreateCollectionForm entrySchema={schema} 
                handleTypeChange={(type, index) => {
                    let previousSchema = {...schema}
                    previousSchema.Fields[index].type = type
                    console.log(previousSchema)
                    setSchema(previousSchema)
                }}
                handleNameChange={(updatedText: string, index: number) => {
                    let previousSchema = {...schema}
                    previousSchema.Fields[index].name = updatedText
                    setSchema(previousSchema)
                }}
                handleSubmitForm={(data) => {
                    console.log('----------data from the collection screen--------')
                    const newCollection = context?.collectionFactory(title, schema.Fields)
                    context?.createCollection(newCollection)
                }}
                handleDeleteField={(index: number) => {
                    console.log('==================deleting field================')
                    let schemaCopy = {...schema}

                    schemaCopy.Fields.splice(index, 1)
                    setSchema(schemaCopy)
                }} />
            <Button title="add field" onPress={() => {
                let previousSchema = {...schema}
                previousSchema.Fields.push({
                    id: uuid.v4(),
                    name: 'new attribute',
                    type:'text',
                    required:{
                        value:true,
                        message:'Employee Last Name is required'
                    },
                })
                setSchema(previousSchema)
            }} />
        </View>
    )
}