import React,{useState} from "react"
import {View,Text,StyleSheet,TextInput,FlatList} from 'react-native'
import {useSelector} from 'react-redux'


const BooksReadCount = () =>{

    
    const {booksRead} = useSelector(state =>state.books)  
    
    return(
        <View style={styles.container}>
          <Text style={{fontSize:18}}>{booksRead.length || 0}</Text>
        </View>
    )
    

    
}

export default BooksReadCount

const styles= StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }

})