import React, { useState } from 'react';
import { TextField, Button, Stack } from '@mui/material';


const Spot = () => {
    const [spotName, setspotName] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [spotImage, setImage] = useState(null);

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
                        label="Spot"
                        onChange={e => setspotName(e.target.value)}
                        value={spotName}
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
                     <TextField
                        type="text"
                        variant='outlined'
                        color='secondary'
                        label="Description"
                        onChange={e => setDescription(e.target.value)}
                        value={description}
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
                <Button variant="outlined" color="secondary" type="submit">Post Spot</Button>
            </form>

        </React.Fragment>
    )
}

export default Spot;