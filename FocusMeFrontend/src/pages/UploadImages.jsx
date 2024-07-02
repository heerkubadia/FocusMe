import React from 'react';
import ImageUpload from '../components/ImageUpload';
import '../css/UploadImages.css'; // Import CSS file
import { motion } from "framer-motion";

const UploadImages = () => {
  return (
    <div className="upload-container">
      
      <motion.div
        className="upload-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
      <p style={{fontSize:"30px",color:"#0d47a1",fontWeight:"bold"}}>Upload your memories!</p> <br />
      <p><strong>Upload images</strong> from your device, and they will be securely saved in the database.</p>
         
        <ImageUpload/>
        </motion.div>
      </div>
    
  );
}

export default UploadImages;
