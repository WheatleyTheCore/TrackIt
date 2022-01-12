import React, { useState } from "react"
import {Text, FlatList} from 'react-native'
import ListItem from './ListItem'

//TODO add interface for this one

export default (props:any) =>  {
    return (
        <FlatList data={props.listData} renderItem={({index, item}) => {
            return (
            <ListItem index={index} key={index}
            item={item} 
            clickHandler={() => console.log("clickhandler ran!")} 
            deleteFunction={() => console.log("delete function ran!")} />
            )
        }} />
    )
}