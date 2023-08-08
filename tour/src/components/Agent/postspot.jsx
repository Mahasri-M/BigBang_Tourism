import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import Viewspot from './viewspot';

const SpotStrengthIndicator = (props) => {
    const getColor = () => {
        const { spotName } = props;
        const uppercaseRegex = /[A-Z]/;
        if (!spotName) {
          return "orange"; 
        } else if (spotName.length >= 3 && uppercaseRegex.test(spotName)) {
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

  const DescriptionStrengthIndicator = (props) => {
    const { description } = props;
  
    const getColor = () => {
   
      const uppercaseRegex = /[A-Z]/;
      if (!description) {
        return "orange"; 
      } else if (description.length >= 3 && uppercaseRegex.test(description)) {
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

const Spot = () => {
    const [spotName, setspotName] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [spotImage, setImage] = useState(null);
    const [isButtonEnabled, setIsButtonEnabled] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [initialFormState, setInitialFormState] = useState({
        spotName: '',
        location: '',
        description:'',
        spotImage: null,
    });


    const handleSpotChange = (event) => {
        const newSpotName = event.target.value;
     setspotName(newSpotName);
    updateButtonStatus(newSpotName, location, description);
      };
    
      const handleLocationChange = (event) => {
        const newLocation = event.target.value;
        setLocation(newLocation);
        updateButtonStatus(spotName, newLocation, description);
      };
      const handleDescriptionChange = (event) => {
        const newDescription = event.target.value;
        setDescription(newDescription);
        updateButtonStatus(spotName, location, newDescription);
      };


    function handleImageChange(event) {
        setImage(event.target.files[0]);
    }

    function handleSubmit(event) {
        event.preventDefault();
        console.log(spotName, location, spotImage);

        const formData = new FormData();
        formData.append('spotName', spotName);
        formData.append('description', description);
        formData.append('location', location);
        formData.append('imageFile', spotImage);

        fetch('https://localhost:7046/api/spot', {
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

    const updateButtonStatus = (spotName, location,description) => {
        const isFormFilled =
          spotName &&
          location &&
          description &&
          spotName.match(/[A-Z]/) &&
          description.match(/[A-Z]/) &&
          location.match(/[A-Z]/);
    
        setIsButtonEnabled(isFormFilled);
      };

      const resetForm = () => {
        setspotName('');
        setLocation('');
        setDescription('');
        setImage(null);
        setIsButtonEnabled(false);
        setInitialFormState({
            spotName: '',
            location: '',
            description:'',
            spotImage: null,
        });
    };

    return (
        <div>
        <React.Fragment>
            <h2>Spot</h2>
            <form onSubmit={handleSubmit}>
            <div style={{ position: "relative" }}>
                    <TextField
                        type="text"
                        variant='outlined'
                        color='secondary'
                        label="Spot"
                        onChange={handleSpotChange}
                        value={spotName}
                        fullWidth
                        required
                    />
                     <SpotStrengthIndicator spotName={spotName} />
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
                    <div style={{ position: "relative" }}>
                     <TextField
                        type="text"
                        variant='outlined'
                        color='secondary'
                        label="Description"
                        onChange={handleDescriptionChange}
                        value={description}
                        fullWidth
                        required
                    />
                     <DescriptionStrengthIndicator description={description} />
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
                    <Button variant="outlined" color="secondary" disabled={!isButtonEnabled} type="submit">Post Spot</Button>
                </div>
            </form>
            {showSuccessMessage && (
                    <p style={{ textAlign: 'center', marginTop: '10px', color: 'green' }}>Details posted successfully!</p>
                )}

        </React.Fragment>
        <br></br>
        <Viewspot/>
        </div>
    )
}

export default Spot;