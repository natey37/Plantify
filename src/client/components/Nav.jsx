// // Nav.js
import { Link } from "react-router-dom";
import "./Nav.css";
import logout from "@wasp/auth/logout.js";

// const Nav = ({ user }) => {
//   return (
//     <nav className='nav-container'>
//       <div className='logo'>Plantify</div>
//       <ul className='nav-links'>
//         <li>
//           <Link to='/plants'>Plants</Link>
//         </li>
//         <li>
//           <Link to='/categories'>Categories</Link>
//         </li>
//         <li>
//           <Link to='/notes'>Notes</Link>
//         </li>
//         <li>
//           <Link to='/watering-tasks'>Watering Schedule</Link>
//         </li>
//       </ul>
//       <div className='auth-buttons'>
//         {user ? <button onClick={logout} className='logout-btn'>Logout</button>
//         : <button className='login-btn'>Login</button>
//         }

//       </div>
//     </nav>
//   )
// }

// export default Nav

// Nav.js
const Nav = ({ user }) => {
  return (
    <nav className="nav-container">
      <div className="logo">Plantify</div>

      {/* {user ? (
            <ul className='nav-links'>
            <li>
                <a href='#plants'>Plants</a>
            </li>
            <li>
                <a href='#categories'>Categories</a>
            </li>
            <li>
                <a href='#notes'>Notes</a>
            </li>
            <li>
                <a href='#watering-tasks'>Watering Schedule</a>
            </li>
            </ul>
        ) : ( null )} */}
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
