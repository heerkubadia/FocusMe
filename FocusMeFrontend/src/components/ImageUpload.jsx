import React, { useCallback, useState } from 'react';
import { Button, TextField } from '@material-ui/core';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import '../css/UploadImages.css'; // Import the CSS file
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ImageUpload = () => {
  const [imageFiles, setImageFiles] = useState([]);
  const [base64Images, setBase64Images] = useState([]); // Optional for preview
  const [googleDriveLink, setGoogleDriveLink] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setImageFiles(selectedFiles);

    // Optional: Convert to base64 for preview or processing
    selectedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBase64Images((prevState) => [...prevState, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleFileUpload = async () => {
    if (base64Images.length === 0) {
      return;
    }

    setLoading(true);
    console.log(base64Images);
    try {
      const response = await axios.post(
        "http://localhost:5001/api/upload/photo",
        { base64: base64Images },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response?.data?.data?.error) {
        setLoading(false);
        setBase64Images([]);
        setImageFiles([]);
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

  const handleGoogleDriveUpload = async () => {
    if (!googleDriveLink.trim()) {
      return;
    }

    // Function to extract file ID from the Google Drive link
    const extractFileIdFromLink = (link) => {
      const regex = /\/d\/([a-zA-Z0-9_-]+)/;
      const match = link.match(regex);
      return match ? match[1] : null;
    };

    const fileId = extractFileIdFromLink(googleDriveLink);
    if (!fileId) {
      toast.error('Invalid Google Drive link!');
      return;
    }

    // Construct the thumbnail link
    const thumbnailLink = `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`;

    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5001/api/upload/photo",
        { googleDriveLink: thumbnailLink },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response?.data?.error) {
        setLoading(false);
        setGoogleDriveLink('');
        toast.success('Upload from Google Drive successful!');
      } else {
        toast.error('Upload from Google Drive failed!');
      }
      console.log("Upload from Google Drive successful:", response.data);
    } catch (error) {
      console.error("Upload from Google Drive failed:", error);
      toast.error('Upload from Google Drive failed!');
    }
    setLoading(false);
  };
  
  const onDrop = useCallback((acceptedFiles) => {
    setImageFiles((prevState) => [...prevState, ...acceptedFiles]);

    // Optional: Convert to base64 for preview or processing
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBase64Images((prevState) => [...prevState, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, multiple: true });

  return (
    <div className="image-upload-container">
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="input-file"
        multiple
      />
      <div {...getRootProps()} className={`dropzone-container ${isDragActive ? 'active' : ''}`}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here...</p>
        ) : (
          imageFiles.length > 0 ? (
            <div>
              <div className="image-previews">
                {base64Images.map((base64Image, index) => (
                  <img key={index} src={base64Image} alt={`Uploaded ${index}`} className="preview-image" />
                ))}
              </div>
              <br />
              <p>Click to select more files!</p>
            </div>
          ) : (
            <p>Drag 'n' drop some files here, or click to select files!</p>
          )
        )}
      </div>

      <TextField
        label="Google Drive Link"
        value={googleDriveLink}
        onChange={(e) => setGoogleDriveLink(e.target.value)}
        variant="outlined"
        fullWidth
        margin="normal"
      />

      <Button
        color="primary"
        variant="outlined"
        onClick={handleFileUpload}
        margin= "20px"
        className="upload-button"
        disabled={imageFiles.length === 0}
      >
        {loading ? 'Uploading...' : 'Upload from Files'}
      </Button>
{" "}
      <Button
        color="primary"
        variant="outlined"
        margin= "20px"
        onClick={handleGoogleDriveUpload}
        className="upload-button"
        disabled={!googleDriveLink.trim()}
      >
        {loading ? 'Uploading...' : 'Upload from Google Drive'}
      </Button>

      <ToastContainer />
    </div>
  );
};

export default ImageUpload;
