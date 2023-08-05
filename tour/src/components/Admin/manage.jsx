import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';


const Manage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('https://localhost:7046/api/Dummy')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const sendRejectionEmail = (userData) => {
    const mailtoLink = `mailto:${userData.userEmail}?subject=Approval Details&body=Dear ${userData.userName},%0D%0A%0D%0AWe are writing to inform you that your request has been Rejected.%0D%0A%0D%0AAgency Name: ${userData.agency_Name}%0D%0A%0D%0AThank you.`;
    window.location.href = mailtoLink;
  };

  const handleApprove = (userId) => {
    console.log('Approve user with ID:', userId);
  
    const userData = data.find((user) => user.userId === userId);
  
    if (userData) {
      const { userId, ...userDataWithoutId } = userData;
  
      axios.post('https://localhost:7046/api/User/register', userDataWithoutId)
        .then((response) => {
          const mailtoLink = `mailto:${userData.userEmail}?subject=Approval Details&body=Dear ${userData.userName},%0D%0A%0D%0AWe are writing to inform you that your request has been Approved.%0D%0A%0D%0AAgency Name: ${userData.agency_Name}%0D%0A%0D%0ABest regards,%0D%0AThank You.`;
          window.location.href = mailtoLink;
          console.log('User registered successfully:', response.data);
  
          axios.delete(`https://localhost:7046/api/Dummy/${userId}`)
            .then(() => {
              console.log('User removed from Dummy table.');
              setData((prevData) => prevData.filter((user) => user.userId !== userId));
            })
            .catch((error) => {
              console.error('Error removing user from Dummy table:', error);
            });
        })
        .catch((error) => {
          console.error('Error registering user:', error);
        });
    }
  };
  
  

  const handleDecline = (userId) => {
    console.log('Decline user with ID:', userId);

    const userData = data.find((user) => user.userId === userId);
    if (userData) {
      axios.delete(`https://localhost:7046/api/Dummy/${userId}`)
        .then((response) => {
          console.log('User declined and deleted successfully.');
          setData((prevData) => prevData.filter((user) => user.userId !== userId));
          sendRejectionEmail(userData);
        })
        .catch((error) => {
          console.error('Error declining and deleting user:', error);
        });
    }
  };

  return (
    <div>
      <h3>Approval</h3>
      {data.length > 0 ? (
      data.map((row) => (
        <Card key={row.userId} style={{ margin: '10px', maxWidth: '400px' }}>
          <CardContent>
            <Typography variant="h5" component="h2">
              {row.userName}
            </Typography>
            <Typography color="textSecondary">
              {row.userEmail}
            </Typography>
            <Typography color="textSecondary">
              {row.role}
            </Typography>
            <Typography color="textSecondary">
              {row.agency_Name}
            </Typography>
            <Typography color="textSecondary">
              {row.phone_Number}
            </Typography>
            <div style={{ marginTop: '10px' }}>
              <Button variant="contained" color="success" onClick={() => handleApprove(row.userId)}>
                Approve
              </Button>&nbsp; &nbsp;
              <Button variant="contained" color="error" onClick={() => handleDecline(row.userId)}>
                Decline
              </Button>
            </div>
          </CardContent>
        </Card>
      ))
      ) : (
        <p>No requests.</p>
      )}
      
    </div>
  );
};

export default Manage;
