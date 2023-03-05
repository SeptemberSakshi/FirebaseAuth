import React from 'react';
import { Form, Alert,Button } from "react-bootstrap";
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import { useState } from 'react';
import { Link ,useNavigate} from 'react-router-dom';
import { useUserAuth } from '../context/UserAuthContext';


 const PhoneSignUp = () => {

    const [number,setNumber] = useState("");
    const [error, setError] = useState("");
    const [otp,setOtp] = useState("");
    const [confirmObj,setConfirmObj] = useState();
    const [flag,setFlag] = useState(false);
    const {setUpRecaptcha} = useUserAuth();
    const navigate = useNavigate();
   

    const getOtp= async (e) => {
        e.preventDefault();
        if(number === "" || number=== undefined) return setError("Please Enter a valid Phone Number");
        try{
            const response = await setUpRecaptcha(number);
            console.log('response otp',response);
            setConfirmObj(response);
            setFlag(true);
            await postData();  //sending the data in firbase database 
        }
        catch(err){
            setError(err.message);
        }
       console.log(number)


    }

    const verifyOtp = async (e)=> {
       e.preventDefault();

       console.log(otp);
       if(otp === "" || otp === null) return;
       try{
        setError(" ");
        await confirmObj.confirm(otp);
        navigate("/Home")
       }catch(err){
        setError(err.message);
       }
    }

   const postData = async (e) => {
         e.preventDefault();

    const response = await fetch("https://fir-authentication-cb112-default-rtdb.firebaseio.com/gstscannerdb.json",
    {
       method : "POST",
       headers : {
        "Content-Type":"authentication/json"
       },
       body:JSON.stringify({
          number
       })

         })
    
  }



  return (
   <>
    <div className="p-4 box">
        <h2 className="mb-3">LOGIN WITH PHONE</h2>
        {error && <Alert variant="danger">{error}</Alert>}

     <Form onSubmit={getOtp} style={{display: !flag ? "block":"none"}}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
          <PhoneInput
              defaultCountry="IND"
              placeholder="Enter Phone Number"
              value={number}
              onChange={setNumber}/><br/>
            <div id="recaptcha-container"/>
          </Form.Group>

          <div className='button-right'>
            <Link to="/">
            <Button variant="secondry" >Cancel</Button> &nbsp;
            </Link>
           
            <Button variant="primary" type="submit">
                Send OTP
            </Button>
            
             </div>

          </Form>

          <Form onSubmit={verifyOtp} style={{display: flag ? "block":"none"}}>
          <Form.Group className="mb-3" controlId="formBasicotp">
          
          <Form.Control
            tyep="text"
            placeholder="Enter OTP"
            onChange={(e)=>setOtp(e.target.value)}>
          </Form.Control>

          </Form.Group>

          <div className='button-right'>
            <Link to="/">
            <Button variant="secondry" >Cancel</Button> &nbsp;
            </Link>
           
            <Button variant="primary" type="submit">
                Verify OTP
            </Button>
            
             </div>

          </Form>



          </div>

   </>
  )
}

export default PhoneSignUp;