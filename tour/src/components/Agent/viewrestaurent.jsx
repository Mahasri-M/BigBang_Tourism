import React, { useState } from 'react';
import axios from 'axios';
import { Button, Card, CardContent, CardMedia, Typography } from '@mui/material';

const Viewrestaurent = () => {
  const [uploadedFileData, setUploadedFileData] = useState([]);

  const getFileData = async () => {
    try {
      const res = await axios.get('https://localhost:7046/api/restaurent', {
        responseType: 'json',
      });
      console.log(res);
      if (Array.isArray(res.data)) {
        console.log('Data received:', res.data);
        setUploadedFileData(res.data);
      } else {
        console.log('Invalid data format received:', res.data);
      }
    } catch (ex) {
      console.log('Error fetching data:', ex);
    }
  };

  return (
    <div>
      <Button variant="outlined" color="secondary" onClick={getFileData}>
        View Restaurant
      </Button>

      {uploadedFileData.length > 0 && (
        <div>
          <br></br>
          <h3>Restaurant Details</h3>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
            {uploadedFileData.map((item, index) => (
              <Card key={index} style={{ margin: '10px', maxWidth: '300px' }}>
                <CardContent>
                  <Typography variant="h5" component="h2">
                    {item.restaurentName}
                  </Typography>
                  <Typography color="textSecondary">
                    {item.location}
                  </Typography>
                </CardContent>
                <CardMedia
                  component="img"
                  src={`data:image/jpeg;base64,${item.restaurentImage}`}
                  alt={`Image ${index + 1}`}
                  style={{ width: '100%', height: '150px', objectFit: 'cover' }}
                />
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Viewrestaurent;
