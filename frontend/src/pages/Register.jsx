import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    await API.post("/auth/register", {
      name,
      email,
      password,
    });

    navigate("/");
  };

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={submitHandler}>
        
        <h1 className="app-title">
          📝 Notes App
        </h1>

        <h2>Create Account</h2>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button type="submit">
          Register
        </button>

        <p className="auth-switch">
          Already have an account?
          <Link
            to="/"
            className="auth-link"
          >
            Login
          </Link>
        </p>

      </form>
    </div>
  );
}

export default Register;