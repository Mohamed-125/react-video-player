import React, { useState, useRef, useEffect } from "react";

const PlaypauseBtn = ({ videoRef, played, setPlayed, hoverAndOutHandler }) => {
  const playPauseToggle = () => {
    setPlayed((pre) => !pre);
  };

  useEffect(() => {
    const keydownHandler = (e) => {
      if (e.key === " ") {
        playPauseToggle();
      }
    };
    document.addEventListener("keydown", keydownHandler);
    return () => {
      document.removeEventListener("keydown", keydownHandler);
    };
  }, []);

  useEffect(() => {
    if (played) {
      hoverAndOutHandler();
      videoRef.current.play();
    } else {
      hoverAndOutHandler();
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
