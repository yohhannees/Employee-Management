import { createStore } from 'redux';

interface User {
  email: string;
  uid: string;
}

interface State {
  user: User | null;
}

// Define the initial state of the store
const initialState: State = {
  user: null,
};

// Define the reducer function to update the state
function rootReducer(state = initialState, action: { type: string; payload: User | null }) {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
}

// Create the Redux store
const store = createStore(rootReducer);

export default store;