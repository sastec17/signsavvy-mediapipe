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

import "../App.css";
import "./AppRouter";
import React, { useEffect, useRef, useState } from "react";
import { useSpeechSynthesis } from "react-speech-kit";
import {
  GestureRecognizer,
  FilesetResolver,
  DrawingUtils,
} from "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3";
import RecordScreen from "../components/ScreenRecord";
import ToggleSwitch from "../components/ToggleSwitch";
//import StylingContext, { StylingProvider } from './StylingContext';
import { useStyling } from "./StylingContext";
import Cookies from "js-cookie";

let gestureRecognizer = GestureRecognizer;
let webcamRunning = false;
let runningMode = "IMAGE";
let usedBefore = false;
const demosSection = document.getElementById("demos");
const videoHeight = "360px";
const videoWidth = "480px";
var val = "";

// TODO - Replace modelAssetPath with local path to pre-trained set - Do we need to include additional data to this?
const createGestureRecognizer = async () => {
  const vision = await FilesetResolver.forVisionTasks(
    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/wasm"
  );
  gestureRecognizer = await GestureRecognizer.createFromOptions(vision, {
    baseOptions: {
      modelAssetPath:
        "https://storage.googleapis.com/mediapipe_495/improved_asl.task",
      delegate: "GPU",
    },
    runningMode: runningMode,
  });
  if (demosSection) {
    demosSection.classList.remove("invisible");
  }
};

createGestureRecognizer();

