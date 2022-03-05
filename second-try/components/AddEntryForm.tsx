import React from 'react'
import { Button, Text, TextInput, View } from 'react-native';
import { useForm, Controller } from "react-hook-form";
import {Picker} from '@react-native-picker/picker';


export default ({entrySchema, handleSubmitForm}) => {


    const { control, handleSubmit, formState: { errors } } = useForm({});
      const onSubmit = data => {
        handleSubmitForm(data)
      }

      //TODO if sensor data, display text "__ will be recorded when you hit submit" instead of input
    
      return (
        <View>
          {
            entrySchema.map((item, index) => {
              return (
              <Controller
                key={item.id}
                control={control}
                rules={{
                 required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <View>
                    <Text>{item.name}</Text>
                  {(item.type == 'number' || item.type == 'text') ? <TextInput
                    style={{borderBottomColor: '#000', borderBottomWidth: 2, marginBottom: 4}}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    keyboardType={item.type == 'number' ? 'decimal-pad' : 'default'}
                  /> : 
                  <Text>{`${item.type} data will be recorded on submit`}</Text>
                  }
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