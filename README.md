# Eye Gaze Prediction System

This project is a web application that predicts the direction of a person's gaze (whether they are looking left, right, forward, or close) using a deep learning model. It consists of the following components:

- **Backend (FastAPI)**: An API that serves the TensorFlow model for gaze prediction.
- **Proxy (Express.js)**: A middleware to handle file uploads and forward them to the FastAPI backend.
- **Frontend (React with Vite)**: A user interface that allows users to upload an image and see the gaze prediction.

## Components Overview

### Backend

The backend is built with **FastAPI** and serves the TensorFlow model to predict eye gaze direction.

- **Model**: The model is a TensorFlow SavedModel format and is loaded in the FastAPI application.
- **API**: The `/predict` endpoint accepts image uploads, processes them, and returns the gaze prediction.

### Proxy

The proxy server is built with **Express.js** and acts as an intermediary between the frontend and the FastAPI backend.

- **File Upload**: The proxy handles image file uploads and forwards the request to the FastAPI server.

### Frontend

The frontend is built using **React** and **Vite**.

- **File Upload Interface**: Users can upload an image, and the app will send it to the backend for gaze prediction.
- **Prediction Display**: After receiving the prediction, it will be displayed to the user.

## Project Structure

```
eye-gaze-project/
├── backend/
│   ├── main.py                # FastAPI application
│   └── model/                 # Folder containing the saved TensorFlow model
│       ├── saved_model.pb
│       └── variables/
├── proxy/
│   └── server.js              # Express.js middleware to handle file uploads
├── frontend/
│   ├── public/
│   │   └── index.html         # Main HTML page for React app
│   ├── src/
│   │   ├── App.jsx            # React components
│   │   └── main.jsx           # React entry point
│   ├── package.json           # Dependencies for React app
├── requirements.txt           # Python dependencies
├── README.md                  # Project documentation
├── .gitignore                 # Git ignore file
└── vite.config.js             # Vite configuration for React
```

## Setup Instructions

### Prerequisites

Make sure you have the following installed:

- Python 3.x
- Node.js (for React + Express.js)
- pip (Python package manager)
- npm (Node package manager)

### Backend Setup

1. **Create a virtual environment** (recommended):

   ```bash
   python -m venv venv
   ```

2. **Activate the virtual environment**:

   - On Windows:
     ```bash
     .\venv\Scripts\activate
     ```
   - On macOS/Linux:
     ```bash
     source venv/bin/activate
     ```

3. **Install Python dependencies**:

   ```bash
   pip install -r requirements.txt
   ```

4. **Run the FastAPI backend**:
   ```bash
   cd backend
   uvicorn main:app --reload
   ```
   The FastAPI server will be running on `http://localhost:8000`.

### Proxy Setup (Express.js)

1. **Install Node.js dependencies**:
   Navigate to the `proxy` folder and run:

   ```bash
   cd proxy
   npm install
   ```

2. **Start the proxy server**:
   ```bash
   node server.js
   ```
   The Express.js proxy will be running on `http://localhost:3001`.

### Frontend Setup (React with Vite)

1. **Navigate to the `frontend` folder**:

   ```bash
   cd frontend
   ```

2. **Install React dependencies**:

   ```bash
   npm install
   ```

3. **Start the React App**:
   ```bash
   npm start
   ```
   The React frontend will be running on `http://localhost:3000`.

## Usage

1. Open the frontend in your browser (`http://localhost:3000`).
2. Upload an image by clicking the "Choose File" button.
3. Click the "Predict" button to get the gaze direction prediction.
4. The prediction will be displayed below the form.

## Example Response

After submitting an image, you will receive a prediction result like:

```json
{
  "prediction": "left look"
}
```

## Notes

- Make sure the FastAPI backend is running before you start the proxy or frontend.
- You may need to adjust the paths or model loading methods depending on your specific setup and environment.

## Troubleshooting

- If you encounter issues with CORS, make sure the proxy server is running and correctly forwarding requests.
- If you encounter issues loading the model, ensure the model file is placed correctly in the `backend/model/` directory.
