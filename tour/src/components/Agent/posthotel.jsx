import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import Viewhotel from './viewhotel';


const HotelStrengthIndicator = (props) => {
    const getColor = () => {
        const { hotelName } = props;
        const uppercaseRegex = /[A-Z]/;
        if (!hotelName) {
          return "orange"; 
        } else if (hotelName.length >= 3 && uppercaseRegex.test(hotelName)) {
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

const Hotel = () => {
    const [hotelName, setHotelName] = useState('');
    const [location, setLocation] = useState('');
    const [hotelImage, setImage] = useState(null);
    const [isButtonEnabled, setIsButtonEnabled] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [initialFormState, setInitialFormState] = useState({
        hotelName: '',
        location: '',
        hotelImage: null,
    });


    const handleHotelChange = (event) => {
        setHotelName(event.target.value);
        updateButtonStatus(event.target.value, location);
      };
    
      const handleLocationChange = (event) => {
        setLocation(event.target.value);
        updateButtonStatus(hotelName, event.target.value);
      };

    function handleImageChange(event) {
        setImage(event.target.files[0]);
    }

    function handleSubmit(event) {
        event.preventDefault();
        console.log(hotelName, location, hotelImage);

        const formData = new FormData();
        formData.append('hotelName', hotelName);
        formData.append('location', location);
        formData.append('imageFile', hotelImage);

        fetch('https://localhost:7046/api/Hotel', {
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
    const updateButtonStatus = (hotelName, location) => {
        const isFormFilled =
          hotelName &&
          location &&
          hotelName.match(/[A-Z]/) &&
          location.match(/[A-Z]/);
    
        setIsButtonEnabled(isFormFilled);
      };

      const resetForm = () => {
        setHotelName('');
        setLocation('');
        setImage(null);
        setIsButtonEnabled(false);
        setInitialFormState({
            hotelName: '',
            location: '',
            hotelImage: null,
        });
    };

    return (
        <div>
        <React.Fragment>
            <h2>Hotel</h2>
            <form onSubmit={handleSubmit}>
               <div style={{ position: "relative" }}>
                    <TextField
                        type="text"
                        variant='outlined'
                        color='secondary'
                        label="HotelName"
                        onChange={handleHotelChange}
                        value={hotelName}
                        fullWidth
                        required
                    />
                    <HotelStrengthIndicator hotelName={hotelName} />
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
                 <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button variant="outlined" color="secondary"  disabled={!isButtonEnabled} type="submit">Post Hotel</Button>
                </div>
            </form>
            {showSuccessMessage && (
                    <p style={{ textAlign: 'center', marginTop: '10px', color: 'green' }}>Details posted successfully!</p>
                )}
        </React.Fragment>
         <br></br>
         <Viewhotel/>
         </div>
    )
}

export default Hotel;