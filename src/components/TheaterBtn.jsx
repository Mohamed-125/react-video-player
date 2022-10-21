import React, { useState } from "react";
import { useEffect } from "react";

const TheaterBtn = () => {
  const [theaterMode, setTheaterMode] = useState(false);

  const toggleTheaterMode = () => {
    setTheaterMode((pre) => !pre);
  };
  useEffect(() => {
    if (theaterMode) {
      document.querySelector(".video-container").style.maxWidth = "1100px";
    } else {
      document.querySelector(".video-container").style.maxWidth = "750px";
    }
  }, [theaterMode]);

  useEffect(() => {
    document.addEventListener("keypress", (e) => {
      if (e.code === "KeyI") {
        setTheaterMode((pre) => !pre);
      }
    });
  }, []);

  return (
    <div className="theater-btn" onClick={toggleTheaterMode}>
      {!theaterMode ? (
        <svg height="100%" version="1.1" viewBox="0 0 36 36" width="100%">
          <use className="ytp-svg-shadow"></use>
          <path
            d="m 28,11 0,14 -20,0 0,-14 z m -18,2 16,0 0,10 -16,0 0,-10 z"
            fill="#fff"
            fillRule="evenodd"
            id="ytp-id-21"
          ></path>
        </svg>
      ) : (
        <svg height="100%" version="1.1" viewBox="0 0 36 36" width="100%">
          <use className="ytp-svg-shadow"></use>
          <path
            d="m 26,13 0,10 -16,0 0,-10 z m -14,2 12,0 0,6 -12,0 0,-6 z"
            fill="#fff"
            fillRule="evenodd"
            id="ytp-id-280"
          ></path>
        </svg>
      )}
    </div>
  );
};

export default TheaterBtn;
