import React, { useState } from "react";
import { useEffect } from "react";

const FullscreenBtn = () => {
  const [fullscreen, setFullscreen] = useState(false);
  const [isRendered, setIsRendered] = useState(false);
  useEffect(() => {
    if (!isRendered) {
      setIsRendered(true);
    } else {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        document.querySelector(".video-container").requestFullscreen();
      }
    }
  }, [fullscreen]);

  useEffect(() => {
    const fHandler = (e) => {
      if (e.code === "KeyF") {
        setFullscreen((pre) => !pre);
      }
    };
    document.addEventListener("keypress", fHandler);
    return () => {
      document.removeEventListener("keypress", fHandler);
    };
  }, []);

  return (
    <div
      className="fullscreen-btn"
      onClick={() => {
        setFullscreen((pre) => !pre);
      }}
    >
      {!fullscreen ? (
        <svg height="100%" version="1.1" viewBox="0 0 36 36" width="100%">
          <g className="ytp-fullscreen-button-corner-2">
            <use className="ytp-svg-shadow"></use>
            <path
              className="ytp-svg-fill"
              d="m 14,14 -4,0 0,2 6,0 0,-6 -2,0 0,4 0,0 z"
              id="ytp-id-905"
            ></path>
          </g>
          <g className="ytp-fullscreen-button-corner-3">
            <use className="ytp-svg-shadow"></use>
            <path
              className="ytp-svg-fill"
              d="m 22,14 0,-4 -2,0 0,6 6,0 0,-2 -4,0 0,0 z"
              id="ytp-id-906"
            ></path>
          </g>
          <g className="ytp-fullscreen-button-corner-0">
            <use className="ytp-svg-shadow"></use>
            <path
              className="ytp-svg-fill"
              d="m 20,26 2,0 0,-4 4,0 0,-2 -6,0 0,6 0,0 z"
              id="ytp-id-907"
            ></path>
          </g>
          <g className="ytp-fullscreen-button-corner-1">
            <use className="ytp-svg-shadow"></use>
            <path
              className="ytp-svg-fill"
              d="m 10,22 4,0 0,4 2,0 0,-6 -6,0 0,2 0,0 z"
              id="ytp-id-908"
            ></path>
          </g>
        </svg>
      ) : (
        <svg height="100%" version="1.1" viewBox="0 0 36 36" width="100%">
          <g className="ytp-fullscreen-button-corner-0">
            <use className="ytp-svg-shadow"></use>
            <path
              className="ytp-svg-fill"
              d="m 10,16 2,0 0,-4 4,0 0,-2 L 10,10 l 0,6 0,0 z"
              id="ytp-id-901"
            ></path>
          </g>
          <g className="ytp-fullscreen-button-corner-1">
            <use className="ytp-svg-shadow"></use>
            <path
              className="ytp-svg-fill"
              d="m 20,10 0,2 4,0 0,4 2,0 L 26,10 l -6,0 0,0 z"
              id="ytp-id-902"
            ></path>
          </g>
          <g className="ytp-fullscreen-button-corner-2">
            <use className="ytp-svg-shadow"></use>
            <path
              className="ytp-svg-fill"
              d="m 24,24 -4,0 0,2 L 26,26 l 0,-6 -2,0 0,4 0,0 z"
              id="ytp-id-903"
            ></path>
          </g>
          <g className="ytp-fullscreen-button-corner-3">
            <use className="ytp-svg-shadow"></use>
            <path
              className="ytp-svg-fill"
              d="M 12,20 10,20 10,26 l 6,0 0,-2 -4,0 0,-4 0,0 z"
              id="ytp-id-904"
            ></path>
          </g>
        </svg>
      )}
    </div>
  );
};

export default FullscreenBtn;
