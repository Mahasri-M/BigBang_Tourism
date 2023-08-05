import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import jsPDF from 'jspdf';
import 'jspdf-autotable';


const Booking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const packageDetails = location.state?.packageDetails || null;
  const [spotsData, setSpotsData] = useState([]);
  const [hotelData, setHotelData] = useState([]);
  const [restaurantData, setRestaurantData] = useState([]);
  const searchParams = new URLSearchParams(location.search);

  const selectedHotels = searchParams.get('hotels')?.split(',') || [];
  const spotIdsFromUrl = searchParams.get('spots')?.split(',') || [];
  const selectedRestaurants = searchParams.get('restaurants')?.split(',') || [];
  const today = dayjs();
  const [selectedSpots, setSelectedSpots] = useState(spotIdsFromUrl);
  const [hotelId, setHotelId] = useState("");
  const [restaurantId, setRestaurantId] = useState("");

  const [selectedHotelId, setSelectedHotelId] = useState("");
  const [selectedRestaurantId, setSelectedRestaurantId] = useState("");


  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone_Number: '',
    startDate: '',
    totalPrice: '',
    adult: '',
    child: '',
  });

  const handleNavClick = () => {
    navigate("/sidenav");
  };
  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'startDate') {

      const formattedDate = dayjs(value).format('YYYY-MM-DD');
      setFormData((prevData) => ({
        ...prevData,
        [name]: formattedDate,
      }));
    } else if (name === 'hotel') {
      setSelectedHotelId(value);
    } else if (name === 'restaurant') {
      setSelectedRestaurantId(value);
    }

    else {

      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  useEffect(() => {

    async function fetchHotelData() {
      try {
        const res = await axios.get(`https://localhost:7046/api/Hotel/Location?location=${packageDetails.destination}`, {
          responseType: "json",
        });
        if (Array.isArray(res.data)) {
          setHotelData(res.data);
        } else {
          console.log("Invalid", res.data);
        }
      } catch (ex) {
        console.log("Error:", ex);
      }
    }

    async function fetchRestaurantData() {
      try {
        const res = await axios.get(`https://localhost:7046/api/Restaurent/Location?location=${packageDetails.destination}`, {
          responseType: "json",
        });
        if (Array.isArray(res.data)) {
          setRestaurantData(res.data);
        } else {
          console.log("Invalid", res.data);
        }
      } catch (ex) {
        console.log("Error:", ex);
      }
    }

    const getSpotData = async () => {

      const res = await axios.get(`https://localhost:7046/api/spot/Location?location=${packageDetails.destination}`, {
        responseType: "json",
      });
      if (Array.isArray(res.data)) {
        setSpotsData(res.data.slice(0, packageDetails.duration));
      } else {
        console.log("Invalid data format received:", res.data);
      }

    };

    if (packageDetails) {
      fetchHotelData();
      fetchRestaurantData();
      getSpotData();
    }
  }, [packageDetails]);

  const handleSubmit = async (event) => {
    event.preventDefault();


    try {
      const doc = new jsPDF();
      doc.text('Booking Details', 10, 10);
      doc.text(`Name: ${formData.name}`, 10, 20);
      doc.text(`Email: ${formData.email}`, 10, 30);
      doc.text(`Phone Number: ${formData.phone_Number}`, 10, 40);
      doc.text(`Adult: ${formData.adult}`, 10, 30);
      doc.text(`Child: ${formData.child}`, 10, 30);
      doc.text(`Total Price: ${formData.totalPrice}`, 10, 30);

      // doc.text(`Hotel Name:${formData.hotelName}`,10,30);
      // doc.text(`Restaurent Name:${formData.restaurentName}`,10,30);

      // doc.text(`Package Name: ${formData.packageDetails.packageName}`, 10, 30);
      // doc.text(`Location: ${formData.packageDetails.destination}`, 10, 30);
      // doc.text(`Duration: ${formData.packageDetails.duration}`, 10, 30);
      // doc.text(`Price for Adult: ${formData.packageDetails.priceForAdult}`, 10, 30);
      // doc.text(`Price for Child: ${formData.packageDetails.priceForChild}`, 10, 30);


      //doc.save('booking_details.pdf');
      const pdfBlob = doc.output('blob');

      const pdfUrl = URL.createObjectURL(pdfBlob);

      window.open(pdfUrl);

      const bookingData = {
        ...formData,
        packageId: packageDetails.packageId,
        hotelId: selectedHotelId,
        restaurentId: selectedRestaurantId,
        user: "2",

      };

      await axios.post('https://localhost:7046/api/Book', bookingData);


      setFormData({
        name: '',
        email: '',
        phone_Number: '',
        startDate: '',
        totalPrice: '',
        adult: '',
        child: '',

      });

      alert('Booking successful!');


    } catch (error) {
      console.error('Error submitting form data:', error);
      alert('Failed to submit booking. Please try again later.');
    }

  };


  return (
    <div>
      <Box sx={{ flexGrow: 1 }} >
        <AppBar position="static" style={{ backgroundColor: '#e7afb7' }}>
          <Toolbar>
            <ArrowBackIcon
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleNavClick}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </ArrowBackIcon>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Make Your Trip
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <br></br>
      <Card key={packageDetails.userId} style={{ margin: '10px', maxWidth: '850px' }} >
        <CardContent style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ flex: '0 0 30%', marginRight: '20px' }}>
            {packageDetails.packImage && (
              <img
                src={`data:image/jpeg;base64,${packageDetails.packImage}`}
                alt="Image"
                style={{ width: '100%', height: '150px', objectFit: 'cover' }}
              />
            )}
          </div>

          <div style={{ flex: '1' }}>
            <Typography variant="h5" component="h2">
              {packageDetails.packageName}
            </Typography>
            <Typography color="textSecondary">
              {packageDetails.destination}
            </Typography>
            <Typography color="textSecondary">
              {packageDetails.duration} days
            </Typography>
            <Typography color="textSecondary">
              {packageDetails.priceForAdult}
            </Typography>
            <Typography color="textSecondary">
              {packageDetails.priceForChild}
            </Typography>
          </div>
        </CardContent>
      </Card>
      <h1>Booking Details</h1>
      <div>
        <h2>Selected Hotel ID: {selectedHotelId}</h2>
        <h2>Selected Restaurant ID: {selectedRestaurantId}</h2>
      </div>
      <h2>Package ID: {packageDetails.packageId}</h2>

      {/* <h2>Selected Hotels:</h2>
<ul>
  {selectedHotels.map((hotelId) => (
    <li key={hotelId}>Hotel ID: {hotelId}</li>
  ))}
</ul>

<h2>Selected Restaurants:</h2>
<ul>
  {selectedRestaurants.map((restaurentId) => (
    <li key={restaurentId}>Restaurant ID: {restaurentId}</li>
  ))}
</ul> */}


      <h1>Booking Form</h1>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          variant="outlined"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          name="email"
          variant="outlined"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        <TextField
          label="phone_Number"
          name="phone_Number"
          variant="outlined"
          value={formData.phone_Number}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        <TextField
          label="price"
          name="totalPrice" // Use "totalPrice" instead of "price"
          variant="outlined"
          value={formData.totalPrice}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            fullWidth
            label="Check-out Date"
            name="totalPrice"
            value={formData.totalPrice} // Use the original date format
            onChange={(date) => handleChange({ target: { name: "totalPrice", value: date } })}
            disablePast
            views={['year', 'month', 'day']}
          />
        </LocalizationProvider> */}

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            fullWidth
            label="Check-in Date"
            name="startDate"
            value={formData.startDate} // Use the original date format
            onChange={(date) => handleChange({ target: { name: "startDate", value: date } })}
            disablePast
            views={['year', 'month', 'day']}
          />
        </LocalizationProvider>



        <TextField

          label="Adult"
          variant="outlined"

          name="adult"
          value={formData.adult}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Child"
          variant="outlined"
          name="child"
          value={formData.child}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        <label>Choose Hotel</label>
        <div className="input-group mb-4" style={{ position: "relative" }}>
          <RadioGroup
            aria-label="hotel"
            name="hotel"
            value={hotelId}
            //onChange={(e) => setHotelId(e.target.value)}
            onChange={handleChange}
          >
            {hotelData.map((hotel, index) => (
              <FormControlLabel
                key={index}
                value={hotel.hotelId}

                control={<Radio />}
                label={(
                  <>
                    <span>{hotel.hotelId}</span>
                    <span>{hotel.hotelName}</span>&nbsp;&nbsp;&nbsp;
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
        <label>Choose Restaurent</label>
        <div className="input-group mb-4" style={{ position: "relative" }}>
          <RadioGroup
            aria-label="restaurant"
            name="restaurant"
            value={restaurantId}
            //onChange={(e) => setRestaurantId(e.target.value)}
            onChange={handleChange}
          >
            {restaurantData.map((restaurant, index) => (
              <FormControlLabel
                key={index}
                value={restaurant.restaurentId}
                control={<Radio />}
                label={(
                  <>
                    <span>{restaurant.restaurentId}</span>
                    <span>{restaurant.restaurentName}</span>&nbsp;&nbsp;&nbsp;
                    {restaurant.restaurentImage && (
                      <img
                        src={`data:image/jpeg;base64,${restaurant.restaurentImage}`}
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
        <input type="hidden" name="packageId" value={packageDetails.packageId} />
        {selectedHotels.map((selectedHotelId) => (
          <input key={selectedHotelId} type="hidden" name="selectedHotels" value={selectedHotelId} />
        ))}

        {selectedRestaurants.map((selectedRestaurantId) => (
          <input key={selectedRestaurantId} type="hidden" name="selectedRestaurents" value={selectedRestaurantId} />
        ))}

        <Button variant="contained" color="primary" type="submit">
          Submit Booking
        </Button>



      </form>


    </div>
  );
};

export default Booking;