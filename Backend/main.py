import os
import io
import uvicorn
import numpy as np
from PIL import Image
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import tensorflow as tf

# Logs block karne ke liye
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'
os.environ['TF_ENABLE_ONEDNN_OPTS'] = '0'

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

MODEL_PATH = "model.h5"
model = None

@app.on_event("startup")
def load_model():
    global model
    print("\n⏳ AI Model load ho raha hai...")
    model = tf.keras.models.load_model(MODEL_PATH)
    print("✅ AI Model successfully RAM me load ho gaya hai!\n")

@app.get("/")
def read_root():
    return {"message": "Skin Cancer Detection FastAPI Server is Running!"}

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    global model
    
    # 1. Image read karna
    contents = await file.read()
    image = Image.open(io.BytesIO(contents)).convert('RGB')
    
    # 2. EXACT RESIZE (Jo model ne manga: Width=100, Height=75)
    # PIL letea hai (width, height) format me configuration
    image = image.resize((100, 75))
    
    # 3. Preprocessing
    img_array = np.array(image) / 255.0  # Normalize to [0, 1]
    img_array = np.expand_dims(img_array, axis=0)  # Shape banega: (1, 75, 100, 3)
    
    # 4. Prediction
    predictions = model.predict(img_array)
    class_idx = np.argmax(predictions[0])
    confidence = float(predictions[0][class_idx]) * 100
    
    classes = ["akiec", "bcc", "bkl", "df", "mel", "nv", "vasc"]
    readable_names = {
        "akiec": "Actinic keratoses (Pre-cancerous)",
        "bcc": "Basal Cell Carcinoma (Cancerous)",
        "bkl": "Benign Keratosis (Non-cancerous)",
        "df": "Dermatofibroma (Non-cancerous)",
        "mel": "Melanoma (Highly Cancerous)",
        "nv": "Melanocytic Nevi (Normal Mole/Til)",
        "vasc": "Vascular Lesions (Normal Skin Mark)"
    }
    
    return {
        "class": readable_names[classes[class_idx]],
        "confidence": confidence
    }

if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)