import mediapipe as mp 
from mediapipe.tasks import python
from mediapipe.tasks import vision 
import os

model_path = os.path.abspath('./gesture_recognizer.task')
recognizer = vision.GestureRecognizer.create_from_model_path(model_path)

#load the image
image = mp.Image.create_from_file('photo.jpg')

recognition_result = recognizer.recognize(image)

top_gesture = recognition_result.gestures[0][0]
print(f"Gesture Recognizer: {top_gesture.category_name}")