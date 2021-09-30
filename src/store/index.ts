import { createStore, combineReducers } from "@reduxjs/toolkit";
import { composeWithDevTools } from "redux-devtools-extension";

import { reducer } from "./reducers";

const reducers = combineReducers({
  reducer: reducer,
});

const store = createStore(reducers, composeWithDevTools());

export default store;
