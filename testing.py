import matplotlib.pyplot as plt
from mediapipe_model_maker import gesture_recognizer
#from google.colab import files
import os
import tensorflow as tf
import mediapipe as mp
from mediapipe.tasks import python
from mediapipe.tasks.python import vision
assert tf.__version__.startswith('2')
"""IMAGES_PATH = "archive/asl_alphabet_train/asl_alphabet_train2"

# Get the list of labels from the list of folder names.
labels = []
for i in os.listdir(IMAGES_PATH):
  if os.path.isdir(os.path.join(IMAGES_PATH, i)):
    labels.append(i)
print(labels)
data = gesture_recognizer.Dataset.from_folder(
    dirname=IMAGES_PATH,
    hparams=gesture_recognizer.HandDataPreprocessingParams()
)
print(data)
# Split the archive into training, validation and test dataset.
train_data, rest_data = data.split(0.8)
validation_data, test_data = rest_data.split(0.5)

# Train the model
hparams = gesture_recognizer.HParams(export_dir="asl_alphabet_model")
options = gesture_recognizer.GestureRecognizerOptions(hparams=hparams)
model = gesture_recognizer.GestureRecognizer.create(
    train_data=train_data,
    validation_data=validation_data,
    options=options
)
loss, acc = model.evaluate(test_data, batch_size=1)
print(f"Test loss:{loss}, Test accuracy:{acc}")

# Export the model bundle.
model.export_model()"""

# Rename the file to be more descriptive.
#!mv rasl_alphabet_model/gesture_recognizer.task asl_alphabet_model.task

# Create a GestureRecognizer object.
model_path = os.path.abspath("asl_alphabet_model/gesture_recognizer.task")
recognizer = vision.GestureRecognizer.create_from_model_path(model_path)

# Load the input image.
image = mp.Image.create_from_file('TestF(1).jpg')

# Run gesture recognition.
recognition_result = recognizer.recognize(image)

# Display the most likely gesture.
top_gesture = recognition_result.gestures[0][0]
print(f"Gesture recognized: {top_gesture.category_name} ({top_gesture.score})")
