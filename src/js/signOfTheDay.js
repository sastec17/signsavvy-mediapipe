import React, { useState, useEffect } from "react";
import "./styles.css";
import Cookies from "js-cookie";


function SignOfTheDay() {
  const [temp, setTemp] = useState("");
  const filesContext = require.context('/public/signOfTheDay', false, /\.(|mov|mp4)$/);
  const fileNames = filesContext.keys().map(key => key.split('/').pop());
  // simulate rotation 
  const date = new Date()
  const current_day = date.getDay()

  const video_to_load = current_day % fileNames.length
  // The video source should point to the local video file
  const videoSrc = `/signOfTheDay/` + fileNames[video_to_load];
  const sign_name = fileNames[video_to_load].slice(0, -4)

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
      <p style={{ fontSize: "24px", margin: "0" }}>{sign_name}</p>
      <div className="video-container">
        <video id="signVideo" controls muted style={{ transform: "scaleX(1)" }}>
        <source src={filesContext(`./${fileNames[video_to_load]}`)} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
    </>
  );
}

export default SignOfTheDay;