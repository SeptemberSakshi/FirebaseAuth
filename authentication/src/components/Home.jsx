import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useUserAuth } from "../context/UserAuthContext";

const Home = () => {
  const { logOut, user } = useUserAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  const address = sessionStorage.getItem("address")
  return (
    <>
      <div className="p-4 box mt-3 text-center">
        Hello Welcome <br />
        {user && user.email }
        
        {console.log("email",user.email)}<br/>
        {user && address}
        
        {console.log("address",address)}
       
      </div>

      <div className="d-grid gap-2">
        
        <Button variant="primary" onClick={handleLogout}>
          Log out
        </Button>
      </div>
    </>
  );
};

export default Home;