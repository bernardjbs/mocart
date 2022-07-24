import React, { useState, useEffect, useCallback } from 'react';
import './gallery.css'
import Auth from '../../utils/auth';
import axios from 'axios';
import Dropdown from '../../components/dropdown/Dropdown';

const URI = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEV_URI : process.env.REACT_APP_PROD_URI;

function Gallery() {
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

  // Declaring States
  const [pictureFiles, setPictureFiles] = useState('');
  const [getPicturesData, setGetPicturesData] = useState([]);

  // Get pictures data
  const getPictureFiles = useCallback(async () => {
    try {
      const { data } = await axios.get(`${URI}/api/picture/pictures`);
      setGetPicturesData(data);
      return data; 
    } catch (error) {
      throw error;
    };
  }, []);

  // Upload Pictures API
  const pictureFilesUpload = async (data) => {
    try {
      await axios.post(`${URI}/api/picture/uploadmultiple`, data);
    } catch (error) {
      throw error;
    }
  }

  const getPictures = async () => {
    try {
      const pictures = await getPictureFiles();
      setGetPicturesData(pictures);
    } catch (error) {
      console.log(error);
    }
  }
  
  useEffect(() => {
    getPictureFiles()
      .catch(console.error);
  }, [getPictureFiles]);

  return (
    <>
      {/* {getPicturesData.map(data => <div key={data._id}>{data.filename}</div>)} */}
      <div className="row">
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
      <section className="pictures-section">
        <h1 className="test">My Pictures</h1>

        {getPicturesData.map((data) =>
          <div key={data._id} className="row">
            {data.filename}
            <div className='row quantity'>
              Quantity
              <input />
            </div>
            <Dropdown />
          </div>
        )}

      </section>
    </>
  )


};

export default Gallery;