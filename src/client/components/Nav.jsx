// // Nav.js
import { Link } from "react-router-dom";
import "./Nav.css";
import logout from "@wasp/auth/logout.js";

const Nav = ({ user }) => {
  return (
    <nav className="nav-container">
      <div className="logo">Plantify</div>
      <div className="auth-buttons">
        <div className="auth-buttons">
          {user ? (
            <button onClick={logout} className="logout-btn">
              Logout
            </button>
          ) : (
            <Link to="/login">
              <button className="login-btn">Login</button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
