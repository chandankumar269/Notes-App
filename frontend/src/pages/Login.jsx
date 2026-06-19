import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";

function Login() {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [error, setError] = useState("");

const navigate = useNavigate();

const submitHandler = async (e) => {
e.preventDefault();
setError("");


try {
  const res = await API.post("/auth/login", {
    email,
    password,
  });

  localStorage.setItem("token", res.data.token);
  localStorage.setItem("name", res.data.name);

  navigate("/notes");
} catch (err) {
  setError(
    err.response?.data?.message ||
    "Something went wrong"
  );
}


};

return ( <div className="auth-container"> <form className="auth-card" onSubmit={submitHandler}> <h1 className="app-title">📝 Notes App</h1> <h2>Login</h2>

    <input
      type="email"
      placeholder="Email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      required
    />

    <input
      type="password"
      placeholder="Password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      required
    />

    {error && (
      <p className="error-message">
        {error}
      </p>
    )}

    <button type="submit">
      Login
    </button>

    <p className="auth-switch">
      Don't have an account?
      <Link to="/register" className="auth-link">
        Register
      </Link>
    </p>
  </form>
</div>

);
}

export default Login;
