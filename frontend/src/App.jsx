import React, { useState } from "react";
import "./index.css";

export default function App() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [prediction, setPrediction] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setPrediction("");

    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://localhost:5000/api/predict", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setPrediction(data.prediction);
    } catch (err) {
      console.error(err);
      setPrediction("Error saat memproses gambar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>🎯 Eye Gaze Prediction</h1>

      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={handleFileChange} />

        {preview && (
          <div style={{ textAlign: "center" }}>
            <img
              src={preview}
              alt="Preview"
              style={{
                width: "100%",
                maxHeight: "300px",
                objectFit: "contain",
                marginTop: "1rem",
                borderRadius: "0.5rem",
                border: "1px solid var(--color-border)",
                padding: "5px",
                backgroundColor: "#fafafa",
              }}
            />
          </div>
        )}

        <button type="submit" disabled={loading}>
          {loading ? "Processing..." : "Predict"}
        </button>
      </form>

      {prediction && (
        <div className="result">
          <h2>Prediction Result:</h2>
          <p>{prediction}</p>
        </div>
      )}
    </div>
  );
}
