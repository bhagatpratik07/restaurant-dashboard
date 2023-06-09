import { useState } from "react";
import { validateCredentials } from "../api/validateCredentials";
import Cookies from "js-cookie";
import "../styles/loginform.css";

type LoginFormProps = {
  onLoginSuccess: () => void;
};

export const LoginForm = ({ onLoginSuccess }: LoginFormProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isValid = await validateCredentials(username, password);

    if (isValid) {
      Cookies.set("loggedIn", "true");
      onLoginSuccess();
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="login-div">
        <h1>Login</h1>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && (
          <div style={{ color: "red", fontWeight: "bold" }}>{error}</div>
        )}
        <div>
          <button type="submit" className="form-btn">
            Login
          </button>
        </div>
      </div>
    </form>
  );
};
