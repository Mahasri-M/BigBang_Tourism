import React, { useState } from 'react';
import { TextField, Button, Stack } from '@mui/material';


const Restaurent = () => {
    const [restaurentName, setrestaurentName] = useState('');
    const [location, setLocation] = useState('');
    const [restaurentImage, setImage] = useState(null);

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
                        label="restaurentName"
                        onChange={e => setrestaurentName(e.target.value)}
                        value={restaurentName}
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
                <Button variant="outlined" color="secondary" type="submit">Post Restaurent</Button>
            </form>

        </React.Fragment>
    )
}

export default Restaurent;