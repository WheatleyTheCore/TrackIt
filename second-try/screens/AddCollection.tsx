import React, {useState, useContext} from 'react'
import {View, SafeAreaView, Text, Button} from 'react-native'
import CreateCollectionForm from '../components/CreateCollectionForm'
import { AppDataContext } from '../DataMgmt/AppDataContext'
import uuid from 'react-native-uuid'
export default () => {
    const context = useContext(AppDataContext)


    const jsonSchema = {
        title: 'Test Form',
        Fields: [
            {
                name: uuid.v4() ,
                type:'text',
                value:'',
                required:{
                    value:true,
                    message:'Employee First Name is required'
                },
                validation:function(val){
                    return val.length >=5 || 'Min Length is 5';
                }
            },
            {
                name: uuid.v4() ,
                type:'text',
                value:'',
                required:{
                    value:true,
                    message:'Employee Last Name is required'
                },
            },
        ]
    };

    const [schema, setSchema] = useState(jsonSchema)

    return (
        <View>
            <Text>{JSON.stringify(context?.currentCollection)}</Text>
            <Text>{jsonSchema.title}</Text>
            <CreateCollectionForm entrySchema={schema} handleTypeChange={(type, index) => {
                let previousSchema = {...schema}
                previousSchema.Fields[index].type = type
                console.log(previousSchema)
                setSchema(previousSchema)
            }}
            handleSubmitForm={(data) => {
                console.log('----------data from the collection screen--------')
                let schemaCopy = {...schema}
                for (const property in data) {
                    schemaCopy.Fields[schemaCopy.Fields.indexOf(schemaCopy.Fields.find(element => element.name == property))].value = data[property]
                }
                console.log(schemaCopy)
                const newCollection = context?.collectionFactory('test', schemaCopy.Fields)
                context?.createCollection(newCollection)
            }}
            handleDeleteField={index => {
                console.log('==================deleting field================')
                let schemaCopy = {...schema}
                schemaCopy.Fields.splice(index, 1)
                console.log(schemaCopy)
                setSchema(schemaCopy)
            }} />
            <Button title="add field" onPress={() => {
                let previousSchema = {...schema}
                previousSchema.Fields.push({
                    name: uuid.v4(),
                    type:'text',
                    title: JSON.stringify(previousSchema.Fields.length + 1),
                    required:{
                        value:true,
                        message:'Employee Last Name is required'
                    },
                })
                console.log(previousSchema)
                setSchema(previousSchema)
            }} />
        </View>
    )
}