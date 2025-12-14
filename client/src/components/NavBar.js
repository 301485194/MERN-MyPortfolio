import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Logo from "./Logo";

export default function NavBar() {
  const { user, signout } = useAuth();
  const navigate = useNavigate();

  const handleSignout = async () => {
    await signout();
    navigate("/signin");
  };

  if (!user) return null; // 🔥 HIDE NAVBAR BEFORE LOGIN

  return (
    <header className="nav">
      <Logo />
      <nav className="nav-links">
        <NavLink to="/home">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/projects">Projects</NavLink>
        <NavLink to="/services">Services</NavLink>
        <NavLink to="/contact">Contact</NavLink>

        <button onClick={handleSignout} className="signout-btn">
          Sign Out
        </button>
      </nav>
    </header>
  );
}
