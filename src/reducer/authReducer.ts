import { AuthAction } from "../auth/types";
const initialState = false;

export const authReducer = (
  state = initialState,
  action: AuthAction
): boolean => {
  switch (action.type) {
    case "LOGIN":
      return true;
    case "REGISTER":
      return true;
    default:
      return state;

  }
};