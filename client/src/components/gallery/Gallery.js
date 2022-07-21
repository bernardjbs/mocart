import React, { useState } from 'react';
import Auth from '../../utils/auth';
import axios from 'axios';



function Gallery(props) {
  const URI = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEV_URI : process.env.REACT_APP_PROD_URI;

  const [pictureFiles, setPictureFiles] = useState('');

  const PictureFileChange = (e) => {
    setPictureFiles(e.target.files);
  }

  const pictureFilesUpload = async (data) => {
    try {
      await axios.post(`${URI}/api/picture/uploadmultiple`, data);
    } catch (error) {
      throw error;
    }
  }

  const UploadPictureFiles = async (e) => {
    const formData = new FormData();
    for (let i = 0; i < pictureFiles.length; i++) {
      formData.append('files', pictureFiles[i]);
    }
    await pictureFilesUpload(formData);
    props.getPictures();
  }

  return (
    <>
      <div className="row">
        <div className="col-6">
          <label >Title</label>
        </div>
        <div className="col-6">
          <div className="form-group">
            <label>Select Picture Files</label>
            <input type="file" onChange={(e) => PictureFileChange(e)} className="form-control" multiple />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-10">
          <button type="button" onClick={() => UploadPictureFiles()} className="btn btn-danger">Upload</button>
        </div>

      </div>

    </>
  )


};

export default Gallery;