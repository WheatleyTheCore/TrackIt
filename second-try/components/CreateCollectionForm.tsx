import React from 'react'
import { Button, Text, TextInput, View } from 'react-native';
import { useForm, Controller } from "react-hook-form";
import {Picker} from '@react-native-picker/picker';

export default ({entrySchema, handleTypeChange, handleSubmitForm, handleDeleteField}) => {


    const { control, handleSubmit, formState: { errors } } = useForm({});
      const onSubmit = data => {
        handleSubmitForm(data)
      }
    
      return (
        <View>
          {
            entrySchema.Fields.map((item, index) => {
              return (
                <View key={index} >
                  {errors[item.name] && <Text style={{color: 'red'}}>This is required.</Text>}
              <Controller
                control={control}
                rules={{
                 required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <View>
                    <Text>Attribute {index + 1} Title</Text>
                    <Button title={`delete attribute ${index + 1}`} onPress={() => {
                      handleDeleteField(index)
                    }} />
                  <TextInput
                    style={{borderBottomColor: '#000', borderBottomWidth: 2, marginBottom: 4}}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                  <Text>Attribute {index + 1} Type</Text>
                  <Picker
                  selectedValue={item.type}
                  onValueChange={(itemValue, itemIndex) => {
                    handleTypeChange(itemValue, index)
                  }
                  }>
                  <Picker.Item label="Text" value="text" />
                  <Picker.Item label="Number" value="number" />
                  <Picker.Item label="Accelerometer Data" value="accelerometer" />
                  <Picker.Item label="Gyroscope Data" value="gyroscope" />
                  <Picker.Item label="Barometer Data" value="barometer" />
                  <Picker.Item label="Magnetometer Data" value="magnetometer" />
                  <Picker.Item label="Pedometer Data" value="pedometer" />
                </Picker>
                  </View>
                )}
                name={item.name}
              />
              
              </View>
            )
          })  
          
        }
          <Button title="Submit" onPress={handleSubmit(onSubmit)} />
        </View>
      );
}