
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
