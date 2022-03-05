import React from 'react'
import { Dimensions, Text } from 'react-native';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
  } from "react-native-chart-kit";

  export default ({dataObject, chartType}) =>  {
      const screenWidth = Dimensions.get("window").width
      const chartConfig={
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
      }

      switch(chartType){
        case 'contribution':
            return (
                <ContributionGraph
                values={dataObject}
                endDate={new Date()}
                numDays={105}
                width={screenWidth}
                height={220}
                chartConfig={chartConfig}
                onDayPress={val => console.log(val)}
                />
            )
        case 'line': 
            return (
                <LineChart
                data={{
                  labels: dataObject.labels,
                  datasets: [
                    {
                      data: dataObject.data
                    }
                  ]
                }}
                width={screenWidth} // from react-native
                height={220}
                chartConfig={chartConfig}
              />
            )
        


      }

    return (
        <Text>Whoops! Something went wrong.</Text>
    )
}