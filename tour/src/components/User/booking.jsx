import React,{useState} from "react";
import { useLocation } from "react-router-dom";
import TextField from '@mui/material/TextField';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { toast, ToastContainer } from 'react-toastify';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
const Booking = () => {
  const location = useLocation();
  const packageDetails = location.state?.packageDetails || null;
  const [selectedOption, setSelectedOption] = useState("");
    const [uploadedFileData,setUploadedFileData]=useState([]);

  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [adult, setadult] = useState("");
  const [child, setchild] = useState("");
  const [startDate, setstartDate] = useState("");
  const [totalPrice, setPrice] = useState("");
 

  const handlenameChange = (event) => {
    setname(event.target.value);
  };

  const handleemailChange = (event) => {
    setemail(event.target.value);
  };

  const handleDateChange = (event) => {
    setstartDate(event.target.value);
  };

  const handleContactChange = (event) => {
    setPrice(event.target.value);
  };

  const handleadultChange = (event) => {
    setadult(event.target.value);
  };

  const handlechildChange = (event) => {
    setchild(event.target.value);
  };
  const handleSignUp = (event) => {
    event.preventDefault();

  
    const userData = { name, email, adult, child, startDate, totalPrice };
  
    axios.post('https://localhost:7046/api/Book', userData)
      .then((response) => {
        console.log(response.data); 
        toast('Booked!');
 
      })
      .catch((error) => {
        console.error(error); 
      });
    };

    const getFileData = async () => {
      try {
          const res = await axios.get(`https://localhost:7046/api/Hotel/Location?location=${packageDetails.destination}`, {
              responseType: "json",
          });
          if (Array.isArray(res.data)) {
              setUploadedFileData(res.data);
           
          } else {
              console.log("Invalid", res.data);
          }
      } catch (ex) {
          console.log("Error:", ex);
      }
  };

  if (!packageDetails) {
    return <p>No package details found.</p>;
  }

  return (
    <div>
      <h2>Booking Page</h2>
      <div>
        <img
          src={`data:image/jpeg;base64,${packageDetails.packImage}`}
          alt="Package"
          style={{ maxWidth: "100%", maxHeight: "200px" }}
        />
        <h3>{packageDetails.packageName}</h3>
        <p>Destination: {packageDetails.destination}</p>
        <p>Duration: {packageDetails.duration} days</p>
        <p>Price for Adult: {packageDetails.priceForAdult}</p>
        <p>Price for Child: {packageDetails.priceForChild}</p>
        <p>Description: {packageDetails.description}</p>
        
      </div>

     
              <h3 className="mb-4">Book</h3>
              <div className="input-group mb-3">
                <TextField
                  id="outlined-name-input"
                  label="name"
                  type="text"
                  autoComplete="current-name"
                  style={{ width: '100%' }}
                  value={name}
                  onChange={handlenameChange}
                />
              
              </div>
              <div className="input-group mb-3">
                <TextField
                  id="outlined-email-input"
                  label="Email"
                  type="text"
                  autoComplete="current-email"
                  style={{ width: '100%' }}
                  value={email}
                  onChange={handleemailChange}
                />
               
              </div>
          
              <div className="input-group mb-3">
                <TextField
                  id="outlined-phone-input"
                  label="Price"
                  type="number"
                  autoComplete="current-phone"
                  style={{ width: '100%' }}
                  value={totalPrice}
                  onChange={handleContactChange}
                />
               
              </div>
              <div className="input-group mb-4" style={{ position: "relative" }}>
                <TextField
                  id="outlined-adult-input"
                  label="adult"
                  type="number"
                  autoComplete="current-adult"
                  style={{ width: '100%' }}
                  value={adult}
                  onChange={handleadultChange}
                />
                
              </div>

              <div className="input-group mb-4" style={{ position: "relative" }}>
                <TextField
                  id="outlined-child-input"
                  label="child"
                  type="number"
                  autoComplete="current-child"
                  style={{ width: '100%' }}
                  value={child}
                  onChange={handlechildChange}
                />
                
              </div>
              <div className="input-group mb-4" style={{ position: "relative" }}>
                <TextField
                  id="outlined-child-input"
                  label="date"
                  type="date"
                  autoComplete="current-child"
                  style={{ width: '100%' }}
                  value={startDate}
                  onChange={handleDateChange}
                />
                
              </div>
              <Button variant="contained" onClick={getFileData}>Choose Hotel</Button>
              <div className="input-group mb-4" style={{ position: "relative" }}>
        <RadioGroup
          aria-label="hotel"
          name="hotel"
         // value={selectedHotel}
          onChange={getFileData}
        >
          {uploadedFileData.map((hotel, index) => (
            <FormControlLabel
              key={index}
              value={hotel.hotelName}
              control={<Radio />}
              label={(
                <>
                  <span>{hotel.hotelName}</span>
                  {hotel.hotelImage && (
                    <img
                      src={`data:image/jpeg;base64,${hotel.hotelImage}`}
                      alt={`Image ${index + 1}`}
                      style={{ maxWidth: '100%', maxHeight: '100px' }}
                    />
                  )}
                </>
              )}
            />
          ))}
        </RadioGroup>
      </div>

              <button className="btn btn-primary shadow-2 mb-4" type="button" onClick={handleSignUp}  >Book</button>
              
          
           
       
    </div>
  );
};

export default Booking;
