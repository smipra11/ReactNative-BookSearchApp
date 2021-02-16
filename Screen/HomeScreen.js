import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList, TouchableOpacity, TextInput, AsyncStorage, Image } from 'react-native';
import BookCount from "../components/BookCount"
import { Ionicons } from '@expo/vector-icons'
import CustomActionButton from "../components/CustomActionButton"
import firebase from 'firebase'

import { snapshottoArray } from "../helpers/firebaseHelpers"
import ListItem from "../components/ListItem"
import { compose } from 'redux'
import { connectActionSheet, ActionSheetProvider } from '@expo/react-native-action-sheet'
import { useSelector, useDispatch } from 'react-redux'
import Swipeout from "react-native-swipeout"
import { connect } from 'react-redux'
import { useActionSheet } from '@expo/react-native-action-sheet'
import * as ImageHelpers from "../helpers/ImageHelper"


const HomeScreen = (props) => {
  const [totalCount, settotalCount] = useState(0)
  const [readingCount, setreadingCount] = useState(0)
  const [readCount, setreadCount] = useState(0)
  const [isnewbookVisible, setisnewbookVisible] = useState(false)
  const [textInputData, settextInputData] = useState("")
  //const [books, setBooks] = useState([])
  const [booksReading, setbooksReading] = useState([])
  const [booksRead, setbooksRead] = useState([])
  const [currentUser, setcurrentUser] = useState([])

  const user = props.navigation.getParam('user')
  const someRef = useRef(null)

  const clear = () => {
    someRef.current.clear();
  }

  console.log("user is " + user.uid)
  const { showActionSheetWithOptions } = useActionSheet();

  const dispatch = useDispatch()

  const loadbooks = books => ({
    type: 'LOAD_BOOKS_FROM_SERVER', payload: books
  })

  const addBook = book => ({
    type: 'ADD_BOOK', payload: book
  })

  const markBooksAsRead = book => ({
    type: 'MARK_BOOK_AS_READ', payload: book
  })
  const markBooksAsUnRead = book => ({
    type: 'MARK_BOOK_AS_UNREAD', payload: book

  })
  const deletethisBook = book => ({
    type: 'DELETE_BOOK', payload: book
  })
  const updateBookImage = book => ({
    type: 'UPDATE_BOOK_IMAGE', payload: book
  })
  //const user = useSelector(state => state.auth.currentUser);
  const { books } = useSelector(state => state.books)
  useEffect(() => {

    async function fetchbook() {




      const data = await firebase.database().ref('users').child(user.uid).once('value')
      let mydata = data.val();

      let myuser = user.uid
      const totalbooks = await firebase.database().ref('books').child(user.uid).once('value')
      console.log("books are " + totalbooks)
      const booksArr = snapshottoArray(totalbooks)
      console.log(booksArr)




      dispatch(loadbooks(booksArr))
      console.log("BooksArr is " + booksArr)


      console.log("current user we  is " + currentUser)


    }


    fetchbook();



  }, [dispatch])




  const handleaddBook = async book => {

    //someRef.current.setNativeProps({text:""})
    someRef.current.setNativeProps({ text: "" })


    try {

      const snapshot = await firebase.database().
        ref('books').child(user.uid)
        .orderByChild('name')
        .equalTo(book)
        .once('value', (snapshot) => {
          console.log("snapshot is " + snapshot.val())

          if (snapshot.exists()) {
            alert(' exits')
          }
          else {

            const key = firebase.database().ref('books').
              child(user.uid).push().key

            console.log(key)



            const response = firebase.database()
              .ref('books')
              .child(user.uid)
              .child(key)
              .set({ name: book, read: false })
            console.log("response is " + response)



          }
        })


      dispatch(addBook({ name: book, read: false }))


    } catch (error) {
      console.log(error)

    }


  }


  const hideaddnewBook = () => {
    setisnewbookVisible(!isnewbookVisible)

  }

  const markasRead = async (selectedbook, index) => {

    try {
      await firebase.database().ref('books').child(user.uid)
        .child(selectedbook.key).update({ read: true })

      dispatch(markBooksAsRead(selectedbook))

    }

    catch (error) {
      console.log(error)
    }



  }


  const markasUnread = async (selectedbook, index) => {

    try {
      await firebase.database().ref('books').child(user.uid)
        .child(selectedbook.key).update({ read: false })

      dispatch(markBooksAsUnRead(selectedbook))

    } catch (error) {
      console.log(error)

    }
  }

  const deleteBook = async (selectedbook, index) => {
    try {
      await firebase.database().ref('books').child(user.uid)
        .child(selectedbook.key).remove();

      dispatch(deletethisBook(selectedbook))

    } catch (error) {
      console.log(error)

    }
  }



  uploadImage = async (image, selectedbook) => {
    const ref = firebase
      .storage()
      .ref("books")
      .child(user.uid)
      .child(selectedbook.key);

    try {
      //converting to blob
      const blob = await ImageHelpers.prepareblob(image.uri);
      const snapshot = await ref.put(blob);

      let downloadUrl = await ref.getDownloadURL();

      await firebase
        .database()
        .ref("books")
        .child(user.uid)
        .child(selectedbook.key)
        .update({ image: downloadUrl });



      return downloadUrl;
    } catch (error) {
      console.log(error);
    }
  };



  openImageLibrary = async selectedbook => {
    const result = await ImageHelpers.openImageLibrary();

    if (result) {

      const downloadUrl = await uploadImage(result, selectedbook);
      updateBookImage({ ...selectedbook, uri: downloadUrl })

    }
  };

  openCamera = async selectedbook => {
    const result = await ImageHelpers.openCamera();

    if (result) {

      const downloadUrl = await uploadImage(result, selectedbook);
      updateBookImage({ ...selectedbook, uri: downloadUrl })

    }
  };


  addBookImage = selectedbook => {
    // Same interface as https://facebook.github.io/react-native/docs/actionsheetios.html
    const options = ["Select from Photos", "Camera", "Cancel"];
    const cancelButtonIndex = 2;
    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex
      },
      buttonIndex => {
        // Do something here depending on the button index selected
        if (buttonIndex == 0) {
          openImageLibrary(selectedbook);
        } else if (buttonIndex == 1) {
          openCamera(selectedbook);
        }
      }
    );
  };








  const renderitem = (item, index) => {
    let swipeoutButton = [
      {
        text: "Delete",
        component: (
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Ionicons name='md-trash' size={24} color="white" />
          </View>
        ),
        backgroundColor: "red",
        onPress: () => deleteBook(item, index)

      }
    ]

    if (!item.read) {
      swipeoutButton.unshift({
        text: "Mark as Read",
        component: (
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Text style={{ color: 'white' }}>Mark as Read</Text>
          </View>
        ),
        backgroundColor: "#3c6E47DA",
        onPress: () => markasRead(item, index)


      })
    }
    else {
      swipeoutButton.unshift({
        text: "Mark as Read",
        component: (
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Text style={{ color: 'white' }}>Mark Unread</Text>
          </View>
        ),
        backgroundColor: "#436E81",
        onPress: () => markasUnread(item, index)


      })

    }




    return (
      <Swipeout
        style={{ marginHorizontal: 5, marginVertical: 5 }}
        backgroundColor="#354D58DA"
        right={swipeoutButton}>

        < ListItem
          onPress={() => addBookImage(item)}
          editable={true} item={item} >
          {
            item.read && (
              <Ionicons name="md-checkmark" color="black" size={30} />
            )
          }

        </ListItem >
      </Swipeout>
    )
  }




  //setisnewbookVisible(!isnewbookVisible)

  return (
    <View style={{ flex: 1, backgroundColor: '#354D58DA' }}>
      <SafeAreaView />




      <View style={{ flex: 1 }}>
        <View style={{ height: 50, flexDirection: 'row', margin: 5 }} >
          <TextInput
            onChangeText={(text) => settextInputData(text)} style={{ flex: 1, fontSize: 22, color: 'white', backgroundColor: 'transparent' }}
            placeholder="Enter  Book  Name"
            ref={someRef}
            value={textInputData} />
        </View>




        <FlatList
          data={books}
          renderItem={({ item }, index) => renderitem(item, index)}
          keyExtractor={(item, index) => index.toString()} />



        {textInputData.length > 0 ? (
          <TouchableOpacity
            onPress={() => { }}
            style={{ position: "absolute", bottom: 100, right: 20 }}>
            <View style={{ width: 50, height: 50, borderRadius: 25, backgroundColor: "#AAD1E6", alignItems: 'center', justifyContent: 'center' }}>
              <CustomActionButton onPress={() => { handleaddBook(textInputData) }}>
                <Text style={{ color: 'white', fontSize: 25 }}  >+</Text>
              </CustomActionButton>
            </View>
          </TouchableOpacity>
        ) : null}

      </View>


      <SafeAreaView />
    </View>
  );
}


export default connect(
  connectActionSheet
)(HomeScreen)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagecontainer: {
    height: 70,
    width: 70,
    marginLeft: 10,
    backgroundColor: '#354D58DA'
  }

});


