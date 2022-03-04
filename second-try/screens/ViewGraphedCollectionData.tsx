import React, {useState, useEffect, useContext} from 'react'
import {View, SafeAreaView, Text, Dimensions} from 'react-native'
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
    

    let chartData = {x: [], y: []}

    context?.currentCollection.entries.map(i => {
        chartData.x.push(i.x)
        chartData.y.push(i.y)
    })

    console.log(chartData)

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
              <LineChart
    data={{
      labels: chartData.x,
      datasets: [
        {
          data: chartData.y
        }
      ]
    }}
    width={Dimensions.get("window").width} // from react-native
    height={220}
    yAxisLabel="$"
    yAxisSuffix="k"
    yAxisInterval={1} // optional, defaults to 1
    chartConfig={{
      backgroundColor: "#e26a00",
      backgroundGradientFrom: "#fb8c00",
      backgroundGradientTo: "#ffa726",
      decimalPlaces: 2, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 16
      },
      propsForDots: {
        r: "6",
        strokeWidth: "2",
        stroke: "#ffa726"
      }
    }}
    bezier
    style={{
      marginVertical: 8,
      borderRadius: 16
    }}
  />
        </View>
    )
}