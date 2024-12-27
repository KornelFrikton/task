import React, { useState } from "react";
import "./App.css";
import axios from "axios";
import logo from "./logo.png";

function App() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLogged, setIsLogged] = useState(false);

  const loggedField = isLogged ? "loggedField" : "hiddenField";

  const loginField = isLogged ? "hiddenField" : "loginField";

  const API_URL = "http://localhost:4000/";

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      const response = await axios.post(API_URL, { user, password });
      console.log("Login successful:", response.data);
      alert("Login successful!");
      setIsLogged(true);
    } catch (err) {
      console.error("An error occurred during login", err.message);
      setError("Invalid username or password");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    setIsLogged(false);
    setUser("");
    setPassword("");
    alert("Logged out successfully!");
  };

  const backgroundStyle = {
    backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.7)), url(${logo})`,
  };

  return (
    <div>
      <div className="App">
        <div className={loginField} style={backgroundStyle}>
          <form onSubmit={handleLogin}>
            <h1>Sign In</h1>
            <div>
              <input
                value={user}
                onChange={(e) => setUser(e.target.value)}
                type="text"
                className="inputField"
                id="user"
                placeholder="Username"
                required
              />
            </div>
            <div>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="text"
                className="inputField"
                id="password"
                placeholder="Password"
                required
              />
            </div>

            <button type="submit" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>

        <div className={loggedField} style={backgroundStyle}>
          <form onReset={handleLogout}>
            <div>
              <h1>Hello</h1>
              <div className="user">{user}!</div>
              <div>
                <button type="reset">Logout</button>
              </div>
            </div>
          </form>
        </div>
      </div>
      {error && <div className="error">{error}</div>}
    </div>
  );
}

export default App;
