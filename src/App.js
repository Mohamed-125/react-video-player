import React, { useState, useRef } from "react";
import { useEffect } from "react";
import "./App.css";
import v144 from "./assets/144.mp4";
import v240 from "./assets/240.mp4";
import v360 from "./assets/360.mp4";
import v480 from "./assets/480.mp4";
import FullscreenBtn from "./components/FullscreenBtn";
import MiniPlayer from "./components/MiniPlayer";
import PlaypauseBtn from "./components/PlaypauseBtn";
import SettingsBtn from "./components/SettingsBtn";
import SoundBtn from "./components/SoundBtn";
import TheaterBtn from "./components/TheaterBtn";

function App() {
  const videoRef = useRef();
  const [videoCurrentTime, setVideoCurrentTime] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);
  const [played, setPlayed] = useState(false);
  const [quality, setQuality] = useState({ opened: false, value: 144 });
  const [savedTime, setSavedTime] = useState(0);

  useEffect(() => {
    if (savedTime > 0) {
      videoRef.current.currentTime = savedTime;
      videoRef.current.play();
    }
  }, [savedTime]);

  const changeVideoTimeHandler = (value) => {
    setVideoCurrentTime(value);
    videoRef.current.currentTime = value;
  };

  useEffect(() => {
    if (videoCurrentTime === videoDuration) {
      setPlayed(false);
    }
    document.querySelector(".timeline-div").style.setProperty(
      "--width",
      `
    ${(videoCurrentTime / videoDuration) * 100}%
    `
    );
  }, [videoCurrentTime]);

  const formatTime = (time) => {
    const seconds = Math.floor(time % 60);
    const minutes = Math.floor(time / 60) % 60;
    const hours = Math.floor(time / 3600);
    const putZero = new Intl.NumberFormat(undefined, {
      minimumIntegerDigits: 2,
    });
    if (hours === 0) {
      return `${minutes}:${putZero.format(seconds)}`;
    } else {
      return `${hours}:${putZero.format(minutes)}:${putZero.format(seconds)}`;
    }
  };
  return (
    <div className="app">
      <div className="video-container">
        <video
          className="video"
          ref={videoRef}
          onLoadedMetadata={({ target }) => {
            setVideoDuration(target.duration);
          }}
          onTimeUpdate={({ target }) => {
            setVideoCurrentTime(target.currentTime);
          }}
          src={
            quality.value === 144
              ? v144
              : quality.value === 240
              ? v240
              : quality.value === 360
              ? v360
              : quality.value === 480
              ? v480
              : null
          }
        ></video>
        <div className="video-controls-timeline-container">
          <div
            className={`timeline-div`}
            onDrag={(e) => {
              if (e.buttons !== 2) {
                const rect = e.target.getBoundingClientRect();
                const precent = Math.min(
                  Math.max(0, (e.clientX - rect.x) / rect.width),
                  rect.width + 50
                );
                document.querySelector(".video-container").style.filter =
                  "brightness(0.7)";
                setPlayed(false);
                changeVideoTimeHandler(precent * videoDuration);
              }
            }}
            onDragEnd={(e) => {
              if (e.buttons !== 2) {
                const rect = e.target.getBoundingClientRect();
                const precent = Math.min(
                  Math.max(0, (e.clientX - rect.x) / rect.width),
                  rect.width + 50
                );
                setPlayed(true);
                document.querySelector(".video-container").style.filter =
                  "brightness(1)";
                changeVideoTimeHandler(precent * videoDuration);
              }
            }}
            onMouseDown={(e) => {
              if (e.buttons !== 2) {
                const rect = e.target.getBoundingClientRect();
                const precent = Math.min(
                  Math.max(0, (e.clientX - rect.x) / rect.width),
                  rect.width + 50
                );
                changeVideoTimeHandler(precent * videoDuration);
              }
            }}
          >
            <div className="timeline-progress-bar"></div>
          </div>
          <div className="video-controls-div">
            <div>
              <PlaypauseBtn
                videoRef={videoRef}
                played={played}
                setPlayed={setPlayed}
              />
              <SoundBtn videoRef={videoRef} />
              <p style={{ pointerEvents: "none" }}>
                {formatTime(videoCurrentTime) + " " + " "} /
                {" " + " " + formatTime(videoDuration)}
              </p>
            </div>
            <div>
              <SettingsBtn
                quality={quality}
                setQuality={setQuality}
                setSavedTime={setSavedTime}
                videoRef={videoRef}
              />
              <FullscreenBtn videoRef={videoRef} />
              <TheaterBtn />
              <MiniPlayer />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
