import React, { useState } from 'react';
import axios from 'axios';

const Viewrestaurent = () => {

  const [uploadedFileData, setUploadedFileData] = useState([]);

  const getFileData = async () => {
    try {
      const res = await axios.get("https://localhost:7046/api/restaurent", {
        responseType: "json",
      });
      console.log(res);
      if (Array.isArray(res.data)) {
        console.log("Data received:", res.data);
        setUploadedFileData(res.data); 
      } else {
        console.log("Invalid data format received:", res.data);
      }
    } catch (ex) {
      console.log("Error fetching data:", ex);
    }
  };
  
  return (
    <div>

      <button onClick={getFileData}>Get File Data</button>
      
      {uploadedFileData.length > 0 && (
        <div>
          <h2>Uploaded File Data</h2>
          <table>
            <thead>
              <tr>
                <th>Package Name</th>
                <th>Destination</th>
                <th>Image</th>
              </tr>
            </thead>
            <tbody>
              {uploadedFileData.map((item, index) => (
                <tr key={index}>
                  <td>{item.restaurentName}</td>
                  <td>{item.location}</td>
                  <td>
                  
                    {item.restaurentImage && (
                      <img
                        src={`data:image/jpeg;base64,${item.restaurentImage}`}
                        alt={`Image ${index + 1}`}
                        style={{ maxWidth: '100%', maxHeight: '100px' }}
                      />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Viewrestaurent;
