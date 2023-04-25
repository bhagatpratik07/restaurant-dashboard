import { useState } from "react";
import { validateCredentials } from "../api/validateCredentials";

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
      onLoginSuccess();
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <button type="submit">Login</button>
      </div>
      {error && <div>{error}</div>}
    </form>
  );
};
