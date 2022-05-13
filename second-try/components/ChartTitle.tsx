import React, { useState } from 'react'
import { View, Dimensions, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import FieldSelector from './FieldSelector';

interface props {
    fields: object[];
    chartType: string;
    setChartType: (type: string) => void;
    dependentVar? : string;
    setDependentVar?: (value: string) => void;
    independentVar? : string;
    setIndependentVar?: (value: string) => void;
  }

  /**-----------------------------------------------------------
   * REPLACE PICKERS WITH ACTION SHEETS, IT'S BETTER FOR IOS
   ------------------------------------------------------------*/

export default ({fields, chartType, setChartType, dependentVar, setDependentVar, independentVar, setIndependentVar}: props) =>  {
    console.log('FIELDS')
    console.log(fields)
    return (
        <View>
            <Picker
                selectedValue={chartType}
                onValueChange={(value, index) => {
                    setChartType(value)
                }}>
                    {fields.length > 1 && <Picker.Item label="Line Chart" value="line" />}
                    <Picker.Item label="Bar Chart" value="bar" />
                    <Picker.Item label="Pie Chart" value="pie" />
                    <Picker.Item label="Contribution Graph" value="contribution" />
                </Picker>
                {
                    chartType == 'line' ? 
                    <View>
                        <Text> of </Text>
                        <FieldSelector fieldsObject={fields} types={["number"]} selectedField={dependentVar} setSelectedField={setDependentVar} />
                        <Text> over </Text>
                        <FieldSelector fieldsObject={[...fields, {
                            name: 'Time and Date Submitted',
                            type: "datetime_of_initial_submit"
                        }]} types={["number", "text", "barometer", "accelerometer", "magnetometer", "gyroscope", "pedometer", "datetime_of_initial_submit"]} selectedField={independentVar} setSelectedField={setIndependentVar}/>
                    </View> :
                    chartType == 'bar' ? 
                    <View>
                        <Text> of the distribution of recorded </Text>
                        <FieldSelector fieldsObject={fields} types={["number", "text", "barometer", "accelerometer", "magnetometer", "gyroscope", "pedometer"]} selectedField={independentVar} setSelectedField={setIndependentVar} />
                    </View> :
                    chartType == 'pie' ? 
                    <View>
                        <Text> of the distribution of recorded </Text>
                        <FieldSelector fieldsObject={fields} types={["number", "text", "barometer", "accelerometer", "magnetometer", "gyroscope", "pedometer"]} selectedField={independentVar} setSelectedField={setIndependentVar} />
                    </View> :
                    <View>
                        <Text>of data recordings over time.</Text>
                    </View>
                }
        </View>
    )
}