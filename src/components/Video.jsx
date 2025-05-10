import React, { useState } from "react";
import styles from "@/styles/customVideo.module.css";

const Video = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  return (
    <div className={styles["custom-video-container"]}>
      {!isPlaying ? (
        <>
          <div className={styles["video-poster"]}></div>
          <button className={styles["custom-play-button"]} onClick={handlePlay}>
            ▶
          </button>
        </>
      ) : (
        <iframe
          className={styles["youtube-iframe"]}
          src="https://www.youtube.com/watch?v=BR0MqkvR5mA"
          title="YouTube video player"
          allow="autoplay; encrypted-media"
          allowFullScreen
        ></iframe>
      )}
    </div>
  );
};

export default Video;
