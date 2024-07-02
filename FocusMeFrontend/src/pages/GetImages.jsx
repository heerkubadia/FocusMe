import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import "/Users/heerkubadia/Desktop/FocusMe/FocusMeFrontend/src/css/GetImages.css";
import { IconButton } from "@mui/material";
import { Download, Delete } from "@mui/icons-material";
import { motion } from "framer-motion";
import { toast } from 'react-toastify';

function GetImages() {
  const videoRef = useRef(null);
  const [isCameraInverted, setIsCameraInverted] = useState(true);
  const [isCameraStarted, setIsCameraStarted] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [IsImageUploaded, setIsImageUploaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiData, setApiData] = useState(null);
  const [photos, setPhotos] = useState([]);

  const getAllPhotos = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/upload/getallphotos', {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setPhotos(response?.data?.data);
    } catch (error) {
      console.error('Failed to fetch photos:', error);
    }
  };

  useEffect(() => {
    getAllPhotos();
  }, []);

  const handleImageUpload = async () => {
    try {
      setIsImageUploaded(true);
      setLoading(true);
      const response = await axios.post(
        "http://127.0.0.1:5000/verify",
        { base64: capturedImage },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setApiData(response.data);
      setLoading(false);

      if (response.data.length === 0) {
        toast.info('No matching pictures found.');
      }
    } catch (error) {
      console.error("Upload failed:", error);
      setLoading(false);
      toast.error('Upload failed. Please try again.');
    }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCameraStarted(true);
      }
    } catch (err) {
      console.error("Error accessing the camera: ", err);
    }
  };

  const captureImage = () => {
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const imageData = canvas.toDataURL("image/jpeg");
    setCapturedImage(imageData);
  };

  const handleDelete = async (id) => {
 
     try {
      await axios.delete(`http://localhost:5001/api/upload/deletephoto/${id}`);
     
      setPhotos(photos.filter((photo) => photo._id !== id));
      toast.success('Photo deleted successfully.');
    } catch (error) {
      console.error('Failed to delete photo:', error);
      toast.error('Failed to delete photo.');
    }
  };

  const handleSave = (base64) => {
    const link = document.createElement('a');
    link.href = base64;
    link.download = 'image.jpg';
    link.click();
    toast.success('Photo downloaded successfully.');
  };

  return (
    <div className="get-images-container">
      
      <motion.div
        className="description"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <h2>Take a Selfie and Find Your Photos!</h2>
        <br />
        <span>Take a selfie and upload it to find all the images featuring your face.</span>
        <p style={{ fontFamily: 'cursive', fontSize: '18px' }}><strong>Tip: </strong>Remove glasses and try to capture only your face for best results!</p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <button onClick={startCamera} className="action-button">
          Start Camera
        </button>
      </motion.div>
      <video
        ref={videoRef}
        autoPlay
        style={{
          width: "100%",
          height: "35rem",
          transform: isCameraInverted ? "rotateY(180deg)" : "none",
        }}
      />
      {isCameraStarted && (
        <>
          <button onClick={captureImage} className="action-button">
            Capture Image
          </button>
        </>
      )}
      {capturedImage && (
        <div className="captured-image-section">
          <h2>Captured Image:</h2>
          <img src={capturedImage} alt="Captured" className="captured-image" />
          <br />
          <button onClick={handleImageUpload} className="action-button">
            {loading ? "Fetching..." : "Fetch Images"}
          </button>
        </div>
      )}
      {isCameraStarted && !IsImageUploaded && (
        <p className="initial-message">Please upload your picture to find matching images.</p>
      )}
      {apiData && apiData.length > 0 && (
        <div className="matched-images-container">
          {apiData.map((data) => {
            const showImg = photos?.find((innerData) => innerData._id === data);
            return (
              <div className="image-container" key={data}>
                <div className="imgBtnBox">
                  
                  <IconButton
                    style={{ color: "#01070c", padding: "2px" }}
                    onClick={() => handleSave(showImg.base64)}
                  >
                    <Download />
                  </IconButton>
                </div>
                <img
                  src={showImg?.base64}
                  width={200}
                  alt=""
                  className="matched-image"
                  style={{ marginBottom: "1rem", width: '20rem' }}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default GetImages;
