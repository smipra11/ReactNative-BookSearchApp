import React,{useState} from "react"
import {View,Text,StyleSheet,TextInput,FlatList} from 'react-native'
import {useSelector, useDispatch} from 'react-redux'
import ListItem from "../../components/ListItem"

const BookReadScreen = () =>{

    const dispatch = useDispatch()
    const {booksRead} = useSelector(state =>state.books)
    return(
        <View>
           <FlatList
          data={booksRead}
          renderItem={({ item }, index) => <ListItem item ={item} index={index}/>}
          keyExtractor={(item, index) => index.toString()} />
        </View>
    )
        

    
}

export default BookReadScreen