import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const MiniPlayer = () => {
  const [miniplayer, setMiniPlayer] = useState(false);
  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => {
    document
      .querySelector(".video")
      .addEventListener("leavepictureinpicture", () => {
        setMiniPlayer(false);
      });
  }, []);
  useEffect(() => {
    if (!isRendered) {
      setIsRendered(true);
    } else {
      if (miniplayer) {
        document.querySelector(".video").requestPictureInPicture();
      } else if (!miniplayer) {
        if (document.pictureInPictureElement) document.exitPictureInPicture();
      }
    }
  }, [miniplayer]);

  return (
    <div
      className="miniplayer-btn"
      onClick={() => {
        setMiniPlayer((pre) => !pre);
      }}
    >
      <svg height="100%" version="1.1" viewBox="0 0 36 36" width="100%">
        <use className="ytp-svg-shadow"></use>
        <path
          d="M25,17 L17,17 L17,23 L25,23 L25,17 L25,17 Z M29,25 L29,10.98 C29,9.88 28.1,9 27,9 L9,9 C7.9,9 7,9.88 7,10.98 L7,25 C7,26.1 7.9,27 9,27 L27,27 C28.1,27 29,26.1 29,25 L29,25 Z M27,25.02 L9,25.02 L9,10.97 L27,10.97 L27,25.02 L27,25.02 Z"
          fill="#fff"
          id="ytp-id-20"
        ></path>
      </svg>
    </div>
  );
};

export default MiniPlayer;
