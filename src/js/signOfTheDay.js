import React, { useState, useEffect } from "react";
import "./styles.css";
import Cookies from "js-cookie";

function SignOfTheDay() {
  const [signName, setSignName] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [temp, setTemp] = useState("");

  // The video source should point to the local video file
  const videoSrc = "/signOfTheDay/23315.mp4";

  const togglePlay = () => {
    const videoElement = document.getElementById("signVideo");

    if (videoElement) {
      if (isPlaying) {
        videoElement.pause();
      } else {
        videoElement.play();
      }

      setIsPlaying(!isPlaying);
    }
  };
  useEffect(() => {
    if (Cookies.get("login")) {
      const storedData = Cookies.get("login");
      const storedData2 = Cookies.get(storedData);
      const json = JSON.parse(storedData2);
      setTemp(json.firstName);
    }
  });
  return (
    <>
    <header className="bg-white shadow flex items-center">
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900">Sign of the Day</h1>
    </div>
    </header>
    <div className="flex flex-col items-center p-10 border-black rounded-10 max-w-500 mx-auto">
      <div>Welcome {temp}!</div>
      <p style={{ fontSize: "24px", margin: "0" }}>COST AN ARM AND A LEG</p>
      <div className="video-container">
        <video id="signVideo" controls style={{ transform: "scaleX(1)" }}>
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
    </>
  );
}

export default SignOfTheDay;