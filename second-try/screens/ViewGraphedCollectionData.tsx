import React, {useState, useEffect, useContext} from 'react'
import {View, SafeAreaView, Text} from 'react-native'
import { Picker } from '@react-native-picker/picker';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
  } from "react-native-chart-kit";
import { AppDataContext } from '../DataMgmt/AppDataContext';
import { flingGestureHandlerProps } from 'react-native-gesture-handler/lib/typescript/handlers/FlingGestureHandler';

//this page only really works if there's numeric data, otherwise a contribution graph is the only thing that works.

export default ({navigation}) => {
    const [chartType, setChartType] = useState('contribution')
    const [dependentVar, setDependentVar] = useState('')
    const [independentVar, setIndependentVar] = useState('')

    const context = useContext(AppDataContext)

    //console.log(context?.currentCollection)

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
                    <Picker.Item label="Progress Chart" value="progress" />
                    <Picker.Item label="Contribution Graph" value="contribution" />
                    <Picker.Item label="Stacked Bar Chart" value="stackedBar" />
                </Picker>
            {chartType != 'contribution' ? 
            <View>
                <Text>Dependent Variable</Text>
                <Picker
                selectedValue={dependentVar}
                onValueChange={(value, index) => {
                    setDependentVar(value)
                }}>
                    {context?.currentCollection.entrySchema.map((field: any) => {
                        return <Picker.Item label={field.name} value={field.name} />
                    })}
                </Picker> 
                <Text>Independent Variable</Text>
                <Picker
                selectedValue={independentVar}
                onValueChange={(value, index) => {
                    setIndependentVar(value)

                }}>
                    {context?.currentCollection.entrySchema.map((field: any) => {
                        return <Picker.Item label={field.name} value={field.name} />
                    })}
                </Picker>

                
            </View>
            :
            null}
            <Text>Graphed data goes here</Text>
        </View>
    )
}