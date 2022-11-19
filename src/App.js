import React, { useState, useRef } from "react";
import { useEffect } from "react";
import "./App.css";
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
  const [played, setPlayed] = useState(true);
  const [quality, setQuality] = useState({ opened: false, value: 144 });
  const [savedTime, setSavedTime] = useState(0);
  const [video, setVideo] = useState(null);
  const [rendered, setRendered] = useState(false);
  const videoContainer = useRef();
  const videoAll = useRef();

  const hoverOnVideoContainerHandler = () => {
    videoAll.current.classList.add("hovered");
    videoContainer.current.classList.add("cursorShow");
    const outEvent = new Event("mouseout");
    setTimeout(() => {
      videoContainer.current.dispatchEvent(outEvent);
    }, 1000);
  };

  const mouseOutHandler = () => {
    videoAll.current.classList.remove("hovered");
    setTimeout(() => {
      videoContainer.current.classList.remove("cursorShow");
    }, 2000);
  };

  const hoverAndOutHandler = () => {
    const moveEvent = new Event("mousemove");
    const outEvent = new Event("mouseout");
    videoContainer.current.dispatchEvent(moveEvent);
    setTimeout(() => {
      videoContainer.current.dispatchEvent(outEvent);
    }, 300);
  };

  useEffect(() => {
    const arrowHandler = (e) => {
      if (e.key === "ArrowRight") {
        hoverAndOutHandler();
        videoRef.current.currentTime = videoRef.current.currentTime + 5;
      } else if (e.key === "ArrowLeft") {
        hoverAndOutHandler();
        videoRef.current.currentTime = videoRef.current.currentTime - 5;
      } else {
        return;
      }
    };

    videoContainer.current.addEventListener(
      "mousemove",
      hoverOnVideoContainerHandler
    );
    videoContainer.current.addEventListener("mouseout", mouseOutHandler);
    document.addEventListener("keydown", arrowHandler);
    return () => {
      document.removeEventListener("keydown", arrowHandler);
      videoContainer.current.removeEventListener(
        "mousemove",
        hoverOnVideoContainerHandler
      );
      videoContainer.current.removeEventListener("mouseout", mouseOutHandler);
    };
  }, []);

  useEffect(() => {
    if (savedTime > 0) {
      videoRef.current.currentTime = savedTime;
      videoRef.current.play();
    }
  }, [savedTime]);

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

  const fileChangeHandler = (e) => {
    setVideo(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <>
      <div className="app">
        <div className="video-container" ref={videoContainer}>
          {video ? (
            <>
              <video
                className="video"
                ref={videoRef}
                onClick={() => {
                  console.log("clicked");
                  setPlayed((pre) => !pre);
                }}
                onLoadedMetadata={({ target }) => {
                  setVideoDuration(target.duration);
                }}
                onTimeUpdate={({ target }) => {
                  setVideoCurrentTime(target.currentTime);
                }}
                src={video}
              ></video>
              <div className="video-controls-timeline-container" ref={videoAll}>
                <div className="timeline-div">
                  <input
                    type="range"
                    max={videoDuration}
                    value={videoCurrentTime}
                    step={5}
                    onChange={(e) => {
                      videoRef.current.currentTime = e.target.value;
                      setVideoCurrentTime(e.target.value);
                    }}
                  />
                </div>
                <div className="video-controls-div">
                  <div>
                    <PlaypauseBtn
                      videoRef={videoRef}
                      played={played}
                      rendered={rendered}
                      setPlayed={setPlayed}
                      videoContainer={videoContainer.current}
                      hoverAndOutHandler={hoverAndOutHandler}
                      hoverOnVideoContainerHandler={
                        hoverOnVideoContainerHandler
                      }
                      mouseOutHandler={mouseOutHandler}
                    />
                    <SoundBtn videoRef={videoRef} />
                    <p style={{ pointerEvents: "none", marginLeft: "4px" }}>
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
            </>
          ) : null}
        </div>
      </div>
      <div
        style={{
          marginInline: "auto",
          position: "relative",
          bottom: "40px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          justifyContent: "center",
          textAlign: "center",
          width: "fit-content",
        }}
      >
        <label>open another file</label>
        <input
          type="file"
          accept=".mp4"
          style={{ width: "200px" }}
          onChange={fileChangeHandler}
        />
      </div>
    </>
  );
}

export default App;
