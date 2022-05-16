import React, { useState } from 'react'
import { Button, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { useForm, Controller } from "react-hook-form";
import {Picker} from '@react-native-picker/picker';
import { ScrollView } from 'react-native-gesture-handler';
import { useActionSheet } from '@expo/react-native-action-sheet';

export default ({entrySchema, handleTypeChange, handleNameChange, handleSubmitForm, handleDeleteField}) => {
  const { showActionSheetWithOptions } = useActionSheet();

  const openActionSheet = (index) => {
      let options = ['text', 'number', 'accelerometer', 'gyroscope', 'barometer', 'magnetometer', 'pedometer']
      const destructiveButtonIndex = 0;
      const cancelButtonIndex = options.length;
      showActionSheetWithOptions(
          {
            options,
            destructiveButtonIndex,
            cancelButtonIndex,
          },
          (buttonIndex) => {
            //TODO don't change thing if user cancels
              handleTypeChange(options[buttonIndex], index)
            // Do something here depending on the button index selected
          }
        );
  }
      return (
        <View>
          {
            entrySchema.map((item, index) => {
              return (
                <View key={item.id} >
                    <Text>Attribute {index + 1} Title</Text>
                    <Button title={`delete attribute ${index + 1}`} onPress={() => {
                      handleDeleteField(index)
                    }} />
                  <TextInput
                    style={{borderBottomColor: '#000', borderBottomWidth: 2, marginBottom: 4}}
                    onChangeText={(text: string) => handleNameChange(text, index)}
                    value={item.name}
                    placeholder="attribute name"
                  />
                  <Text>Attribute {index + 1} Type</Text>
                  <TouchableOpacity onPress={() => openActionSheet(index)} style={{backgroundColor: 'grey'}}>
                      <Text>{item.type}</Text>
                  </TouchableOpacity>
              
              </View>
            )
          })  
          
        }
          <Button title="Submit" onPress={() => handleSubmitForm()} />
        </View>
      );
}