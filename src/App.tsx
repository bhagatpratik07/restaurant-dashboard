import "./App.css";
import { LoginForm } from "./components/LoginForm";
import { useState } from "react";

function App() {
  // TEST VALIDATION -> RETURNS BOOLEAN
  // useEffect(() => {
  //   async function testValidation() {
  //     const username = "user1";
  //     const password = "password1";
  //     const isValid = await validateCredentials(username, password);
  //     console.log(`Credentials are ${isValid ? "valid" : "invalid"}`);
  //   }
  //   testValidation();
  // }, []);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };
  return (
    <>
      <div>
        {isLoggedIn ? (
          <div>
            <h1>Hello World</h1>
            <button onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <LoginForm onLoginSuccess={handleLoginSuccess} />
        )}
      </div>
    </>
  );
}

export default App;
