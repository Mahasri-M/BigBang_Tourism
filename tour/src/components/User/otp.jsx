import React, { useState, useRef } from 'react';
import emailjs from 'emailjs-com';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const VerifyOTP = () => {
  const [email, setEmail] = useState('');
  const [otp, setOTP] = useState([]);
  const [status, setStatus] = useState('');
  const [showOTPField, setShowOTPField] = useState(true); 
  const [generatedOTP, setGeneratedOTP] = useState('');
  const inputRefs = useRef([]);

  function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000);
  }

  const handleSendOTP = () => {
    const newGeneratedOTP = generateOTP();
    setGeneratedOTP(newGeneratedOTP);

    const serviceID = 'KaniniTourism';
    const templateID = 'template_ezgwz3b'; 
    const userID = 'eKtqdRwigRV6DRuta';

    const templateParams = {
      to_email: email,
      message: `Your OTP is: ${newGeneratedOTP}`,
    };

    emailjs.send(serviceID, templateID, templateParams, userID)
      .then(() => {
        setStatus('OTP sent successfully.');
        setOTP([]);
        if (inputRefs.current.length > 0) {
          inputRefs.current[0].focus();
        }
        setTimeout(() => {
            setGeneratedOTP('');
          }, 60000);
      })
      .catch(() => {
        setStatus('Failed to send OTP.');
      });
  };

  const handleVerifyOTP = () => {

    const generatedOTPCorrect = parseInt(generatedOTP, 10);
    const userOTPCorrect = parseInt(otp.join(''), 10);

    if (userOTPCorrect === generatedOTPCorrect) {
      setStatus('OTP verified successfully.');
    } else {
      setStatus('Invalid OTP. Please try again.');
    }
  };

  const handleArrowNavigation = (index, event) => {
    if (event.key === 'ArrowLeft' && inputRefs.current[index - 1]) {

      inputRefs.current[index - 1].focus();
    } else if (event.key === 'ArrowRight' && inputRefs.current[index + 1]) {

      inputRefs.current[index + 1].focus();
    }
  };

  const handleBackspace = (index, event) => {
    if (event.key === 'Backspace' && !otp[index] && inputRefs.current[index - 1]) {

      const updatedOTP = [...otp];
      updatedOTP[index - 1] = '';
      setOTP(updatedOTP);
      inputRefs.current[index - 1].focus();
    }
  };

  const handleInputChange = (index, value) => {
 
    const updatedOTP = [...otp];
    updatedOTP[index] = value.replace(/\D/g, '');
    // updatedOTP[index] = value;

    setOTP(updatedOTP);

    if (value && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <div style={{ border: '1px solid black', borderRadius: '15px', height: '650px', width: '350px' }}>
        <div style={{ background: 'black', width: '100%', height: '60px', borderRadius: '15px 15px 0 0' }} />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
        
       <TextField
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        label="Enter your email"
        variant="outlined"
        margin="normal"
        fullWidth
      />
      <br></br>
      <Button variant="contained" color="primary" onClick={handleSendOTP}>
        Send OTP
      </Button>
      </div>
<br></br>
<br></br>
      {showOTPField && (
        <div style={{padding: '1px' }}>
          {Array.from({ length: 6 }, (_, index) => (
            <input
              key={index}
              type="tel"
              value={otp[index] || ''}
              onChange={(e) => handleInputChange(index, e.target.value)}
              onKeyDown={(e) => {
                handleArrowNavigation(index, e);
                handleBackspace(index, e);
              }}
              ref={(el) => (inputRefs.current[index] = el)}
              style={{
                width: '40px',
                height: '40px',
                fontSize: '24px',
                margin: '8px',
                textAlign: 'center',
                border: '1px solid #ccc',
                borderRadius: '4px',
                outline: 'none',
              }}
              maxLength={1}
              inputMode="numeric"
            />
          ))}
          <br />
          <br></br>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
      
          <Button variant="contained" color="primary" onClick={handleVerifyOTP}>
            Verify OTP
          </Button>
          </div>
        </div>
      )}
<br></br>
      <Typography variant="overline" color="error" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
        {status}
      </Typography>
      <div style={{ background: 'black', width: '100%', height: '60px', borderRadius: '0 0 15px 15px', marginTop: '140px', position: 'relative' }}>
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'white' }} />
      </div>
    </div>
    
    </div>
  );
};

export default VerifyOTP;
