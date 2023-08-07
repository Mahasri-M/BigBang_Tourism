import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Button from '@mui/material/Button';
import bgImage from "../../assets/asset/img/bg11.jpg";
import Checkbox from '@mui/material/Checkbox';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


const Viewpage = () => {

  const location = useLocation();
  // const uploadedFileData = location.state?.uploadedFileData || []; 
  const selectedOption = location.state?.selectedOption || "";
  const [sortingOrder, setSortingOrder] = useState("ascending");
  const [uploadedFileData, setUploadedFileData] = useState(location.state?.uploadedFileData || []);
  const [selectedDurations, setSelectedDurations] = useState([]);


  const toggleSortingOrder = () => {
    setSortingOrder((prevOrder) => (prevOrder === "ascending" ? "descending" : "ascending"));
  };

  const sortDataBasedOnPrice = () => {
    const sortedData = [...uploadedFileData].sort((a, b) =>
      sortingOrder === "ascending" ? a.priceForAdult - b.priceForAdult : b.priceForAdult - a.priceForAdult
    );
    setUploadedFileData(sortedData);
  };

  const sortDataBasedOnDuration = () => {
    const sortedData = [...uploadedFileData].sort((a, b) =>
      sortingOrder === "ascending" ? a.duration - b.duration : b.duration - a.duration
    );
    setUploadedFileData(sortedData);
  };


  const toggleDurationOption = (duration) => {
    setSelectedDurations((prevSelectedDurations) =>
      prevSelectedDurations.includes(duration)
        ? prevSelectedDurations.filter((dur) => dur !== duration)
        : [...prevSelectedDurations, duration]
    );
  };

  const filteredData = selectedDurations.length
    ? uploadedFileData.filter((item) => selectedDurations.includes(item.duration))
    : uploadedFileData;



  const navigate = useNavigate();

  const handleApproveClick = (item) => {
    navigate("/booking", { state: { packageDetails: item } });
  };
  const handleSideNavClick = () => {
    navigate("/sidenav");
  };

  

  if (!uploadedFileData || uploadedFileData.length === 0) {
    return <p>No data </p>;
  }


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
              onClick={handleSideNavClick}
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
      <Box position="relative" textAlign="center" style={{ width: "100%", height: 200, paddingTop: "1%" }}>
        <img src={bgImage} style={{ width: "100%", height: 250 }} alt="Image" />
        <Box position="absolute" top="30%" left="30%" transform="translate(-50%, -50%)" color="white" fontSize={{ xs: 20, sm: 50 }} fontWeight={600}>
          <p className='Head'> {selectedOption}</p>
        </Box>

      </Box>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <table >
        <td >
      <div style={{width:300,marginLeft:300}}>
        <h3>Filters</h3>
        <Card>
          <Checkbox {...label} onClick={sortDataBasedOnPrice} /> Sort by Price ({sortingOrder === "ascending" ? "Low to High" : "High to Low"})
        </Card>
     
      <br></br>
     
        <Card>
        <Checkbox {...label} onClick={sortDataBasedOnDuration} /> Sort by Days
        <br></br>
        <Checkbox checked={selectedDurations.includes(2)} onChange={() => toggleDurationOption(2)} /> 2 days
        <br></br>
        <Checkbox checked={selectedDurations.includes(3)} onChange={() => toggleDurationOption(3)} /> 3 days
        <br></br>
        <Checkbox checked={selectedDurations.includes(4)} onChange={() => toggleDurationOption(4)} /> 4 days
        <br></br>
        <Checkbox checked={selectedDurations.includes(5)} onChange={() => toggleDurationOption(5)} /> 5 days
        <br></br>
        <Checkbox checked={selectedDurations.includes(6)} onChange={() => toggleDurationOption(6)} /> 6 days
        </Card>
      </div>
      </td>
      <td style={{width:800}}>



<div >
  <p>Showing <span style={{ color: '#e7afb7' }}>{filteredData.length} </span>{selectedOption} Tour Packages</p>
  {filteredData.map((item) => (
    <Card key={item.userId} style={{ margin: '10px', maxWidth: '600px' }} onClick={() => handleApproveClick(item)}>
      <CardContent style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ flex: '0 0 30%', marginRight: '20px' }}>
          {item.packImage && (
            <img
              src={`data:image/jpeg;base64,${item.packImage}`}
              alt="Image"
              style={{ width: '100%', height: '150px', objectFit: 'cover' }}
            />
          )}
        </div>

        <div style={{ flex: '1' }}>
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
        </div>
      </CardContent>
    </Card>
  ))}
</div>



      </td>
      </table>

      {/* <div style={{ marginLeft: '30%' }}>
        <p>Showing <span style={{ color: '#e7afb7' }}>{uploadedFileData.length} </span>{selectedOption} Tour Packages</p>
        {uploadedFileData.map((item) => (
          <Card key={item.userId} style={{ margin: '10px', maxWidth: '600px' }} onClick={() => handleApproveClick(item)}>
            <CardContent>
              <Typography variant="h5" component="h2">
                {item.packageName}
              </Typography>
              <Typography>
                {item.packImage && (
                  <img
                    src={`data:image/jpeg;base64,${item.packImage}`}
                    alt="Image"
                    style={{ maxWidth: "100%", maxHeight: "100px" }}
                  />
                )}
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
      </div> */}
      
    </div>
  );
};

export default Viewpage;



