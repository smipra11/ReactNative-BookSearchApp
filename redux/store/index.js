import {createStore,combineReducers} from "redux"
import BooksReducer from "../reducer/BooksReducer"
const store = createStore(combineReducers({
    books: BooksReducer
}))

export default store