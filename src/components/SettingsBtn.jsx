import React, { useState } from "react";
import { useEffect } from "react";

const SettingsBtn = ({ setQuality, quality, setSavedTime, videoRef }) => {
  const [settings, setSettings] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState({
    opened: false,
    value: 1,
  });
  // const [availableQualities] = useState([144, 240, 360, 480]);
  useEffect(() => {
    if (!settings) {
      // setQuality((pre) => {
      //   return { ...pre, opened: false };
      // });
      setPlaybackSpeed((pre) => {
        return { ...pre, opened: false };
      });
    }
  }, [settings]);

  // useEffect(() => {
  //   if (quality.opened && settings) {
  //     document.querySelector(".quality-container").style.animation =
  //       "options-enter-animation forwards 0.3s";
  //   } else if (!quality.opened && settings) {
  //     document.querySelector(".quality-container").style.animation =
  //       "options-exit-animation forwards 0.3s";
  //   }
  // }, [quality.opened]);

  useEffect(() => {
    if (playbackSpeed.opened && settings) {
      document.querySelector(".speed-container").style.animation =
        "options-enter-animation forwards 0.3s";
    } else if (!playbackSpeed.opened && settings) {
      document.querySelector(".speed-container").style.animation =
        "options-exit-animation forwards 0.3s";
    }
  }, [playbackSpeed.opened]);

  useEffect(() => {
    videoRef.current.playbackRate = playbackSpeed.value;
  }, [playbackSpeed.value]);

  return (
    <div className="settings-btn">
      {settings ? (
        <div className="settings-container">
          <div className={`options-container  speed-container`}>
            <div>
              <p
                onClick={() => {
                  setPlaybackSpeed((pre) => {
                    return { ...pre, opened: false };
                  });
                }}
              >
                back
              </p>
              <div>
                {[0.25, 0.5, 1, 1.25, 1.5, 2].map((speed) => (
                  <p
                    onClick={() => {
                      setPlaybackSpeed((pre) => ({
                        ...pre,
                        value: speed,
                      }));
                    }}
                    style={
                      playbackSpeed.value === speed
                        ? {
                            fontWeight: "bold",
                          }
                        : {
                            color: "rgb(199, 199, 199)",
                          }
                    }
                  >
                    {speed}
                  </p>
                ))}
              </div>
            </div>
          </div>
          {/* <div className={`options-container quality-container  `}>
            <div>
              <p
                onClick={() => {
                  setQuality((pre) => {
                    return { ...pre, opened: false };
                  });
                }}
              >
                back
              </p>
              <div>
                {availableQualities.map((availableQuality) => (
                  <p
                    onClick={() => {
                      setQuality((pre) => ({
                        ...pre,
                        value: availableQuality,
                      }));
                      setSavedTime(videoRef.current.currentTime);
                    }}
                    style={
                      quality.value === availableQuality
                        ? {
                            fontWeight: "bold",
                          }
                        : {
                            color: "rgb(199, 199, 199)",
                          }
                    }
                  >
                    {" "}
                    {availableQuality}
                  </p>
                ))}
              </div>
            </div>
          </div> */}
          <div className="settings-options">
            <div
              onClick={() => {
                setPlaybackSpeed((pre) => ({ ...pre, opened: true }));
              }}
            >
              <p>Speed</p> <p>{playbackSpeed.value}</p>
            </div>
            <div
              onClick={() => {
                setQuality((pre) => ({ ...pre, opened: true }));
              }}
            >
              <p>Quality</p>
              <p>{quality.value}</p>
            </div>
          </div>
        </div>
      ) : null}
      <svg
        height="100%"
        onClick={() => {
          setSettings((pre) => !pre);
        }}
        version="1.1"
        viewBox="0 0 36 36"
        width="100%"
      >
        <use className="ytp-svg-shadow"></use>
        <path
          d="m 23.94,18.78 c .03,-0.25 .05,-0.51 .05,-0.78 0,-0.27 -0.02,-0.52 -0.05,-0.78 l 1.68,-1.32 c .15,-0.12 .19,-0.33 .09,-0.51 l -1.6,-2.76 c -0.09,-0.17 -0.31,-0.24 -0.48,-0.17 l -1.99,.8 c -0.41,-0.32 -0.86,-0.58 -1.35,-0.78 l -0.30,-2.12 c -0.02,-0.19 -0.19,-0.33 -0.39,-0.33 l -3.2,0 c -0.2,0 -0.36,.14 -0.39,.33 l -0.30,2.12 c -0.48,.2 -0.93,.47 -1.35,.78 l -1.99,-0.8 c -0.18,-0.07 -0.39,0 -0.48,.17 l -1.6,2.76 c -0.10,.17 -0.05,.39 .09,.51 l 1.68,1.32 c -0.03,.25 -0.05,.52 -0.05,.78 0,.26 .02,.52 .05,.78 l -1.68,1.32 c -0.15,.12 -0.19,.33 -0.09,.51 l 1.6,2.76 c .09,.17 .31,.24 .48,.17 l 1.99,-0.8 c .41,.32 .86,.58 1.35,.78 l .30,2.12 c .02,.19 .19,.33 .39,.33 l 3.2,0 c .2,0 .36,-0.14 .39,-0.33 l .30,-2.12 c .48,-0.2 .93,-0.47 1.35,-0.78 l 1.99,.8 c .18,.07 .39,0 .48,-0.17 l 1.6,-2.76 c .09,-0.17 .05,-0.39 -0.09,-0.51 l -1.68,-1.32 0,0 z m -5.94,2.01 c -1.54,0 -2.8,-1.25 -2.8,-2.8 0,-1.54 1.25,-2.8 2.8,-2.8 1.54,0 2.8,1.25 2.8,2.8 0,1.54 -1.25,2.8 -2.8,2.8 l 0,0 z"
          fill="#fff"
          id="ytp-id-18"
        ></path>
      </svg>
    </div>
  );
};

export default SettingsBtn;
