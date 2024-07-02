import axios from "axios";
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import "/Users/heerkubadia/Desktop/FocusMe/FocusMeFrontend/src/css/HomePage.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

function Camera() {
  const videoRef = useRef(null);
  const [isCameraInverted, setIsCameraInverted] = useState(true);
  const [isCameraStarted, setIsCameraStarted] = useState(false);
  const [capturedImages, setCapturedImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = async () => {
    if (capturedImages.length === 0) {
      toast.warning('No images to upload!');
      return;
    }

    setLoading(true);
    console.log(capturedImages);
    try {
      const response = await axios.post(
        "http://localhost:5001/api/upload/photo",
        { base64: capturedImages },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response?.data?.data?.error) {
        setLoading(false);
        setCapturedImages([]);
        toast.success('Upload successful!');
      } else {
        toast.error('Upload failed!');
      }
      console.log("Upload successful:", response.data);
    } catch (error) {
      console.error("Upload failed:", error);
      toast.error('Upload failed!');
    }
    setLoading(false);
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      console.log("hi");
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCameraStarted(true);
        
      }
    } catch (err) {
      console.error("Error accessing the camera: ", err);
      toast.error('Error accessing the camera!');
    }
  };

  const invertCamera = () => {
    setIsCameraInverted(!isCameraInverted);
    
  };

  const captureImage = () => {
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext("2d");

    if (isCameraInverted) {
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
    }

    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

    const imageData = canvas.toDataURL("image/jpeg");
    setCapturedImages((data) => ([...data, imageData]));
    
  };

  return (
    <div>
      <div className="btnBox">
        {!isCameraStarted ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <button onClick={startCamera} className="action-button">
              Start Camera
            </button>
          </motion.div>
        ) : (
          <>
            <div>
              <button onClick={invertCamera}>
                {isCameraInverted ? "Invert Camera" : "Original View"}
              </button>
              <button onClick={captureImage}>Capture Image</button>
            </div>
            <br />
          </>
        )}
      </div>
      <br />
      <div className="videoBox">
        <video
          ref={videoRef}
          autoPlay
          style={{
            width: "40rem",
            height: "auto",
            transform: isCameraInverted ? "rotateY(180deg)" : "none",
          }}
        />
        {capturedImages.length > 0 && (
          <>
            <br />
            <div>
              <h2 style={{ textAlign: "center" }}>Captured Images:</h2>
              <div className="image-gridh">
                {capturedImages.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    className="image-itemh"
                    alt={`Captured ${index}`}
                    style={{ marginBottom: "1rem", width: '20rem' }}
                  />
                ))}
              </div>
            </div>
            <div className="btnBox">
              <button onClick={handleImageUpload}>
                {loading ? 'Uploading...' : 'Upload All'}
              </button>
            </div>
          </>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}

export default Camera;
