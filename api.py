from flask import Flask, request, jsonify
import base64
from io import BytesIO
from PIL import Image
import numpy as np
from pymongo import MongoClient
from matplotlib import pyplot as plt 
from deepface import DeepFace
import cv2
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


def base64_to_image(base64_str, save_path=None):
    if base64_str.startswith('data:image'):
        base64_str = base64_str.split(',')[1]
    image_data = base64.b64decode(base64_str)
    image = Image.open(BytesIO(image_data))
    if image.mode == 'RGBA':
        image = image.convert('RGB')
    if save_path:
        image.save(save_path)
    return image

def detect_faces(image):
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
    faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30))
    return faces

def verify_target_in_group(target_base64, group_base64):
    base64_to_image(target_base64, "target.jpg")
    group_image_data = base64.b64decode(group_base64.split(',')[1])
    group_image = cv2.imdecode(np.frombuffer(group_image_data, np.uint8), cv2.IMREAD_COLOR)
  
    detected_faces = detect_faces(group_image)
   
    if len(detected_faces) == 0:
        return False
  
    for (x, y, w, h) in detected_faces:
        face_image = group_image[y:y+h, x:x+w]
        cv2.imwrite("detected_face.jpg", face_image)
        result = DeepFace.verify(img1_path="target.jpg", img2_path="detected_face.jpg", enforce_detection=False)
      
        if result['verified'] :
            
            return True
    return False

def get_images(target_base64):
    client = MongoClient('mongodb+srv://Heer_K:heer1109@cluster0.50zjbey.mongodb.net/uploadedpaths',serverSelectionTimeoutMS=5000) 
    db = client['uploadedpaths']
    collection = db['photos']
    documents = collection.find({'base64': {'$exists': True, '$ne': None}})

    # target=documents[9]['base64']
    ans = []
    for data in documents:
        group_base64 = data['base64']
        is_target_in_group = verify_target_in_group(target_base64, group_base64)
        if is_target_in_group:
            ans.append(str(data['_id']))     
    client.close() 
    return ans        

@app.route('/verify', methods=['POST'])
def verify():
    data = request.get_json()
    target_base64 = data['base64']
    ans = get_images(target_base64)
    return jsonify(ans)

if __name__ == '__main__':
    app.run(debug=True)
