import { createStore, combineReducers } from "@reduxjs/toolkit";
import { composeWithDevTools } from "redux-devtools-extension";

import { messagesReducer } from "./reducers";

const reducers = combineReducers({
  messages: messagesReducer,
});

const store = createStore(reducers, composeWithDevTools());

export default store;
