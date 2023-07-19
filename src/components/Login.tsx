import { useContext, useState } from "react";
import { auth } from "../firebase/firebase";
import { AuthContext } from "../auth/auth-context";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setIsLoggedIn } = useContext(AuthContext);

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => setIsLoggedIn(true))
      .catch((error) => console.log(error));
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
