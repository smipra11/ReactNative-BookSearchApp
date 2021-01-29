import React from  'react'
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import PropTypes from 'prop-types'

const BookCount = ({count,title}) =>{
    return(
        <View style={{ flex: 1 ,alignItems:'center',justifyContent:'center'}}>
        <Text style = {{fontSize:20}}>{title}</Text>
    <Text>{count}</Text>
      </View>

    )

    BookCount.PropTypes ={
      count:PropTypes.number,
      title:PropTypes.string
    }

}
export default BookCount