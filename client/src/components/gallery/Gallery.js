import React, { useState, useEffect } from 'react';
import Auth from '../../utils/auth';
import axios from 'axios';

function Gallery() {
  const URI = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEV_URI : process.env.REACT_APP_PROD_URI;

  // Declaring States
  const [showPictures, setShowPictures] = useState([]);
  const [pictureFiles, setPictureFiles] = useState('');

  // Get Pictures API
  const getPictureFiles = async () => {
    try {
      const { data } = await axios.get(`${URI}/api/picture/pictures`);
      // console.log(data)
      return data;
    } catch (error) {
      throw error;
    }
  }

  // Upload Pictures API
  const pictureFilesUpload = async (data) => {
    try {
      await axios.post(`${URI}/api/picture/uploadmultiple`, data);
      // console.log(pictureFiles);

    } catch (error) {
      throw error;
    }
  }

  const getPictures = async () => {
    try {
      const pictures = await getPictureFiles();
      setShowPictures(pictures);
      console.log(showPictures);
    } catch (error) {
      console.log(error);
    }
  }

  const handlePictureFileChange = (e) => {
    setPictureFiles(e.target.files);
  }

  const handleUploadPictures = async (e) => {
    const formData = new FormData();
    for (let i = 0; i < pictureFiles.length; i++) {
      formData.append('files', pictureFiles[i]);
    }
    await pictureFilesUpload(formData);
    getPictures();
  }

  useEffect(() => {
    getPictures();
  }, [])

  return (
    <>
      <div className="row">
        <div className="col-6">
        </div>
        <div className="col-6">
          <div className="form-group">
            <label>Select Picture Files</label>
            <input type="file" onChange={(e) => handlePictureFileChange(e)} className="form-control" multiple />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-10">
          <button type="button" onClick={() => handleUploadPictures()} className="btn btn-danger">Upload</button>
        </div>
      </div>
      {/* <div className="col-6">
        <h4 className="text-success font-weight-bold">My Pictures</h4>
        {showPictures.map((element, index) =>
          <div key={element._id}>
            <h6 className="text-danger font-weight-bold">{element.filename}</h6>
            <div className="row">
              {element.files.map((file, index) =>
                <div className="col-6">
                  <div className="card mb-2 border-0 p-0">
                    <img src={`http://localhost:3000/server/uploads/${file.filePath}`} height="200" className="card-img-top img-responsive" alt="img" />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div> */}
    </>
  )


};

export default Gallery;