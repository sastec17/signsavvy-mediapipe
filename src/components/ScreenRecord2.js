import React, {useState} from 'react'

const RecordScreen = () => {
    let mediaRecorder;

    const start_click = async() => {
      console.log('made it to start click')
      let stream = await recordScreen();
      let mimeType = 'video/webm';
      mediaRecorder = createRecorder(stream, mimeType);
      let node = document.createElement("p");
      node.textContent = "started recording";
      document.body.appendChild(node);
    }

    const stop_click = async() => {
      mediaRecorder.stop();
      let node = document.createElement("p");
      node.textContent = "Stopped recording";
      document.body.appendChild(node);
    }


    async function recordScreen() {
      // Specify the display media options
      const displayMediaOptions = {
        video: {
          mediaSource: 'window', // Capture the window
          cursor: 'always' // Show cursor in the captured window
          // You can add more options here as needed
        },
        audio: true
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
        type: 'video/webm'
      });
      let filename = window.prompt('Enter file name'),
          downloadLink = document.createElement('a');
      downloadLink.href = URL.createObjectURL(blob);
      downloadLink.download = `${filename}.webm`;
  
      document.body.appendChild(downloadLink);
      downloadLink.click();
      URL.revokeObjectURL(blob); // clear from memory
      document.body.removeChild(downloadLink);
    }

    
    return (
      <div>
        <button id='start' onClick={start_click}><span>start recording</span></button>
        <button id='stop' onClick={stop_click}>stop recording</button>
      </div>
    )

}

export default RecordScreen