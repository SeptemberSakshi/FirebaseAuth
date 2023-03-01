import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useUserAuth } from "../context/UserAuthContext";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address,setAddress] = useState("");
  const [mobile,setMobile] = useState(" ");
  const [error, setError] = useState("");
  const { signUp } = useUserAuth();
  let navigate = useNavigate();

  console.log(address);
  sessionStorage.setItem("address", address);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signUp(email, password, address, mobile);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

//   const postData = async (e) => {
//          e.preventDefault();

//     const response = await fetch("https://fir-authentication-cb112-default-rtdb.firebaseio.com/gstscannerdb.json",
//     {
//        method : "POST",
//        headers : {
//         "Content-Type":"authentication/json"
//        },
//        body:JSON.stringify({
//         email,
//         password,
//         mobile,
//         address

//        })

//          })
    
//   }

  return (
    <>
      <div className="p-4 box">
        <h2 className="mb-3">GST SCANNER : SIGNUP</h2>
        {error && <Alert variant="danger">{error}</Alert>}


        {/* Caling handleSubmit function at the top of form */}

        <Form onSubmit={handleSubmit} method="POST">  
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="email"
              name="email"
              
              placeholder="Email address"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              type="password"
              name="password"           
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              type="mobile"
              name="mobile"
              placeholder="Mobile Number"
              onChange={(e) => setMobile(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              type="address"
              name="address "
             
              placeholder="Address"
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </Form.Group>

          <div className="d-grid gap-2">
            <Button variant="primary" type="Submit" >
              Sign up
            </Button>
          </div>
        </Form>
      </div>
      <div className="p-4 box mt-3 text-center">
        Already have an account? <Link to="/">Log In</Link>
      </div>
    </>
  );
};

export default Signup;