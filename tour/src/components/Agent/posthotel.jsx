import React, { useState } from 'react';
import { TextField, Button, Stack } from '@mui/material';


const Hotel = () => {
    const [hotelName, setHotelName] = useState('');
    const [location, setLocation] = useState('');
    const [hotelImage, setImage] = useState(null);

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
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    return (
        <React.Fragment>
            <h2>Register Form</h2>
            <form onSubmit={handleSubmit}>
                <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
                    <TextField
                        type="text"
                        variant='outlined'
                        color='secondary'
                        label="HotelName"
                        onChange={e => setHotelName(e.target.value)}
                        value={hotelName}
                        fullWidth
                        required
                    />
                    <TextField
                        type="text"
                        variant='outlined'
                        color='secondary'
                        label="Location"
                        onChange={e => setLocation(e.target.value)}
                        value={location}
                        fullWidth
                        required
                    />
                </Stack>
            
                <input
                    type="file"
                    onChange={handleImageChange}
                    accept=".jpg,.jpeg,.png"
                    required
                />
                <Button variant="outlined" color="secondary" type="submit">Post Hotel</Button>
            </form>

        </React.Fragment>
    )
}

export default Hotel;