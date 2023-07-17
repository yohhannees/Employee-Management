import { createStore } from 'redux';

export interface AuthState {
  user: firebase.User | null;
  loading: boolean;
  error: string | null;
}

export interface AppState {
  auth: AuthState;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

function authReducer(state = initialState, action: any): AuthState {
  switch (action.type) {
    case 'AUTH_LOADING':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'AUTH_SUCCESS':
      return {
        ...state,
        user: action.payload,
        loading: false,
        error: null,
      };
    case 'AUTH_ERROR':
      return {
        ...state,
        user: null,
        loading: false,
        error: action.payload,
      };
    case 'AUTH_LOGOUT':
      return {
        ...state,
        user: null,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
}

const store = createStore(authReducer);

export default store;