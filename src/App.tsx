import "./App.css";
import { useEffect } from "react";
import { validateCredentials } from "./api/validateCredentials";

function App() {
  useEffect(() => {
    async function testValidation() {
      const username = "user1";
      const password = "password1";
      const isValid = await validateCredentials(username, password);
      console.log(`Credentials are ${isValid ? "valid" : "invalid"}`);
    }

    testValidation();
  }, []);

  return (
    <>
      <h1>Hello World</h1>
    </>
  );
}

export default App;
