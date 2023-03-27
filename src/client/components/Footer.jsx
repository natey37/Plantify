import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-left">
          <p>
            &copy; {new Date().getFullYear()} Plantify. All rights reserved.
          </p>
        </div>
        <div className="footer-right">
          <ul>
            <li>
              <a href="#terms-of-service">Terms of Service</a>
            </li>
            <li>
              <a href="#privacy-policy">Privacy Policy</a>
            </li>
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a href="#support">Support</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
