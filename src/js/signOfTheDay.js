import React, { useState } from 'react';
import './styles.css';

function SignOfTheDay() {
  const [signName, setSignName] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);

  // The video source should point to the local video file
  const videoSrc = '/signOfTheDay/23260.mp4';

  const togglePlay = () => {
    const videoElement = document.getElementById('signVideo');

    if (videoElement) {
      if (isPlaying) {
        videoElement.pause();
      } else {
        videoElement.play();
      }

      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="container">
      <h1 className="header">Sign Of The Day:</h1>
      <p style={{ fontSize: '24px', margin: '0' }}>PAINTER</p>
      <div className="video-container">
        <video id="signVideo" controls style={{ transform: 'scaleX(1)' }}>
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="buttons">
        <button onClick={togglePlay}>
          {isPlaying ? 'Pause' : 'Play'}
        </button>
      </div>
      <p className="copyright">Video copyright: signingsavvy.com/signoftheday/</p>
    </div>
  );
}

export default SignOfTheDay;
