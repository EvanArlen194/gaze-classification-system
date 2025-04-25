from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import tensorflow as tf
import numpy as np
from io import BytesIO
from PIL import Image

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model = tf.keras.layers.TFSMLayer("model/saved_model", call_endpoint="serving_default")

class_labels = ['close look', 'forward look', 'left look', 'right look']

@app.get("/")
def read_root():
    return {"message": "Eye Gaze API is running"}

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    try:
        image_bytes = await file.read()
        image = Image.open(BytesIO(image_bytes)).convert("L")  
        image = image.resize((60, 60))
        image_array = np.array(image, dtype=np.float32) / 255.0 
        image_array = np.expand_dims(image_array, axis=(0, -1)) 

        predictions = model(image_array)
        predictions = predictions["output_0"]
        predicted_class_index = int(np.argmax(predictions, axis=1)[0])
        predicted_class = class_labels[predicted_class_index]

        return {"prediction": predicted_class}

    except Exception as e:
        print("Prediction error:", e)
        raise HTTPException(status_code=500, detail=str(e))
    