import React, { useState, useEffect } from 'react';
import { TextField, Button } from '@mui/material';
import Viewpackage from './viewpackage';


const PackageStrengthIndicator = (props) => {
    const getColor = () => {
        const { packageName } = props;
        const uppercaseRegex = /[A-Z]/;
        if (!packageName) {
            return "orange";
        } else if (packageName.length >= 3 && uppercaseRegex.test(packageName)) {
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

const DestinationStrengthIndicator = (props) => {
    const { destination } = props;

    const getColor = () => {

        const uppercaseRegex = /[A-Z]/;
        if (!destination) {
            return "orange";
        } else if (destination.length >= 3 && uppercaseRegex.test(destination)) {
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

const DurationStrengthIndicator = (props) => {
    const { duration } = props;

    const getColor = () => {

        const numberRegex = /^[0-9]+$/;
        if (!duration) {
            return "orange";
        } else if (numberRegex.test(duration)) {
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

const AdultStrengthIndicator = (props) => {
    const { priceForAdult } = props;

    const getColor = () => {

        const numberRegex = /^[0-9]+$/;
        if (!priceForAdult) {
            return "orange";
        } else if (numberRegex.test(priceForAdult)) {
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

const ChildStrengthIndicator = (props) => {
    const { priceForChild } = props;

    const getColor = () => {

        const numberRegex = /^[0-9]+$/;
        if (!priceForChild) {
            return "orange";
        } else if (numberRegex.test(priceForChild)) {
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

const Package = () => {
    const [packageName, setPackageName] = useState('');
    const [destination, setDestination] = useState('');
    const [description, setDescription] = useState('');
    const [duration, setDuration] = useState('');
    const [priceForAdult, setPriceForAdult] = useState('');
    const [priceForChild, setPriceForChild] = useState('');
    const [packImage, setImage] = useState(null);
    const [isButtonEnabled, setIsButtonEnabled] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [initialFormState, setInitialFormState] = useState({
        packageName: '',
        destination: '',
        description:'',
        duration: '',
        priceForAdult:'',
        priceForChild:'',
        packImage: null,
    });


    const handlePackageChange = (event) => {
        const newPackageName = event.target.value;
        setPackageName(newPackageName);
        updateButtonStatus(newPackageName, destination, description, duration, priceForAdult, priceForChild);
    };
    
    const handleDestinationChange = (event) => {
        const newDestination = event.target.value;
        setDestination(newDestination);
        updateButtonStatus(packageName, newDestination, description, duration, priceForAdult, priceForChild);
    };
    
    const handleDescriptionChange = (event) => {
        const newDescription = event.target.value;
        setDescription(newDescription);
        updateButtonStatus(packageName, destination, newDescription, duration, priceForAdult, priceForChild);
    };
    const handleDurationChange = (event) => {
        const newDuration = event.target.value;
        setDuration(newDuration);
        updateButtonStatus(packageName, destination, description, newDuration, priceForAdult, priceForChild);
    };
    const handlePriceForAdultChange = (event) => {
        const newPriceForAdult = event.target.value;
        setPriceForAdult(newPriceForAdult);
        updateButtonStatus(packageName, destination, description, duration, newPriceForAdult, priceForChild);
    };
    
    const handlePriceForChildChange = (event) => {
        const newPriceForChild = event.target.value;
        setPriceForChild(newPriceForChild);
        updateButtonStatus(packageName, destination, description, duration, priceForAdult, newPriceForChild);
    };
        


    function handleImageChange(event) {
        setImage(event.target.files[0]);
    }

    function handleSubmit(event) {
        event.preventDefault();
        console.log(packageName, destination, description, duration, priceForAdult, priceForChild, packImage);

        const formData = new FormData();
        formData.append('packageName', packageName);
        formData.append('destination', destination);
        formData.append('description', description);
        formData.append('duration', duration);
        formData.append('priceForAdult', priceForAdult);
        formData.append('priceForChild', priceForChild);
        formData.append('imageFile', packImage);

        const nameid = localStorage.getItem('nameid');
        formData.append('userId', nameid);


        fetch('https://localhost:7046/api/Tour', {
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
    useEffect(() => {
        const nameid = localStorage.getItem('nameid');
        console.log('Name ID from login:', nameid);
    }, []);

    const updateButtonStatus = (packageName, destination,description,duration,priceForAdult,priceForChild) => {
        const isFormFilled =
          packageName &&
          destination &&
          description &&
          duration &&
          priceForAdult &&
          priceForChild &&
          packageName.match(/[A-Z]/) &&
          description.match(/[A-Z]/) &&
          destination.match(/[A-Z]/) &&
          duration.match(/[1-9]/) &&
          priceForAdult.match(/[1-9]/) &&
          priceForChild.match(/[1-9]/);
    
        setIsButtonEnabled(isFormFilled);
      };

      const resetForm = () => {
        setPackageName('');
        setDestination('');
        setDescription('');
        setDuration('');
        setPriceForAdult('');
        setPriceForChild('');
        setImage(null);
        setIsButtonEnabled(false);
        setInitialFormState({
            packageName: '',
            destination: '',
            description:'',
            duration:'',
            priceForAdult:'',
            priceForChild:'',
            packImage: null,
        });
    };

    return (
        <div>
            <React.Fragment>
                <h2>Package</h2>
                <form onSubmit={handleSubmit}>

                   
                    <div style={{ position: "relative" }}>
                        <TextField
                            type="text"
                            variant='outlined'
                            color='secondary'
                            label="Package Name"
                            onChange={handlePackageChange}
                            value={packageName}
                            fullWidth
                            required
                        />
                          <PackageStrengthIndicator packageName={packageName} />
                    </div>
                    <br></br>
                    <div style={{ position: "relative" }}>
                        <TextField
                            type="text"
                            variant='outlined'
                            color='secondary'
                            label="Destination"
                            onChange={handleDestinationChange}
                            value={destination}
                            fullWidth
                            required
                        />
                          <DestinationStrengthIndicator destination={destination} />
                    </div>
                 <br></br>

                    <div style={{ position: "relative" }}>
                    <TextField
                        type="Description"
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
                    <div style={{ position: "relative" }}>
                    <TextField
                        type="number"
                        variant='outlined'
                        color='secondary'
                        label="Adult"
                        onChange={handlePriceForAdultChange}
                        value={priceForAdult}
                        required
                        fullWidth
                       
                    />
                      <AdultStrengthIndicator priceForAdult={priceForAdult} />
                    </div>
                    <br></br>
                    <div style={{ position: "relative" }}>
                    <TextField
                        type="number"
                        variant='outlined'
                        color='secondary'
                        label="Child"
                        onChange={handlePriceForChildChange}
                        value={priceForChild}
                        fullWidth
                        required
                      
                    />
                      <ChildStrengthIndicator priceForChild={priceForChild} />
                    </div>
                    <br></br>
                    <div style={{ position: "relative" }}>
                    <TextField
                        type="number"
                        variant='outlined'
                        color='secondary'
                        label="Duration"
                        onChange={handleDurationChange}
                        value={duration}
                        fullWidth
                        required
                    
                    />
                      <DurationStrengthIndicator duration={duration} />
                    </div>
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
                        <Button variant="outlined" color="secondary" type="submit" disabled={!isButtonEnabled}>Post Package</Button>
                    </div>
                </form>
                {showSuccessMessage && (
                    <p style={{ textAlign: 'center', marginTop: '10px', color: 'green' }}>Details posted successfully!</p>
                )}

            </React.Fragment>
            <br></br>
            <Viewpackage />
        </div>
    )
}

export default Package;