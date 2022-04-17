import React, { useState } from 'react'
import { View, Dimensions, Text } from 'react-native';
import { useActionSheet } from '@expo/react-native-action-sheet';
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
    const { showActionSheetWithOptions } = useActionSheet();
    const [metric, setMetric] = useState();
    const [field, setField] = useState();

    const openActionSheet = (options: string[], handleSelect: (value: string) => void) => {
        const destructiveButtonIndex = 0;
        const cancelButtonIndex = options.length;
        showActionSheetWithOptions(
            {
              options,
              destructiveButtonIndex,
              cancelButtonIndex,
            },
            (buttonIndex) => {
                handleSelect(options[buttonIndex])
            }
          );
    }
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
                        <FieldSelector fieldsObject={fields} types={["number", "text", "barometer", "accelerometer", "magnetometer", "gyroscope", "pedometer"]} selectedField={dependentVar} setSelectedField={setDependentVar} />
                        <Text> over </Text>
                        <FieldSelector fieldsObject={fields} types={["number"]} selectedField={independentVar} setSelectedField={setIndependentVar}/>
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