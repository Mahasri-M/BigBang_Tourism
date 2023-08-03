import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Logo from '../assets/images/logo.jpg';
import Aux from "../hoc/_Aux";
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import jwt_decode from 'jwt-decode';

const EmailStrengthIndicator = (props) => {
  const { userEmail } = props;

  const getColor = () => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!userEmail) {
      return "orange";
    } else if (emailRegex.test(userEmail)) {
      return "green";
    } else {
      return "red";
    }
  };

  const color = getColor();
  const indicatorStyle = {
    height: "100%",
    width: "5px",
    backgroundColor: color,
    position: "absolute",
    top: 0,
    right: 0,
  };

  return <div style={indicatorStyle} />;
};

const PasswordStrengthIndicator = (props) => {
  const { password } = props;

  const getColor = () => {
    const uppercaseRegex = /[A-Z]/;
    const numberRegex = /[0-9]/;
    const specialCharRegex = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/;
    if (!password) {
      return "orange";
    } else if (
      password.length >= 8 &&
      uppercaseRegex.test(password) &&
      numberRegex.test(password) &&
      specialCharRegex.test(password)
    ) {
      return "green";
    } else if (
      password.length >= 8 &&
      (uppercaseRegex.test(password) || numberRegex.test(password) || specialCharRegex.test(password))
    ) {
      return "orange";
    } else {
      return "red";
    }
  };

  const color = getColor();
  const indicatorStyle = {
    height: "100%",
    width: "5px",
    backgroundColor: color,
    position: "absolute",
    top: 0,
    right: 0,
  };

  return <div style={indicatorStyle} />;
};

const Login = () => {
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const navigate = useNavigate();
  // useEffect(()=>{
  //   toast('heloo');
  // },[]);
  const handleEmailChange = (event) => {
    setUserEmail(event.target.value);
    updateButtonStatus(event.target.value, password);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    updateButtonStatus(userEmail, event.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Login button clicked!");

    try {
      const response = await axios.post('https://localhost:7046/api/User/login', { userEmail, password });

      if (response.status === 200) {
        const token = response.data;
        localStorage.setItem('token', token);

        const decodedToken = jwt_decode(token);
        console.log('Token:', token);
        console.log('Name:', userEmail);
        console.log('Role:', decodedToken.role);
        if (decodedToken.role === "Admin") {
          toast.success('Hi Admin Login Successful');
          navigate("/manage");
        }
        else if(decodedToken.role === "Agent"){
          toast.success('Hi Agent Login Successful');
          navigate("/package");
        }
        else if(decodedToken.role === "User"){
          toast.success('Hi User Login Successful');
          navigate("/homepage");
        }
        else{
          toast.danger('Invalid Credentials');
        }
        // toast.success('Login Successful');
        // navigate("/homepage");

      } else {
        console.error('Error during login:', response);
        toast.error('Invalid Credentials');
      }
    } catch (error) {
      console.error('Error during login:', error);
      toast.error('Invalid Credentials');
    }
  };



  const updateButtonStatus = (email, pass) => {
    const isFormFilled =
      email &&
      pass &&
      email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i) &&
      pass.length >= 8 &&
      pass.match(/[A-Z]/) &&
      pass.match(/[0-9]/) &&
      pass.match(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/);

    setIsButtonEnabled(isFormFilled);
  };



  return (
    <Aux>
      <div className="auth-wrapper">
        <div className="auth-content">
          <div className="auth-bg">
            <span className="r" />
            <span className="r s" />
            <span className="r s" />
            <span className="r" />
          </div>
          <div className="card">
            <div className="card-body text-center">
              <div className="mb-4">
                <img src={Logo} alt="Logo" style={{ width: '100px', height: '100px' }} />
              </div>
              <h3 className="mb-4">Login</h3>
              <div className="input-group mb-3">
                <TextField
                  id="outlined-email-input"
                  label="Email"
                  type="text"
                  autoComplete="current-email"
                  style={{ width: '100%' }}
                  value={userEmail}
                  onChange={handleEmailChange}
                />
                <EmailStrengthIndicator userEmail={userEmail} />
              </div>
              <div className="input-group mb-4" style={{ position: "relative" }}>
                <TextField
                  id="outlined-password-input"
                  label="Password"
                  type="password"
                  autoComplete="current-password"
                  style={{ width: '100%' }}
                  value={password}
                  onChange={handlePasswordChange}
                />
                <PasswordStrengthIndicator password={password} />
              </div>
              <button
                className="btn btn-primary shadow-2 mb-4"
                onClick={handleLogin}
                disabled={!isButtonEnabled}
              >Login</button>
              <p className="mb-2 text-muted">Forgot password? <NavLink to="/auth/reset-password-1">Reset</NavLink></p>
              <p className="mb-0 text-muted">Don’t have an account? <NavLink to="/signup">Signup</NavLink></p>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </Aux>
  );
};

export default Login;
