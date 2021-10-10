import {
  createStore,
  combineReducers,
  applyMiddleware,
} from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";

import { chatReducer, userReducer } from "./reducers";

const reducers = combineReducers({
  chat: chatReducer,
  user: userReducer,
});

const middleware = composeWithDevTools(applyMiddleware(thunk));

const store = createStore(reducers, middleware);

export default store;
