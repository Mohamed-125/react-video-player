import React, { useState, useRef, useEffect } from "react";

const PlaypauseBtn = ({ videoRef, played, setPlayed }) => {
  const playPauseToggle = () => {
    setPlayed((pre) => !pre);
  };

  useEffect(() => {
    document.addEventListener("keypress", (e) => {
      if (e.code === "Space") {
        setPlayed((pre) => !pre);
      }
    });
  }, []);

  useEffect(() => {
    if (played) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  }, [played]);

  return (
    <div
      onClick={playPauseToggle}
      className={`playpause ${played ? "playing" : null}`}
    >
      <button className="button" />
    </div>
  );
};

export default PlaypauseBtn;
