import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ImageGallery = ({ fileNames }) => {
  return (
    <div>
      <h2>Image Gallery</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {fileNames.map((image, index) => (
          <img
            key={index}
            src={`https://localhost:7046/api/File/GetAllImages`}
            alt={`Image ${index + 1}`}
            style={{ width: '150px', height: '150px', margin: '5px' }}
          />
        ))}
      </div>
    </div>
  );
};

const ApiImageGallery = () => {
  const [uploadedFileData, setUploadedFileData] = useState([]);

  const getFileData = async () => {
    try {
      const res = await axios.get('https://localhost:7046/api/File/GetAllImages', {
        responseType: 'json',
      });

      if (res.data && Array.isArray(res.data)) {
        setUploadedFileData(res.data);
      }
    } catch (ex) {
      console.log('Get file data error:', ex);
    }
  };

  useEffect(() => {
    getFileData();
  }, []);

  return (
    <div>
      <button onClick={getFileData}>Get File Data</button>
      <ImageGallery fileNames={uploadedFileData} />
    </div>
  );
};

const App = () => {
  return (
    <div>
      <h1>My App</h1>
      <ApiImageGallery />
    </div>
  );
};

export default App;


