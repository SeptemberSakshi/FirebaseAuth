// import React from "react";
// import { Button } from "react-bootstrap";
// import { useNavigate } from "react-router";
// import { useUserAuth } from "../context/UserAuthContext";


// const Home = () => {
//   const { logOut, user } = useUserAuth();
//   const navigate = useNavigate();

 
//   const handleLogout = async () => {
//     try {
//       await logOut();
//       navigate("/");
//     } catch (error) {
//       console.log(error.message);
//     }
//   };
//   return (
//     <>
//       <div className="p-4 box mt-3 text-center">
//         Hello Welcome <br />
//         {user && user.email}
//       </div>
//       <div className="d-grid gap-2">
//         <Button variant="primary" onClick={handleLogout}>
//           Log out
//         </Button>
//       </div>
//     </>
//   );
// };

// export default Home;

import React, {useState } from "react";
import { Link } from "react-router-dom";
import "./Styles/Navbar.css";
import { Button } from "./Button";
import { Card } from "react-bootstrap";
import UserTable from "./Table/UserTable";

const Home =() => {
  const [button, setButton] = useState(true);
  console.log("button", button);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else setButton(true);
  };

  window.addEventListener("resize", () => {
    showButton();
  });

  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  
  return (
    <>
    <Card>
    <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
           GST SCANNER
            <i class="fab fa-typo3" />
          </Link>
          <div className="menu-icon" onClick={handleClick} style={{border:"2px solid red",height:"10px",width:"20px"}}>
            <i className={click ? "fas fa-times" : "fas fa-bars"} />
          </div>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/services"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Services
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/products"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Products
              </Link>
            </li>

            <li>
              <Link
                to="/PhoneSignUp"
                className="nav-links-mobile"
                onClick={closeMobileMenu}
              >
                Sign Up
              </Link>
            </li>
          </ul>
          {button && <Button buttonStyle="btn--outline">SIGN UP</Button>}
        </div>
      </nav><br/>
      <UserTable/>
    </Card>
    
    </>
  );
}

export default Home;