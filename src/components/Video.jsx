import React from "react";

const Video = () => {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "450px",
        margin: "0 auto",
        borderRadius: "16px",
        overflow: "hidden",
        background: "#000",
        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.25)",
      }}
      className="video-edit"
    >
      <video
        src="/fe-hiring-filter.mp4"
        autoPlay
        muted
        loop
        playsInline
        controls
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
        }}
      ></video>
    </div>
  );
};

export default Video;