function App() {
  // vars that rely on application to render first
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [shouldSpeech, setShouldSpeech] = useState(false);
  const shouldSpeechRef = useRef(shouldSpeech); // Create a ref to keep track of shouldSpeech

  const [camRunning, setCamRunning] = useState(false);
  const camRunningRef = useRef(camRunning); // Create a ref to keep track of camRunning

  const { speak } = useSpeechSynthesis();
  
  // variables for user preferences to alter translation text
  const {
    fontSize,
    setFontSize,
    fontColor,
    setFontColor,
    fontBackgroundColor,
    setFontBackgroundColor,
  } = useStyling();
  useEffect(() => {
    retrieveData();
  }, []);

  const retrieveData = async () => {
    try {
      const value = Cookies.get("login");
      const storedData = Cookies.get("login");
      const storedData2 = Cookies.get(storedData);
      const json = JSON.parse(storedData2);
      setFontSize(json.fontsize);
      setFontColor(json.fontcolor);
      setFontBackgroundColor(json.backgroundColor);
    } catch (error) {
      console.log(error);
    }
  };
  const translationTextStyle = {
    fontSize: fontSize || "24px", // Use a default value if fontSize is not set
    color: fontColor || "black", // Use a default value if fontColor is not set
    backgroundColor: fontBackgroundColor || "white", // Use a default value if fontBackgroundColor is not set
  };

  useEffect(() => {
    if (usedBefore) {
      enableCam();
    }
    return () => {
      if (webcamRunning === true) {
        webcamRunning = false;
        usedBefore = true;
      }
    };
  }, []);
  // Check if webcam access is supported.
  function hasGetUserMedia() {
    return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
  }
  // openWebCam
  function enableCam(event) {
    if (hasGetUserMedia()) {
      if (!gestureRecognizer) {
        alert("Please wait for gestureRecognizer to load");
        return;
      }
      if (webcamRunning === true) {
        webcamRunning = false;
        handleWebCamChange();
        // TODO - CHANGE TEXT WITHIN AN ELEMENT
      } else {
        webcamRunning = true;
        handleWebCamChange();
      }
      // getUsermedia parameters.
      const constraints = {
        video: true,
      };

      navigator.mediaDevices
        .enumerateDevices()
        .then((devices) => {
          const cameras = devices.filter(
            (device) => device.kind === "videoinput"
          );
          if (cameras.length === 0) {
            console.error("No camera found.");
          } else {
            // Proceed with camera access
            console.log("camera found");
          }
        })
        .catch((error) => {
          console.error("Error enumerating devices:", error);
        });

      // Activate the webcam stream
      navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;

          videoRef.current.addEventListener("loadeddata", predictWebcam);
        }
      });
    } else {
      console.warn("getUserMedia() is not supported by your browser");
    }
  }

  let lastVideoTime = -1;
  let results = undefined;
  async function predictWebcam() {
    // console.log("start web cam")
    const webcamElement = document.getElementById("webcam");
    if (runningMode === "IMAGE") {
      runningMode = "VIDEO";
      await gestureRecognizer.setOptions({ runningMode: "VIDEO" });
    }
    let nowInMs = Date.now();
    if (videoRef.current === null) {
      return;
    }
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
            color: "#FFFFFF",
            lineWidth: 1,
          }
        );
        drawingUtils.drawLandmarks(landmarks, {
          color: "#2196F9",
          lineWidth: 0.25,
        });
      }
    }
    canvasCtx.restore();
    var categoryName = "";
    var categoryScore = 0;
    const gestureOutput = document.getElementById("gesture_output");
    if (results.gestures.length > 0) {
      gestureOutput.style.display = "block";
      gestureOutput.style.width = videoWidth;
      categoryName = results.gestures[0][0].categoryName;
      categoryScore = parseFloat(results.gestures[0][0].score * 100).toFixed(2);
      let handedness = results.handednesses[0][0].displayName;
      if (handedness === "Right") {
        handedness = "Left";
      } else {
        handedness = "Right";
      }
      gestureOutput.innerText = `Sign Recognized: ${categoryName}\n Confidence: ${categoryScore} %\n Handedness: ${handedness}`;
    } else {
      gestureOutput.style.display = "none";
    }
    if (
      val !== categoryName &&
      shouldSpeechRef.current === true &&
      categoryScore > 85
    ) {
      speak({ text: categoryName });
      val = categoryName;
    }

    if (webcamRunning === true) {
      window.requestAnimationFrame(predictWebcam);
    }
  }

  const handleWebCamChange = () => {
    setCamRunning((prevCamRunning) => {
      camRunningRef.current = !prevCamRunning; // Update the ref directly
      return !prevCamRunning;
    });
  };

  const handleCheckboxChange = () => {
    setShouldSpeech((prevShouldSpeech) => {
      shouldSpeechRef.current = !prevShouldSpeech; // Update the ref directly
      return !prevShouldSpeech;
    });
  };

  return (
    <>
      <header className="bg-white shadow flex items-center">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Real-Time Translation
          </h1>
        </div>
      </header>
      <div className="text-center flex flex-col justify-center m-1">
        <p>Enable WebCam and begin signing</p>

        <ToggleSwitch
          label={"Text to Speech"}
          checked={shouldSpeechRef.current}
          setChecked={handleCheckboxChange}
        ></ToggleSwitch>

        <header className="min-h-screen flex flex-row justify-center text-base sm:text-md ">
          <section id="demos">
            <div id="liveView" className="videoView">
              {camRunningRef.current && <RecordScreen></RecordScreen>}
              <button
                id="webCamButton"
                onClick={enableCam}
                className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-full m-1"
              >
                <span>
                  {!camRunningRef.current ? (
                    <>Enable Camera</>
                  ) : (
                    <>Disable Predictions</>
                  )}
                </span>
              </button>
            </div>
            <div style={{ position: "relative" }}>
              <video ref={videoRef} id="webcam" autoPlay playsInline></video>
              <canvas
                className="output_canvas"
                id="output_canvas"
                ref={canvasRef}
                style={{
                  width: "1280",
                  height: "720",
                  position: "absolute",
                  left: "0px",
                  top: "0px",
                }}
              ></canvas>
              <p
                style={translationTextStyle}
                id="gesture_output"
                className="hidden sm:block w-full text-base sm:text-[calc(8px+1.2vw)]"
              ></p>
            </div>
          </section>
        </header>
      </div>
    </>
  );
}

export default App;
