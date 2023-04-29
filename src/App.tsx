import "./App.css";
import { LoginForm } from "./components/LoginForm";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Bookmark from "./pages/Bookmark";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

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
      {isLoggedIn ? (
        <div className="container">
          <div className="navbar">
            <NavBar />
          </div>
          <div className="content">
            <div>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/bookmark" element={<Bookmark />} />
              </Routes>
            </div>
            <button onClick={handleLogout}>Logout</button>
          </div>
        </div>
      ) : (
        <>
          <LoginForm onLoginSuccess={handleLoginSuccess} />
          <Footer />
        </>
      )}
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
