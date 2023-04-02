import { Link } from "react-router-dom";
import "./LoginPage.css";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import LoginForm from "@wasp/auth/forms/Login";
const LoginPage = () => {
  return (
    <div className="login-container">
      <Nav />
      <div className="login-page">
        <div className="login-modal">
          <h1 className="login-title">Login</h1>
          <LoginForm />
          <br />
          <span className="signup-link">
            I don't have an account yet (<Link to="/signup">go to signup</Link>
            ).
          </span>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LoginPage;
