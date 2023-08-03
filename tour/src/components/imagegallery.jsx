// import React,{useState} from 'react';
// import axios from 'axios';

// export const ImageUpload=()=>{
//   const [file,setFile]=useState();
//   const [fileName,setFileName]=useState();

//   const saveFile=(e)=>{
//     console.log(e.target.files[0]);
//     setFile(e.target.files[0]);
//     setFileName(e.target.files[0].name);
//   };

//   const uploadFile=async(e)=>{
//     console.log(file);
//     const formData=new FormData();
//     formData.append("formFile",file);
//     formData.append("fileName",fileName);
//     try
//     {
//       const res=await axios.post("https://localhost:7046/api/File",formData);
//       console.log(res);
//     }
//     catch(ex)
//     {
//       console.log(ex);
//     }
//   };


   
//   return(
//     <div>
//     <input type="file" onChange={saveFile}/>
//     <input type="button" value="Upload" onClick={uploadFile}/>
//     </div>
//   );
//   }


// export default ImageUpload;
//-----------------------------------------------------------------------------------------------------------------------upload wwwroot


// import React, { useState } from 'react';
// import axios from 'axios';

// const App = () => {
//   const [file, setFile] = useState();
//   const [fileName, setFileName] = useState();
//   const [uploadedFileData, setUploadedFileData] = useState(null);

//   const saveFile = (e) => {
//     setFile(e.target.files[0]);
//     setFileName(e.target.files[0].name);
//   };

//   const uploadFile = async () => {
//     const formData = new FormData();
//     formData.append("formFile", file);
//     formData.append("fileName", fileName);
//     try {
//       const res = await axios.post("https://localhost:7046/api/Image", formData);
//       console.log(res);
//     } catch (ex) {
//       console.log(ex);
//     }
//   };

//   const getFileData = async () => {
//     try {
//       const res = await axios.get("https://localhost:7046/api/Image", {
//         responseType: "json", 
//       });
//       console.log(res);
//       setUploadedFileData(res.data.map((image) => image.fileContents)); 
//     } catch (ex) {
//       console.log(ex);
//     }
//   };
  

//   return (
//     <div>
//       <input type="file" onChange={saveFile} />
//       <button onClick={uploadFile}>Upload</button>
//       <button onClick={getFileData}>Get File Data</button>
//       {uploadedFileData && (
//   <div>
//     <h2>Uploaded File Data</h2>
//     {uploadedFileData.map((fileData, index) => (
//       <img
//         key={index}
//         src={`data:image/jpeg;base64,${fileData}`}
//         alt={`Uploaded File ${index + 1}`}
//         width="200"
//         height="200"
//       />
//     ))}
//   </div>
// )}

//     </div>
//   );
// };

// export default App;

//------------------------------------------------------uplaod and get wwwroot 

// import React, { useState } from 'react';
// import axios from 'axios';

// export const App = () => {
//   const [imagesData, setImagesData] = useState([]);

//   const getImagesData = async () => {
//     try {
//       const response = await axios.get("https://localhost:7046/api/File/GetImages"); 
//       setImagesData(response.data); // Set the received image data in the state
//     } catch (error) {
//       console.error("Error fetching images:", error);
//     }
//   };

//   const renderImages = () => {
//     if (imagesData.length === 0) {
//       return <p>No images found.</p>;
//     }
  
//     return (
//       <div>
//         {imagesData.map((imageData, index) => {
//           // Convert the Uint8Array to a base64 string
//           const base64String = btoa(String.fromCharCode.apply(null, new Uint8Array(imageData.imageBytes)));
  
//           // Create the data URL for the image
//           const imgname = `data:${imageData.contentType};base64,${base64String}`;
  
//           return (
//             <div key={index}>
//               <h3>Image {index + 1}</h3>
//               <img src={imgname} alt={`Image ${index + 1}`} />
//             </div>
//           );
//         })}
//       </div>
//     );
//   };
  
  
  
//   const arrayBufferToBase64 = (buffer) => {
//     let binary = "";
//     const bytes = new Uint8Array(buffer);
//     const len = bytes.byteLength;
//     for (let i = 0; i < len; i++) {
//       binary += String.fromCharCode(bytes[i]);
//     }
//     return window.btoa(binary);
//   };

//   return (
//     <div>
//       <button onClick={getImagesData}>Get Images</button>
//       {renderImages()}
//     </div>
//   );
// };

// export default App;

//----------------------------------------------------------------------------------------------------------







import React, { useState } from 'react';
import axios from 'axios';
import { Carousel, CarouselItem, CarouselControl, CarouselIndicators} from 'reactstrap';

const ImageGallery= () => {
  const [file, setFile] = useState();
  const [uploadedFileData, setUploadedFileData] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const saveFile = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadFile = async () => {
    const formData = new FormData();
    formData.append("imageFile", file);

    try {
      const res = await axios.post("https://localhost:7046/api/Image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res);
    } catch (ex) {
      console.log(ex);
    }
  };

  const getFileData = async () => {
    try {
      const res = await axios.get("https://localhost:7046/api/Image", {
        responseType: "json",
      });
      console.log(res);
      setUploadedFileData(res.data.map((image) => image.fileContents));
    } catch (ex) {
      console.log(ex);
    }
  };

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === uploadedFileData.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? uploadedFileData.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const slides = uploadedFileData.map((fileData, index) => {
    return (
      <CarouselItem key={index} onExiting={() => setAnimating(true)} onExited={() => setAnimating(false)}>
        <img
          src={`data:image/jpeg;base64,${fileData}`}
          alt={`Uploaded File ${index + 1}`}
          style={{ display: 'block', margin: '0 auto', maxWidth: '100%', maxHeight: '100%' }}
        />
      </CarouselItem>
    );
  });
  return (
    <div>
      <input type="file" onChange={saveFile} />
      <button onClick={uploadFile}>Upload</button>
      <button onClick={getFileData}>Get File Data</button>
      {uploadedFileData.length > 0 && (
        <div>
          <h2>Uploaded File Data</h2>
          <div style={{ maxWidth: '650px', height: '600px', margin: '0 auto' }}>
            <Carousel activeIndex={activeIndex} next={next} previous={previous}>
              <CarouselIndicators items={uploadedFileData} activeIndex={activeIndex} onClickHandler={() => {}} />
              {slides}
              <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
              <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
            </Carousel>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
