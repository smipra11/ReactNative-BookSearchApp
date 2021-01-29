import React,{useState} from "react"
import {View,Text,StyleSheet,TextInput,FlatList} from 'react-native'
import ListItem from "../../components/ListItem"
import {useSelector, useDispatch} from 'react-redux'

const BookReadingScreen = () =>{
    const dispatch = useDispatch()
    const {booksReading} = useSelector(state =>state.books)

   const  renderItem = (item) =>{
       return <ListItem item ={item}/>

   }
    return(
        <View>
            <FlatList
          data={booksReading}
          renderItem={({ item }, index) => <ListItem item ={item} index={index}/>}
          keyExtractor={(item, index) => index.toString()} />
        </View>
    )

    
}

export default BookReadingScreen