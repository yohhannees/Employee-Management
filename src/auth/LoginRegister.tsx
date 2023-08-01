import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../store/userSlice";
import firebase from "../firebase/firebase";
import { TextInput, Button, Group, Radio, Paper } from "@mantine/core";

const LoginRegister: React.FC = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [confirmationMessage, setConfirmationMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      let userCredential;

      if (isLogin) {
        userCredential = await firebase
          .auth()
          .signInWithEmailAndPassword(email, password);
        setConfirmationMessage("Login successful");
      } else {
        userCredential = await firebase
          .auth()
          .createUserWithEmailAndPassword(email, password);
        setConfirmationMessage("Registration successful");
      }

      dispatch(login(userCredential.user!.uid));
      setValidationErrors([]);
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error(error);
      setConfirmationMessage("");
      setValidationErrors(["Authentication failed"]);
    }
  };

  const validateForm = () => {
    const errors: string[] = [];

    if (!email) {
      errors.push("Email is required");
    }

    if (!password) {
      errors.push("Password is required");
    }

    if (password.length < 6) {
      errors.push("Password must be at least 6 characters long");
    }

    setValidationErrors(errors);

    return errors.length === 0;
  };

  const handleRadioChange = (e: any) => {
    setIsLogin(e.target.value === "login");
    setValidationErrors([]);
    setConfirmationMessage("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={handleSubmit} className="w-96">
          {isLogin ? (
            <h1 className="text-2xl font-bold mb-4">Login</h1>
          ) : (
            <h1 className="text-2xl font-bold mb-4">Register</h1>
          )}

          <Group position="center">
            <Radio
              label="Login"
              value="login"
              color="green"
              checked={isLogin}
              onChange={handleRadioChange}
            />
            <Radio
              label="Register"
              value="register"
              color="green"
              checked={!isLogin}
              onChange={handleRadioChange}
            />
          </Group>
          <TextInput
            label="Email"
            name="email"
            color="green"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-4 border-green-500"
          />
          <TextInput
            label="Password"
            name="password"
            type="password"
            color="green"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-4 border-green-500"
          />
          <Button
            type="submit"
            variant="outline"
            color="green"
            className="mt-4"
          >
            {isLogin ? "Login" : "Register"}
          </Button>
          {validationErrors.length > 0 && (
            <ul className="text-red-500">
              {validationErrors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          )}
          {confirmationMessage && (
            <p className="text-green-500">{confirmationMessage}</p>
          )}
          {isLogin ? (
            <p className="mt-4">
              Don't have an account?{" "}
              <a
                href="#"
                onClick={() => setIsLogin(false)}
                className="text-green-500 hover:underline"
              >
                Register here
              </a>
            </p>
          ) : (
            <p className="mt-4">
              Already have an account?{" "}
              <a
                href="#"
                onClick={() => setIsLogin(true)}
                className="text-green-500 hover:underline"
              >
                Login here
              </a>
            </p>
          )}
        </form>
      </Paper>
    </div>
  );
};

export default LoginRegister;
