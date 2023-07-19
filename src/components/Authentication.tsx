
import { Provider } from "react-redux";
import { store } from "../store/store";
import Login from "./Login";
import Register from "./Register";

const Authentication = () => {
  return (
    <Provider store={store}>
      <div>
        <Login />
        <Register />
      </div>
    </Provider>
  );
};

export default Authentication;
