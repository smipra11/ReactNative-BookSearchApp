import React,{useState} from "react"
import {View,Text,StyleSheet,TextInput,FlatList} from 'react-native'
import {useSelector} from 'react-redux'


const BooksCountContainer = ({type}) =>{

    
    const {books,booksRead} = useSelector(state =>state.books) 
    const newbook = books 
    
    //console.log( "booksarrya is  " + props.books.length)
    
    return(
        <View style={styles.container}>
          <Text>{books.length }</Text>
        </View>
    )
    

    
}

export default BooksCountContainer

const styles= StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }

})