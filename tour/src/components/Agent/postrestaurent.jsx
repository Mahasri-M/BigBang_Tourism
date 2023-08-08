import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import Viewrestaurent from './viewrestaurent';


const NameStrengthIndicator = (props) => {
    const getColor = () => {
        const { restaurentName } = props;
        const uppercaseRegex = /[A-Z]/;
        if (!restaurentName) {
          return "orange"; 
        } else if (restaurentName.length >= 3 && uppercaseRegex.test(restaurentName)) {
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
  
  const LocationStrengthIndicator = (props) => {
    const { location } = props;
  
    const getColor = () => {
   
      const uppercaseRegex = /[A-Z]/;
      if (!location) {
        return "orange"; 
      } else if (location.length >= 3 && uppercaseRegex.test(location)) {
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

const Restaurent = () => {
    const [restaurentName, setrestaurentName] = useState('');
    const [location, setLocation] = useState('');
    const [restaurentImage, setImage] = useState(null);
    const [isButtonEnabled, setIsButtonEnabled] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [initialFormState, setInitialFormState] = useState({
        restaurentName: '',
        location: '',
        restaurentImage: null,
    });

    const handleNameChange = (event) => {
        setrestaurentName(event.target.value);
        updateButtonStatus(event.target.value, location);
      };
    
      const handleLocationChange = (event) => {
        setLocation(event.target.value);
        updateButtonStatus(restaurentName, event.target.value);
      };

    function handleImageChange(event) {
        setImage(event.target.files[0]);
    }

    function handleSubmit(event) {
        event.preventDefault();
        console.log(restaurentName, location, restaurentImage);

        const formData = new FormData();
        formData.append('restaurentName', restaurentName);
        formData.append('location', location);
        formData.append('imageFile', restaurentImage);

        fetch('https://localhost:7046/api/restaurent', {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
           
            console.log(data);
            setShowSuccessMessage(true);
            setTimeout(() => {
                setShowSuccessMessage(false);
                resetForm();
            }, 2000); 
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    const updateButtonStatus = (restaurentName, location) => {
        const isFormFilled =
          restaurentName &&
          location &&
          restaurentName.match(/[A-Z]/) &&
          location.match(/[A-Z]/);
    
        setIsButtonEnabled(isFormFilled);
      };

      const resetForm = () => {
        setrestaurentName('');
        setLocation('');
        setImage(null);
        setIsButtonEnabled(false);
        setInitialFormState({
            restaurentName: '',
            location: '',
            restaurentImage: null,
        });
    };

    return (
        <div>
        <React.Fragment>
            <h2>Restaurant</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ position: "relative" }}>
                    <TextField
                        type="text"
                        variant='outlined'
                        color='secondary'
                        label="Restaurant Name"
                        onChange={handleNameChange}
                        value={restaurentName}
                        fullWidth
                        required
                    />
                    <NameStrengthIndicator restaurentName={restaurentName} />
                    </div>
                    <br></br>
                    <br></br>
                    <div style={{ position: "relative" }}>
                    <TextField
                        type="text"
                        variant='outlined'
                        color='secondary'
                        label="Location"
                        onChange={handleLocationChange}
                        value={location}
                        fullWidth
                        required
                    />
                    <LocationStrengthIndicator location={location} />
                    </div>
                <br></br>
                    <br></br>
            
                <input
                    type="file"
                    onChange={handleImageChange}
                    accept=".jpg,.jpeg,.png"
                    required
                />
                  <br></br>
                    <br></br>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button variant="outlined" color="secondary" type="submit"  disabled={!isButtonEnabled}>Post Restaurant</Button>
                </div>
            </form>
            {showSuccessMessage && (
                    <p style={{ textAlign: 'center', marginTop: '10px', color: 'green' }}>Details posted successfully!</p>
                )}

        </React.Fragment>
        <br></br>
        <Viewrestaurent/>
        </div>
    )
}

export default Restaurent;