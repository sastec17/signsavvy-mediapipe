import React, { useRef, useState } from 'react';
import RecordRTC from 'recordrtc';

const ScreenRecorder = () => {
  const [recording, setRecording] = useState(false);
  const [recordedVideoURL, setRecordedVideoURL] = useState('');
  const recorderRef = useRef(null);
  const canvasRef = useRef(null);

  const recordScreen = async () => {
    const demosSection = document.getElementById('demos');
    const videoElement = demosSection.querySelector('video');
    const canvasElement = demosSection.querySelector('.output_canvas');

    if (videoElement && canvasElement) {
      const stream = videoElement.captureStream();
      const recorder = RecordRTC(stream, {
        type: 'video',
      });

      recorderRef.current = recorder;

      recorder.startRecording();
      setRecording(true);

      // After some time, stop recording
      setTimeout(() => {
        recorder.stopRecording(() => {
          setRecording(false);
          const combinedStream = mergeStreams(videoElement, canvasElement);
          const mergedRecorder = RecordRTC(combinedStream, {type: 'video'});
          mergedRecorder.stopRecording(()=>{
            const blob = mergedRecorder.getBlob();
            const url = URL.createObjectURL(blob);
            setRecordedVideoURL(url);
          })
        });
      }, 3000); // 3 seconds
    }
  };
  const mergeStreams = (video, canvas) => {
    const canvasStream = canvas.captureStream(25); // FPS set to 25
    const videoStream = video.captureStream();
    const audioContext = new AudioContext();

    const canvasSource = audioContext.createMediaElementSource(canvas);
    const destination = audioContext.createMediaStreamDestination();
    canvasSource.connect(destination);

    const canvasAudioStream = destination.stream;

    const allStreams = [canvasStream, videoStream, canvasAudioStream];

    return new MediaStream(allStreams.map((stream) => new MediaStream(stream.getTracks())));
  };

  const downloadVideo = () => {
    const a = document.createElement('a');
    a.href = recordedVideoURL;
    a.download = 'recorded-video.webm';
    a.click();
  };

  return (
    <div>
      <button onClick={recordScreen}>
        {recording ? 'Recording...' : 'Record Screen'}
      </button>
      {recordedVideoURL && (
        <button onClick={downloadVideo}>Download Recorded Video</button>
      )}
    </div>
  );
};

export default ScreenRecorder;
