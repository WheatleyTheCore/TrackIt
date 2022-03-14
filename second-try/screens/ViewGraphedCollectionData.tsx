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
import DynamicGraph from '../components/DynamicGraph';
import ChartTitle from '../components/ChartTitle';

//this page only really works if there's numeric data, otherwise a contribution graph is the only thing that works.

export default ({navigation}) => {

    const context = useContext(AppDataContext)

    const [chartType, setChartType] = useState('contribution')
    const [dependentVar, setDependentVar] = useState('') //have this be set automatically somehow
    const [independentVar, setIndependentVar] = useState('')

    
    
    const [schema, setSchema] = useState()
    const [entries, setEntries] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    //TODO update entries when one is added

    useEffect(() => {
        setTimeout(() => {
            setSchema([...context?.currentCollection.entrySchema])
            setEntries([...context?.currentCollection.entries]) //wait for context to update and set the data. This is a hack, and will (hopefully) be fixed later
            setIsLoading(false)
        }, 300)
      
  }, [isLoading])

    if (isLoading) {
        return (
            <Text>Loading...</Text>
        )
    }

    // let chartData = {x: [], y: []}

    // entries.map(i => {
    //     chartData.x.push(i.x)
    //     chartData.y.push(i.y)
    // })

    //TODO update contribution map to update count for commits on same day 
    const getSubmissionDateData = () => {
      let data: any = []
      entries.map((entry: any) => {
        let entryObect = {}
        entryObect.date = entry.datetime_of_initial_submit
        entryObect.count = 1
        data.push(entryObect)
      })
      return data
    }

    const getDataLablels = () => {
      const labels: any[] = []
      entries.map(entry => {
        labels.push(entry[dependentVar])
      })
      console.log(`labels: ${labels}`)
      return labels
    }

    const getDataValues = () => {
      const data: any[] = []
      entries.map(entry => {
        data.push(entry[independentVar])
      })
      console.log(`data: ${data}`)
      return data
    }

    // console.log(new Date(entries[0].datetime_of_initial_submit).toString())

    // console.log(context?.currentCollection)

    return (
        <View>
            <ChartTitle 
                fields={schema} 
                chartType={chartType} 
                setChartType={setChartType} 
                dependentVar={dependentVar} 
                setDependentVar={setDependentVar}
                independentVar={independentVar}
                setIndependentVar={setIndependentVar}
            />
              <DynamicGraph chartType={chartType} entries={entries} dependentVar={dependentVar} independentVar={independentVar} />
        </View>
    )
}