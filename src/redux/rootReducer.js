import { combineReducers } from "redux";
import { authorReducer } from "./authorReducer";
import { bookReducer } from "./bookReducer";

export const rootReducer = combineReducers({
    books: bookReducer,
    author: authorReducer
})