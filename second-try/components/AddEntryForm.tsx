import React from 'react'
import { Button, Text, TextInput, View } from 'react-native';
import { useForm, Controller } from "react-hook-form";
import {Picker} from '@react-native-picker/picker';


export default ({entrySchema, handleTypeChange}) => {


    const { control, handleSubmit, formState: { errors } } = useForm({});
      const onSubmit = data => {
        console.log('--------------SUBMIT DATA----------------')
        console.log(data)
      }
    
      return (
        <View>
          {
            entrySchema.Fields.map((item, index) => {
              return (
              <Controller
                control={control}
                rules={{
                 required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <View>
                    <Text>Attribute Title</Text>
                  <TextInput
                    style={{borderBottomColor: '#000', borderBottomWidth: 2, marginBottom: 4}}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    keyboardType={item.type == 'number' ? 'decimal-pad' : 'default'}
                  />
                  </View>
                )}
                name={item.name}
              />
            )
          })  
          
        }
          <Button title="Submit" onPress={handleSubmit(onSubmit)} />
        </View>
      );
}