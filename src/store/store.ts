import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { rootReducer } from "../reducer/rootReducer";

export const store = createStore(
  combineReducers({ isLoggedIn: rootReducer }),
  applyMiddleware(thunk)
);