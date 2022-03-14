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

  export default ({chartType, entries, dependentVar, independentVar}) =>  {

      if (dependentVar == '') return <Text>Choose a valid dependent variable</Text>
      if (independentVar == '') return <Text>Choose a valid independent variable</Text>
      if (dependentVar == independentVar) return <Text>Dependent variable and independent variable cannot be the same</Text>

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
            let dates: any[] = []
            entries.map((entry: any) => {
            let entryDateObject = dates.find(dateObj => {
                let dateObjDate = new Date(dateObj.date).toDateString()
                let entryObjDate = new Date(entry.datetime_of_initial_submit).toDateString()
                console.log(`${entryObjDate}: ${dateObjDate == entryObjDate}`)
                return (dateObjDate == entryObjDate)
              })

              if (entryDateObject) {
                dates[dates.indexOf(entryDateObject)].count += 1;
              } else {
                let entryObect = {}
                entryObect.date = entry.datetime_of_initial_submit
                entryObect.count = 1
                dates.push(entryObect)
              }
            })

            return (
              <ContributionGraph
                values={dates}
                endDate={new Date()}
                numDays={105}
                width={screenWidth}
                height={220}
                chartConfig={chartConfig}
                onDayPress={val => console.log(val)}
                />
            )
        case 'line': 
            let dataObject = {}
            entries.map((entry: any) => {
              dataObject[entry[dependentVar]] = entry[independentVar]
            })

            const orderedData = Object.keys(dataObject).sort().reduce(
              (obj, key) => { 
                obj[key] = dataObject[key]; 
                return obj;
              }, 
              {}
            );

            const labels = Object.keys(orderedData)
            let data = []
            for (const label in orderedData) {
              data.push(orderedData[label])
            }

            return (

                <LineChart
                data={{
                  labels: labels,
                  datasets: [
                    {
                      data: data
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