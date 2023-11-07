import React, { useState, useEffect } from 'react';
import './styles.css';

function SignOfTheDay() {
  const [signName, setSignName] = useState('');
  const [videoLink, setVideoLink] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Fetch the sign of the day data
    fetch('https://www.signingsavvy.com/signoftheday')
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.text();
      })
      .then((data) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(data, 'text/html');

        // Get the sign name
        const header = doc.querySelector('.signing_header h2').textContent;
        setSignName(header);

        // Get the video link
        const videoLink = doc.querySelector('link[rel="preload"][as="video"]').getAttribute('href');
        setVideoLink(videoLink);
      })
      .catch((error) => console.log(error));
  }, []);

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
      <h2 className="signName">{signName}</h2>
      <div className="video-container">
        <video id="signVideo" controls>
          <source src={videoLink} type="video/mp4" />
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
