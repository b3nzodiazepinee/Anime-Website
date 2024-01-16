import React from "react";
import "./Banner.css";

const Banner = () => {
  return (
    <div className="video-container">
      <div className="video-bg">
        <video
          autoPlay
          playsInline
          loop
          muted
          src="/image/banner.mp4"
          type="video/mp4"
        ></video>
        <div className="video-bg__content">
          <h1 id="hello">Смотри аниме на AniLand</h1>
        </div>
        <div className="video-gradient-overlay"></div>
      </div>
    </div>
  );
};

export default Banner;
