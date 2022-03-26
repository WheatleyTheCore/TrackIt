import React, { useState } from 'react'
import { Dimensions, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';

interface props {
    fieldsObject: object[];
    types: string[];
    selectedField: string;
    setSelectedField : (type: string) => void;
  }

  //TODO store selectedField outside and pass in "onchange" prop

export default ({fieldsObject, types, selectedField, setSelectedField}: props) =>  {

    return (
        <Picker
            selectedValue={selectedField}
            onValueChange={(value: any) => {
                setSelectedField(value)
            }}>
                {selectedField == -1 && <Picker.Item label="" value={-1} />}
               {fieldsObject.filter((field: any) => types.indexOf(field.type) >= 0).map((field: any) => {
                   return (
                       <Picker.Item label={field.name} value={field.name} />
                   )
               })} 
            </Picker>
    )
}