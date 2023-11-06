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
import './AppRouter';
import React, {useEffect, useRef, useState} from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useSpeechSynthesis } from 'react-speech-kit';
import {
  GestureRecognizer,
  FilesetResolver,
  DrawingUtils
} from "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3";
import AppRouter from './AppRouter';
import ReactSwitch from 'react-switch'
import ScreenRecorder from '../components/ScreenRecorder'

let gestureRecognizer = GestureRecognizer;
let webcamRunning = false;
let runningMode = "IMAGE";
let usedBefore=false;
const demosSection = document.getElementById("demos");
const videoHeight = "360px";
const videoWidth = "480px";
var val = '';
let speech_bool = false;

// TODO - Replace modelAssetPath with local path to pre-trained set - Do we need to include additional data to this?
const createGestureRecognizer = async () => {
  const vision = await FilesetResolver.forVisionTasks(
    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/wasm"
  );
    gestureRecognizer = await GestureRecognizer.createFromOptions(vision, {
    baseOptions: {
      modelAssetPath:
        "https://storage.googleapis.com/mediapipe_495/alphabet_asl.task",
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
  const [speech, setSpeech] = useState(false) 

  // text to speech variables
  const [value, setValue] = useState('');
  const { speak } = useSpeechSynthesis();
  // TODO: Make this functional with useState() - lagged for some
  useEffect(() => {
    if (usedBefore) { enableCam() }
    const enableTextToSpeech = () => {
      console.log('enabling')
      setValue('');
      speak({text: 'my speech here!'})
    }
    enableTextToSpeech();
    return () => {
      console.log('here')
      if (webcamRunning == true) {
        webcamRunning = false;
        usedBefore=true;
      }
    }
  }, [])
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
    // console.log("start web cam")
    const webcamElement = document.getElementById("webcam");
    if (runningMode === "IMAGE") {
      runningMode = "VIDEO";
      await gestureRecognizer.setOptions({ runningMode: "VIDEO"});
    }
    let nowInMs = Date.now();
    if (videoRef.current === null) {return;}
    if (videoRef.current && videoRef.current.currentTime !== lastVideoTime) {
      lastVideoTime = videoRef.current.currentTime;
      results = gestureRecognizer.recognizeForVideo(videoRef.current, nowInMs);
    }
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
    var categoryName = '';
    const gestureOutput = document.getElementById("gesture_output");
    if (results.gestures.length > 0) {
      gestureOutput.style.display = "block";
      gestureOutput.style.width = videoWidth;
      categoryName = results.gestures[0][0].categoryName;
      const categoryScore = parseFloat(
        results.gestures[0][0].score * 100
      ).toFixed(2);
      const handedness = results.handednesses[0][0].displayName;
      gestureOutput.innerText = 
      `GestureRecognizer: ${categoryName}\n Confidence: ${categoryScore} %\n Handedness: ${handedness}`;
    } else {
      gestureOutput.style.display = "none";
    }
    console.log("speech", speech_bool)
    if (val !== categoryName && speech_bool == true) {
      console.log(speech_bool)
      speak({text: categoryName})
      val = categoryName
    }

    if (webcamRunning === true) {
      window.requestAnimationFrame(predictWebcam);
    }
  }
  const handleChange = val => { 
    setSpeech(val)
    speech_bool = val;
    console.log(speech_bool) }

    function startRecording() {
      if (!videoRef.current || !canvasRef.current) {
        console.error('Video or Canvas Ref is not available');
        return;
      }
      const videoStream = videoRef.current.captureStream();
      const canvasStream = canvasRef.current.captureStream();

      if (!videoStream || !canvasStream) {
        console.error('Video or Canvas Stream is not available');
        return;
      }

      let combinedStream = new MediaStream([...videoStream.getTracks(), ...canvasStream.getTracks()]);

      let mediaRecorder = new MediaRecorder(combinedStream);

      let recordedChunks = [];
      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          recordedChunks.push(e.data);
        }
      };

      // startrecording: 
      mediaRecorder.start();

      let stopButton = document.querySelector("#stop-button");
      stopButton.addEventListener('click', function() {
        mediaRecorder.stop();
      })

      mediaRecorder.onstop = () => {
        let blob = new Blob(recordedChunks, {type: "video/webm"});
        let url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'recorded_video.webm';
        link.click();
      }

    }
  return (
    <div className="App">
      <h1>SignSavvy</h1>
      <p>Real-Time Translation</p>
      <p>Enable WebCam and begin signing</p>
      <button label="start" onClick={startRecording}><span>Start</span></button>
      <button id="stop-button" label="stop"><span>Stop</span></button>
      <div style={{display: 'inline-block'}}>
        <p>Text to Speech</p>
          <ReactSwitch checked={speech_bool} onChange={handleChange}></ReactSwitch>
      </div>
      <ScreenRecorder></ScreenRecorder>
      <header className="App-header">
        <section id="demos" className="invisible">
          <div id="liveView" className="videoView">
            <button id="webcamButton" className="mdc-button mdc-button-raised"
            onClick={enableCam}>
              <span className="mdc-button-label">Click to Enable Webcam</span>
            </button>
          </div>
          <div style={{position: 'relative'}}> 
            <video ref={videoRef} id="webcam" autoPlay playsInline></video>
            <canvas className='output_canvas' id='output_canvas' ref={canvasRef} 
                    style={{width: '1280', height: '720', position: 'absolute', left: '0px', top: '0px'}}></canvas>
            <p id='gesture_output' className="output"></p>
          </div>
        </section>
      </header>
    </div>
  );
}

export default App;
