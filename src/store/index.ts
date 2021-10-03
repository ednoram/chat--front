import { createStore, combineReducers } from "@reduxjs/toolkit";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";

import { chatReducer } from "./reducers";

const reducers = combineReducers({
  chat: chatReducer,
});

const store = createStore(reducers, composeWithDevTools());

export default store;
