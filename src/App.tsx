import "./App.css";
import { LoginForm } from "./components/LoginForm";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Bookmark from "./pages/Bookmark";
import NavBar from "./components/NavBar";

function App() {
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
            <NavBar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/bookmark" element={<Bookmark />} />
            </Routes>

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
