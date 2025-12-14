import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Signin = () => {
  const { signin } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await signin(form.email, form.password);
      navigate("/home");
    } catch (err) {
      console.error(err);
      setError(err.message || "Invalid email or password");
    }
  };

  return (
    <div className="page signin-page">
      <h1>Sign In</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit} className="auth-form">
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Sign In</button>
      </form>

      <p>
        Don&apos;t have an account? <Link to="/signup">Sign up</Link>
      </p>
    </div>
  );
};

export default Signin;
