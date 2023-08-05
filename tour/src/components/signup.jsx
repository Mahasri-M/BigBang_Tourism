import React, { useState, useEffect } from 'react';
import { NavLink,useNavigate } from 'react-router-dom';
import Logo from '../assets/images/logo.jpg';
import './../assets/scss/style.scss';
import Aux from "../hoc/_Aux";
import TextField from '@mui/material/TextField';
import axios from 'axios';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { toast, ToastContainer } from 'react-toastify';

const UsernameStrengthIndicator = (props) => {
  const getColor = () => {
    const { username } = props;
    const uppercaseRegex = /[A-Z]/;
    if (!username) {
      return "orange"; 
    } else if (username.length >= 3 && uppercaseRegex.test(username)) {
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

const EmailStrengthIndicator = (props) => {
  const getColor = () => {
    const { email } = props;
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!email) {
      return "orange";
    } else if (emailRegex.test(email)) {
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

const RoleStrengthIndicator = (props) => {
  const getColor = () => {
    const { role } = props;
    const uppercaseRegex = /[A-Z]/;
    if (!role) {
      return "orange"; 
    } else if (role.length >= 3 && uppercaseRegex.test(role)) {
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

const AgencyStrengthIndicator = (props) => {
  const getColor = () => {
    const { agency_Name } = props;
    const uppercaseRegex = /[A-Z]/;
    if (!agency_Name) {
      return "orange"; 
    } else if (agency_Name.length >= 5 && uppercaseRegex.test(agency_Name)) {
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

const PhoneStrengthIndicator = (props) => {
  const getColor = () => {
    const { phone_Number } = props;
    const numberRegex = /[0-9]/;
    if (!phone_Number) {
      return "orange"; 
    } else if (phone_Number.length === 10 && numberRegex.test(phone_Number)) {
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
  const getColor = () => {
    const { password } = props;
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

const AgentAgencyInput = ({ value, onChange }) => (
  <div className="input-group mb-3">
    <TextField
      id="outlined-agency-input"
      label="Agency Name"
      type="text"
      autoComplete="current-agency"
      style={{ width: '100%' }}
      value={value}
      onChange={onChange}
    />
    <AgencyStrengthIndicator agency_Name={value} />
  </div>
);

const SignUp = () => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [agency_Name, setAgencyName] = useState("");
  const [phone_Number, setPhoneNumber] = useState("");
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const navigate = useNavigate();
  const [isSignupSuccess, setIsSignupSuccess] = useState(false);


  const handleUsernameChange = (event) => {
    setUserName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setUserEmail(event.target.value);
  };

  const handleAgencyChange = (event) => {
    setAgencyName(event.target.value);
  };

  const handleContactChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleSignUp = (event) => {
    event.preventDefault();
    const userData = { userName, userEmail, password, role, agency_Name, phone_Number };
if(role==='Agent'){
  axios.post('https://localhost:7046/api/Dummy', userData)
  .then((response) => {
    console.log(response.data); 
    toast('Wait until Admin approves you!');
    setIsSignupSuccess(true);
  })
  .catch((error) => {
    console.error(error); 
  });
}else{
  axios.post('https://localhost:7046/api/User/register', userData)
  .then((response) => {
    console.log(response.data); 
    toast('Now you can Login!');
    setIsSignupSuccess(true);
  })
  .catch((error) => {
    console.error(error); 
  });
}
  };

  useEffect(() => {
  
    if (isSignupSuccess) {
      const timeoutId = setTimeout(() => {
        navigate('/login');
      }, 2000);

        return () => clearTimeout(timeoutId);
    }
  }, [isSignupSuccess, navigate]);

  useEffect(() => {
    const isFormFilled =
      userName &&
      userEmail &&
      password &&
      role &&
      //agency_Name &&
      phone_Number &&
      userName.length >= 3 &&
      userEmail.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i) &&
      //agency_Name.length >= 5 &&
      phone_Number.length === 10 &&
      phone_Number.match(/[0-9]/) &&
      password.length >= 8 &&
      password.match(/[A-Z]/) &&
      password.match(/[0-9]/) &&
      password.match(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/);

    setIsButtonEnabled(isFormFilled);
  }, [userName, userEmail, password, role,  phone_Number]);

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
                <img src={Logo} alt="Logo" style={{ width: '60px', height: '60px' }} />
              </div>
              <h3 className="mb-4">Sign up</h3>
              <div className="input-group mb-3">
                <TextField
                  id="outlined-username-input"
                  label="Username"
                  type="text"
                  autoComplete="current-username"
                  style={{ width: '100%' }}
                  value={userName}
                  onChange={handleUsernameChange}
                />
                <UsernameStrengthIndicator username={userName} />
              </div>
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
                <EmailStrengthIndicator email={userEmail} />
              </div>
              <div className="input-group mb-3">
                <Box sx={{ minWidth: 310 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Role</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={role}
                      label="Role"
                      onChange={handleRoleChange}
                    >
                      <MenuItem value='Agent'>Agent</MenuItem>
                      <MenuItem value='User'>User</MenuItem>
                      <MenuItem value='Admin'>Admin</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <RoleStrengthIndicator role={role} />
              </div>
              {role === 'Agent' && (
            <AgentAgencyInput value={agency_Name} onChange={handleAgencyChange} />
          )}
              
              <div className="input-group mb-3">
                <TextField
                  id="outlined-phone-input"
                  label="Phone Number"
                  type="number"
                  autoComplete="current-phone"
                  style={{ width: '100%' }}
                  value={phone_Number}
                  onChange={handleContactChange}
                />
                <PhoneStrengthIndicator phone_Number={phone_Number} />
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
              <button className="btn btn-primary shadow-2 mb-4" type="button" onClick={handleSignUp} disabled={!isButtonEnabled} >Sign up</button>
              <p className="mb-0 text-muted">Already have an account? <NavLink to="/login">Login</NavLink></p>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </Aux>
  );
}

export default SignUp;