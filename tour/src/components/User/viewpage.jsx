import React from "react";
import { useLocation, useNavigate } from "react-router-dom"; 
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const Viewpage = () => {

  const location = useLocation(); 
  const uploadedFileData = location.state?.uploadedFileData || []; 
  const navigate= useNavigate();

  const handleApproveClick = (item) => {
    navigate("/booking", { state: { packageDetails: item } });
  };

  if (!uploadedFileData || uploadedFileData.length === 0) {
    return <p>No data </p>;
  }
 

  return (
    <div>
      <h2>Uploaded File Data</h2>

      {uploadedFileData.map((item) => (
        <Card key={item.userId} style={{ margin: '10px', maxWidth: '400px' }} onClick={() => handleApproveClick(item)}>
          <CardContent>
            <Typography>
              {item.packImage && (
                <img
                  src={`data:image/jpeg;base64,${item.packImage}`}
                  alt="Image"
                  style={{ maxWidth: "100%", maxHeight: "100px" }}
                />
              )}
            </Typography>
            <Typography variant="h5" component="h2">
              {item.packageName}
            </Typography>
            <Typography color="textSecondary">
              {item.destination}
            </Typography>
            <Typography color="textSecondary">
              {item.duration} days
            </Typography>
            <Typography color="textSecondary">
              {item.priceForAdult}
            </Typography>
            <Typography color="textSecondary">
              {item.priceForChild}
            </Typography>
           
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Viewpage;
