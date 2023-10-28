// Copyright 2023 The MediaPipe Authors.

// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at

//      http://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// Code reformatted by EECS 495 SignSavvy team. Based on Mediapipe's code

import '../App.css';
import React, {useRef} from 'react';
import {
  GestureRecognizer,
  FilesetResolver,
  DrawingUtils
} from "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3";
let gestureRecognizer = GestureRecognizer;
let webcamRunning = false;
let runningMode = "IMAGE";
const demosSection = document.getElementById("demos");
const videoHeight = "360px";
const videoWidth = "480px";
// TODO - Replace modelAssetPath with local path to pre-trained set - Do we need to include additional data to this?
const createGestureRecognizer = async () => {
  const vision = await FilesetResolver.forVisionTasks(
    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/wasm"
  );
    gestureRecognizer = await GestureRecognizer.createFromOptions(vision, {
    baseOptions: {
      modelAssetPath:
        "https://storage.googleapis.com/mediapipe_495/gesture_recognizer.task",
      delegate: "GPU"
    },
    runningMode: runningMode
  })
  if (demosSection) {
    demosSection.classList.remove("invisible");

  }
};

createGestureRecognizer();

function App() {
  // vars that rely on application to render first
  const videoRef=useRef(null);
  const canvasRef=useRef(null);
  
  const handleClick = () => {
    const element = document.getElementById('myButton');
    if (element) {
      element.style.backgroundColor = 'green';
      element.style.color = 'white'; 
      element.style.border = 'none'; 
      element.style.padding = '10px 20px'; 
      element.style.borderRadius = '10px'; 
      element.style.cursor = 'pointer';
    }
  }
  // Check if webcam access is supported.
  function hasGetUserMedia() {
    return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
  }
 
  // openWebCam
  function enableCam(event) {
    if (hasGetUserMedia()) {
      if (!gestureRecognizer) {
        alert("Please wait for gestureRecognizer to load");
        return
      }
      if (webcamRunning === true) {
        webcamRunning = false;
        // TODO - CHANGE TEXT WITHIN AN ELEMENT
      } else {
        webcamRunning = true;
      }
        // getUsermedia parameters.
      const constraints = {
        video: true
      };
      // Activate the webcam stream
      navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;

          videoRef.current.addEventListener("loadeddata", predictWebcam);
        }        
      })
    } else {
      console.warn("getUserMedia() is not supported by your browser")
    }
  }

  let lastVideoTime = -1;
  let results = undefined;
  async function predictWebcam() {
    console.log("start web cam")
    const webcamElement = document.getElementById("webcam");
    if (runningMode === "IMAGE") {
      runningMode = "VIDEO";
      await gestureRecognizer.setOptions({ runningMode: "VIDEO"});
    }
    let nowInMs = Date.now();
    if (videoRef.current.currentTime !== lastVideoTime) {
      lastVideoTime = videoRef.current.currentTime;
      results = gestureRecognizer.recognizeForVideo(videoRef.current, nowInMs);
    }
    console.log(canvasRef);
    const canvasElement = canvasRef.current;
    const canvasCtx = canvasElement.getContext("2d");
    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    const drawingUtils = new DrawingUtils(canvasCtx);
    canvasElement.style.height = videoHeight;
    webcamElement.style.height = videoHeight;
    canvasElement.style.width = videoWidth;
    webcamElement.style.width = videoWidth;

    if (results.landmarks) {
      console.log('made it into landmarks')
      for (const landmarks of results.landmarks) {
        drawingUtils.drawConnectors(
          landmarks,
          GestureRecognizer.HAND_CONNECTIONS,
          {
            color: "#00FF00",
            lineWidth: 5
          }
        );
        drawingUtils.drawLandmarks(landmarks, {
          color: "#FF0000",
          lineWidth: 2
        });
      }
    }
    canvasCtx.restore();
    const gestureOutput = document.getElementById("gesture_output");
    if (results.gestures.length > 0) {
      gestureOutput.style.display = "block";
      gestureOutput.style.width = videoWidth;
      const categoryName = results.gestures[0][0].categoryName;
      const categoryScore = parseFloat(
        results.gestures[0][0].score * 100
      ).toFixed(2);
      const handedness = results.handednesses[0][0].displayName;
      gestureOutput.innerText = 
      `GestureRecognizer: ${categoryName}\n Confidence: ${categoryScore} %\n Handedness: ${handedness}`;
    } else {
      gestureOutput.style.display = "none";
    }
    if (webcamRunning === true) {
      window.requestAnimationFrame(predictWebcam);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>SignSavvy</h1>
        <button id='myButton' onClick={handleClick}
        > Click to change colors!!! </button>
        <section id="demos" className="invisible">
          <div id="liveView" className="videoView">
            <button id="webcamButton" className="mdc-button mdc-button-raised"
            onClick={enableCam}>
              <span className="mdc-button-label">Enable Webcam!</span>
            </button>
          </div>
    
          <div style={{position: 'relative'}}> 
            <video ref={videoRef} id="webcam" autoPlay playsInline></video>
            <canvas className='output_canvas' id='output_canvas' ref={canvasRef} style={{width: '1280'}}></canvas>
            <p id='gesture_output' className="output"></p>
          </div>
        </section>
      </header>
    </div>
  );
}

export default App;
