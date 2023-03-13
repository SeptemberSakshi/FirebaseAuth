import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert } from "react-bootstrap";
import Button from '@mui/material/Button';
import "react-phone-number-input/style.css";
import { useUserAuth } from "../context/UserAuthContext";
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// import Card from '@mui/material/Card';

const theme = createTheme();

const PhoneSignUp = () => {
  const [error, setError] = useState("");
  const [number, setNumber] = useState("");
  const [flag, setFlag] = useState(false);
  const [otp, setOtp] = useState("");
  const [result, setResult] = useState("");
  const { setUpRecaptha } = useUserAuth();
  const navigate = useNavigate();

  const getOtp = async (e) => {
    e.preventDefault();
    console.log(number);
    setError("");
    if (number === "" || number === undefined)
      return setError("Please enter a valid phone number!");
    try {
      const response = await setUpRecaptha(number);
      setResult(response);
      setFlag(true);
    } catch (err) {
      setError(err.message);
    }
  };

  const verifyOtp = async (e) => {
    e.preventDefault();
    setError("");
    if (otp === "" || otp === null) return;
    try {
      await result.confirm(otp);
      await postData(e);
      navigate("/home");
    } catch (err) {
      setError(err.message);
    }
  };

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
       {error && <Alert variant="danger">{error}</Alert>}
    {/* <Card  style={{width:"500px",margin:"3%  30%  60% 30%"}}> */}
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box 
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant="h4">
                Login 
           </Typography>
          <Box component="form" onSubmit={getOtp} noValidate sx={{ mt: 1 }} style={{ display: !flag ? "block" : "none" }}>
            <TextField
              margin="normal"
              required
              fullWidth
              value={number}
              onChange={(e)=>setNumber(e.target.value)}
              placeholder="Enter Phone Number"
              />
            
            <div id="recaptcha-container"></div>

            <Link to="/">
              
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Cancel
            </Button>
            </Link>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Send OTP
            </Button>
           
           
          </Box>

          <Box component="form" onSubmit={verifyOtp} noValidate sx={{ mt: 1 }} style={{ display:flag ? "block" : "none" }}>
            <TextField
              margin="normal"
              required
              fullWidth
              type="otp"
              placeholder="Enter OTP"
              onChange={(e) => setOtp(e.target.value)}
            />
                       
           <Link to="/">
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Cancel
            </Button>
            </Link>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
             >
             Verify
            </Button>
                
          </Box>
        </Box>
       
      </Container>
    </ThemeProvider>

    {/* </Card> */}

      
       
   
    </>
  );
};

export default PhoneSignUp;