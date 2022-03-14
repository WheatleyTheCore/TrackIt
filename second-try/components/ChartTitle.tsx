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

  //TODO store selectedField outside and pass in "onchange" prop

export default ({fields, chartType, setChartType, dependentVar, setDependentVar, independentVar, setIndependentVar}: props) =>  {
    return (
        <View>
            <Picker
                selectedValue={chartType}
                onValueChange={(value, index) => {
                    setChartType(value)
                }}>
                    <Picker.Item label="Line Chart" value="line" />
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
                        <FieldSelector fieldsObject={fields} types={["number", "text"]} selectedField={independentVar} setSelectedField={setIndependentVar}/>
                    </View> :
                    chartType == 'bar' ? 
                    <View>
                        <Text> of the distribution of recorded </Text>
                        <FieldSelector fieldsObject={fields} types={["text", "number"]} selectedField={independentVar} setSelectedField={setIndependentVar} />
                    </View> :
                    chartType == 'pie' ? 
                    <View>
                        <Text> of the distribution of recorded </Text>
                        <FieldSelector fieldsObject={fields} types={["text", "number"]} selectedField={independentVar} setSelectedField={setIndependentVar} />
                    </View> :
                    <View>
                        <Text>of data recordings over time.</Text>
                    </View>
                }
        </View>
    )
}