import React,{useState} from "react"
import {View,Text,StyleSheet,TextInput,FlatList} from 'react-native'
import {useSelector} from 'react-redux'


const BooksReadingCount = () =>{

    
    const {booksReading} = useSelector(state =>state.books)  
    
    return(
        <View style={styles.container}>
          <Text style={{fontSize:18}}>{booksReading.length || 0}</Text>
        </View>
    )
    

    
}

export default BooksReadingCount

const styles= StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }

})