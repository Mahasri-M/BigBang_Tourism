import React, { useState } from 'react';
import axios from 'axios';
import { Button, Card, CardContent, CardMedia, Typography } from '@mui/material';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { useReactToPrint } from 'jspdf-react';

const Viewpackage = () => {
  const [uploadedFileData, setUploadedFileData] = useState([]);

  const getFileData = async () => {
    try {
      const res = await axios.get("https://localhost:7046/api/Tour", {
        responseType: "json",
      });
      if (Array.isArray(res.data)) {
        setUploadedFileData(res.data);
      } else {
        console.log("Invalid data format received:", res.data);
      }
    } catch (ex) {
      console.log("Error fetching data:", ex);
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();

    const tableData = uploadedFileData.map(item => [
      item.packageName,
      item.destination,
      `${item.duration} days`,
      item.priceForAdult,
      item.priceForChild,
    ]);

    // Set the table column headers
    const tableColumns = ['Package Name', 'Destination', 'Duration', 'Price for Adult', 'Price for Child'];

    // Add the table to the PDF
    doc.autoTable({
      head: [tableColumns],
      body: tableData,
      startY: 20,
    });

    // Add images separately
    uploadedFileData.forEach((item, index) => {
      if (item.packImage) {
        const imgData = `data:image/jpeg;base64,${item.packImage}`;
        doc.addImage(imgData, 'JPEG', 10, index * 60 + 80, 40, 40);
      }
    });

    return doc;
  };

  const handlePrint = useReactToPrint({
    content: generatePDF,
  });

  return (
    <div>
      <Button variant="outlined" color="secondary" onClick={getFileData}>
        View Package
      </Button>

      {uploadedFileData.length > 0 && (
        <div>
          <br />
          <h3>Package Details</h3>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
            {uploadedFileData.map((item, index) => (
              <Card key={index} style={{ margin: '10px', maxWidth: '300px' }}>
                <CardContent>
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
                    Price for Adult: {item.priceForAdult}
                  </Typography>
                  <Typography color="textSecondary">
                    Price for Child: {item.priceForChild}
                  </Typography>
                </CardContent>
                <CardMedia
                  component="img"
                  src={`data:image/jpeg;base64,${item.packImage}`}
                  alt={`Image ${index + 1}`}
                  style={{ width: '100%', height: '150px', objectFit: 'cover' }}
                />
              </Card>
            ))}
          </div>
          <br />
          <Button variant="outlined" color="primary" onClick={handlePrint}>
            Download PDF
          </Button>
        </div>
      )}
    </div>
  );
};

export default Viewpackage;
