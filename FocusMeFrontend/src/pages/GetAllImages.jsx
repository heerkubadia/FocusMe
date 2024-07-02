import { Download, Delete } from "@mui/icons-material";
import { motion } from "framer-motion";
import React, { useState } from "react";
import axios from "axios";
import "../css/GetAllImages.css";
import { IconButton, CircularProgress } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function GetAllImages() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [photos, setPhotos] = useState(null);
  const [loading, setLoading] = useState(false);

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (password !== "") {
      setError(
        "Incorrect password or failed to fetch images. Please try again."
      );
      setPhotos(null);
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(
        "http://localhost:5001/api/upload/getallphotos"
      );
      if (response.data.data.length === 0) {
        setError("No Images Found!");
        setPhotos(null);
      } else {
        setPhotos(response.data.data);
        setError("");
      }
    } catch (error) {
      console.error("Error verifying password and fetching images:", error);
      setError("Failed to fetch images. Please try again.");
      toast.error("Failed to fetch images. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (photoId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5001/api/upload/deletephoto/${photoId}`
      );
      console.log("Photo deleted successfully:", response.data);
      setPhotos(photos.filter((photo) => photo._id !== photoId));
      toast.success("Photo deleted successfully.");
    } catch (error) {
      console.error("Error deleting photo:", error);
      toast.error("Failed to delete photo. Please try again.");
    }
  };

  const handleDeleteAll = async () => {
    try {
      const deletePromises = photos?.map((photo) =>
        axios.delete(
          `http://localhost:5001/api/upload/deletephoto/${photo._id}`
        )
      );
      await Promise.all(deletePromises);
      setPhotos(null);
      setError("No Images Found!");
      toast.success("All photos deleted successfully.");
    } catch (error) {
      console.error("Error deleting all photos:", error);
      toast.error("Failed to delete all photos. Please try again.");
    }
  };

  const handleSave = (imageUrl) => {
    const link = document.createElement("a");
    link.download = "image";
    link.href = imageUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Image downloaded successfully.");
  };

  const handleDownloadAll = async () => {
    for (let i = 0; i < photos.length; i++) {
      const link = document.createElement("a");
      link.download = `image_${i + 1}`;
      link.href = photos[i].base64;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Introducing a slight delay between downloads
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
    toast.success("All images downloaded successfully.");
  };

  return (
    <div className="page-container">
      <motion.div
        className="get-all-images-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <div className="page-description">
          <h2>Welcome to our image gallery! </h2> <br />
          Here, you can{" "}
          <span style={{ fontWeight: "bold" }}>
            explore all the images
          </span>{" "}
          stored in our database.To access the gallery, please enter the
          password below.
          <p style={{ fontFamily: "cursive", fontSize: "18px" }}>
            You can refresh the page at any time to exit the gallery.
          </p>
        </div>

        <form onSubmit={handlePasswordSubmit}>
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="password-input"
            />
          </label>
          <button type="submit" className="action-button">
            Submit
          </button>
        </form>
        {error && <p className="error-message">{error}</p>}
        {!error && !photos && !loading && (
          <p className="initial-message">
            Please enter the password to view all images.
          </p>
        )}

        {loading ? (
          <div className="loading-container">
            <CircularProgress />
          </div>
        ) : (
          photos && (
            <div>
              {photos.length > 0 ? (
                <div>
                  <h3 style={{ color: "#0d47a1" }}>All Images</h3>
                  <div className="image-grid">
                    {photos?.map((image) => (
                      <div className="imageMainBox" key={image._id}>
                        <div className="imgBtnBox">
                          <IconButton
                            style={{ color: "#01070c", padding: "2px" }}
                            onClick={() => handleDelete(image._id)}
                          >
                            <Delete />
                          </IconButton>
                          <IconButton
                            style={{ color: "#01070c", padding: "2px" }}
                            onClick={() => handleSave(image.base64)}
                          >
                            <Download />
                          </IconButton>
                        </div>
                        <img
                          key={image.id}
                          src={image.base64}
                          alt={image.name}
                          className="image-item"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="action-buttons">
                    <button
                      variant="contained"
                      color="secondary"
                      onClick={handleDeleteAll}
                    >
                      Delete All
                    </button>
                    <button
                      variant="contained"
                      color="primary"
                      onClick={handleDownloadAll}
                    >
                      Download All
                    </button>
                  </div>
                </div>
              ) : (
                <p className="no-images-message">{error}</p>
              )}
            </div>
          )
        )}
      </motion.div>

      
      <ToastContainer />
    </div>
  );
}

export default GetAllImages;
