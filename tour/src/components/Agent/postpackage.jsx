import React, { useState } from 'react';
import { TextField, Button, Stack } from '@mui/material';

const Package = () => {
    const [packageName, setPackageName] = useState('');
    const [destination, setDestination] = useState('');
    const [description, setDescription] = useState('');
    const [duration, setDuration] = useState('');
    const [priceForAdult, setPriceForAdult] = useState('');
    const [priceForChild, setPriceForChild] = useState('');
    const [packImage, setImage] = useState(null);

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

        fetch('https://localhost:7046/api/Tour', {
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
                        label="PackageName"
                        onChange={e => setPackageName(e.target.value)}
                        value={packageName}
                        fullWidth
                        required
                    />
                    <TextField
                        type="text"
                        variant='outlined'
                        color='secondary'
                        label="Destination"
                        onChange={e => setDestination(e.target.value)}
                        value={destination}
                        fullWidth
                        required
                    />
                </Stack>
                <TextField
                    type="Description"
                    variant='outlined'
                    color='secondary'
                    label="Description"
                    onChange={e => setDescription(e.target.value)}
                    value={description}
                    fullWidth
                    required
                    sx={{ marginBottom: 4 }}
                />
                <TextField
                    type="number"
                    variant='outlined'
                    color='secondary'
                    label="Adult"
                    onChange={e => setPriceForAdult(e.target.value)}
                    value={priceForAdult}
                    required
                    fullWidth
                    sx={{ marginBottom: 4 }}
                />
                <TextField
                    type="number"
                    variant='outlined'
                    color='secondary'
                    label="Child"
                    onChange={e => setPriceForChild(e.target.value)}
                    value={priceForChild}
                    fullWidth
                    required
                    sx={{ marginBottom: 4 }}
                />
                <TextField
                    type="number"
                    variant='outlined'
                    color='secondary'
                    label="Duration"
                    onChange={e => setDuration(e.target.value)}
                    value={duration}
                    fullWidth
                    required
                    sx={{ marginBottom: 4 }}
                />
                <input
                    type="file"
                    onChange={handleImageChange}
                    accept=".jpg,.jpeg,.png"
                    required
                />
                <Button variant="outlined" color="secondary" type="submit">Register</Button>
            </form>

        </React.Fragment>
    )
}

export default Package;