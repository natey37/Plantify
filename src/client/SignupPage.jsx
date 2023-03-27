import { Link } from "react-router-dom";
import "./SignupPage.css";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import SignupForm from "@wasp/auth/forms/Signup";

const SignupPage = () => {
  return (
    <div className="signup-container">
      <Nav />
      <div className="signup-page">
        <div className="signup-modal">
          <h1 className="signup-title">Sign Up for Plantify!</h1>
          <SignupForm />
          <br />
          <span className="login-link">
            I already have an account (<Link to="/login">go to login</Link>).
          </span>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SignupPage;
