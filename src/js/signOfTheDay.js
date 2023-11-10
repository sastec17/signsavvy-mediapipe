import React, { useState, useEffect } from "react";
import "./styles.css";
import Cookies from "js-cookie";

function SignOfTheDay() {
  const [signName, setSignName] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [temp, setTemp] = useState("");

  // The video source should point to the local video file
  const videoSrc = "/signOfTheDay/23260.mp4";

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
    <div className="container">
      <div>Welcome {temp}</div>
      <h1 className="header">Sign Of The Day:</h1>
      <p style={{ fontSize: "24px", margin: "0" }}>PAINTER</p>
      <div className="video-container">
        <video id="signVideo" controls style={{ transform: "scaleX(1)" }}>
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="buttons">
        <button onClick={togglePlay}>{isPlaying ? "Pause" : "Play"}</button>
      </div>
      <p className="copyright">
        Video copyright: signingsavvy.com/signoftheday/
      </p>
    </div>
  );
}

export default SignOfTheDay;
