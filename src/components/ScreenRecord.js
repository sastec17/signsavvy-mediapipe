// Screen recorder component for real time translation
import React, {useState} from 'react'

const RecordScreen = () => {
    const [recording, setRecording] = useState(false);
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const [mediaStream, setMediaStream] = useState(null);

    const start_click = async() => {
      let stream = await recordScreen();
      let mimeType = 'video/mp4';
      const recorder = createRecorder(stream, mimeType);
      setMediaRecorder(recorder);
      setMediaStream(stream);
      setRecording(true);
      console.log(mediaRecorder)
    }

    const stop_click = async() => {
      // stop media recording
      if (mediaRecorder) {
        mediaRecorder.stop();
      }
      // stop the screen share
      if (mediaStream) {
        mediaStream.getTracks().forEach(track => track.stop());
      }
      // clean up variables for next recording
      setRecording(false);
      setMediaRecorder(null);
      setMediaStream(null);
    }

    async function recordScreen() {
      // Specify the display media options
      const displayMediaOptions = {
        video: {
          mediaSource: 'screen', // Capture the window
          cursor: 'always', // Show cursor in the captured window
          // You can add more options here as needed
        },

        preferCurrentTab: true,
        audio: {
          systemAudio: 'include'
        }
      };
      return await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);
    }

    function createRecorder (stream, mimeType) {
      let recordedChunks = [];

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.ondataavailable = function (e) {
        if (e.data.size > 0) {
          recordedChunks.push(e.data);
        }
      };
      mediaRecorder.onstop = function () {
        saveFile(recordedChunks);
        recordedChunks = [];
      };
      mediaRecorder.start(200); // every 200ms store in separate chunks
      return mediaRecorder;
    }

    function saveFile(recordedChunks) {
      const blob = new Blob(recordedChunks, {
        type: 'video/mp4'
      });
      let filename = window.prompt('Enter file name'),
      downloadLink = document.createElement('a');
      downloadLink.href = URL.createObjectURL(blob);
      downloadLink.download = `${filename}.mp4`;
  
      document.body.appendChild(downloadLink);
      downloadLink.click();
      URL.revokeObjectURL(blob); // clear from memory
      document.body.removeChild(downloadLink);
    }

    return (
      <div>
        {recording ? 
          <button id='stop' onClick={stop_click}>stop recording</button> :
          <button id='start' onClick={start_click}><span>start recording</span></button>
        }
      </div>
    )

}

export default RecordScreen