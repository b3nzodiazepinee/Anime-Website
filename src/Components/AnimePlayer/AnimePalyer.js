import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Plyr from "plyr";
import "plyr/dist/plyr.css";
import Hls from "hls.js";
import "./AnimePlayer.css";

function AnimePlayer() {
  const { id } = useParams();
  const [animeData, setAnimeData] = useState({});
  const [selectedQuality, setSelectedQuality] = useState("fhd");
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentEpisode, setCurrentEpisode] = useState(1);
  const videoRef = useRef(null);
  const hlsInstanceRef = useRef(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedEpisode, setSelectedEpisode] = useState(null);

  useEffect(() => {
    const fetchAnimeData = async () => {
      try {
        const animeData = await getAnime(id);
        setAnimeData(animeData);

        const hlsUrl = `https://cache.libria.fun${animeData.player?.list[currentEpisode]?.hls?.[selectedQuality]}`;
        console.log(hlsUrl);

        try {
          const hlsInstance = new Hls();
          hlsInstanceRef.current = hlsInstance;

          videoRef.current.addEventListener("loadedmetadata", () => {
            if (isPlaying) {
              videoRef.current.play();
            }
          });

          hlsInstance.loadSource(hlsUrl);
          hlsInstance.attachMedia(videoRef.current);

          hlsInstance.on(Hls.Events.MANIFEST_PARSED, function () {
            const player = new Plyr(videoRef.current, {
              controls: [
                "play-large",
                "play",
                "fast-forward",
                "current-time",
                "progress",
                "duration",
                "mute",
                "volume",
                "settings",
                "pip",
                "fullscreen",
              ],
              settings: ["speed"],
              speed: {
                selected: 1,
                options: [0.5, 1, 1.5, 2],
              },
            });
          });
        } catch (error) {
          console.error("Error creating Plyr:", error);
        }
      } catch (error) {
        console.error("Error fetching anime data:", error);
      }
    };

    const getAnime = async (animeId) => {
      try {
        const response = await axios.get(
          `https://api.anilibria.tv/v3/title?id=${animeId}`
        );
        console.log(response.data);
        return response.data;
      } catch (error) {
        console.error("Error fetching anime:", error);
        return {};
      }
    };

    fetchAnimeData();
  }, [id, selectedQuality, isPlaying, currentEpisode]);

  const handleQualityChange = (quality) => {
    setIsDropdownOpen(false);
    setIsPlaying(videoRef.current && !videoRef.current.paused);
    setSelectedQuality(quality);
  };

  const handleEpisodeChange = (episodeNumber) => {
    setCurrentEpisode(episodeNumber);
    console.log(episodeNumber);
    hlsInstanceRef.current?.destroy();
    setIsPlaying(false);

    const availableQualities =
      animeData.player?.list[episodeNumber]?.hls &&
      Object.keys(animeData.player.list[episodeNumber].hls);

    const qualityToUse =
      selectedQuality || (availableQualities && availableQualities[0]);

    if (!qualityToUse) {
      console.error("No available qualities found.");
      return;
    }

    const hlsUrl = `https://cache.libria.fun${animeData.player?.list[episodeNumber]?.hls?.[qualityToUse]}`;

    const newHlsInstance = new Hls();
    hlsInstanceRef.current = newHlsInstance;

    newHlsInstance.loadSource(hlsUrl);
    newHlsInstance.attachMedia(videoRef.current);

    newHlsInstance.on(Hls.Events.MANIFEST_PARSED, function () {
      if (isPlaying) {
        videoRef.current.play();
      }
    });
  };

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const qualityMapping = {
    sd: "480",
    hd: "720",
    fhd: "1080",
  };
  return (
    <div className="video__container">
      <video
        className="player"
        id="player"
        ref={videoRef}
        type="application/x-mpegURL"
        preload="metadata"
      ></video>
      <div>
        <div className="name__anime"></div>
        <div className="align">
 <div className="board__series">
          <div className="episode__buttons">
            {animeData.player?.list &&
              Object.values(animeData.player.list).map((episode, index) => (
                <button
                  className={`seria ${
                    selectedEpisode === index + 1 ? "selected" : ""
                  }`}
                  key={index}
                  onClick={() => {
                    handleEpisodeChange(index + 1);
                    setSelectedEpisode(index + 1);
                  }}
                >
                  <div>{index + 1} Эпизод</div>
                  <div className="name__episode">{episode.name}</div>
                </button>
              ))}
          </div>
        </div>
        <div className={`dropdown ${isDropdownOpen ? "open" : ""}`}>
          <button className="dropbtn" onClick={handleDropdownToggle}>
            {qualityMapping[selectedQuality]}p
          </button>
          <div className="dropdown__content">
            {animeData.player?.list[currentEpisode]?.hls &&
              Object.keys(animeData.player.list[currentEpisode].hls).map(
                (quality) => (
                  <button
                    key={quality}
                    onClick={() => handleQualityChange(quality)}
                  >
                    {qualityMapping[quality]}p
                  </button>
                )
              )}
          </div>
        </div>
        </div>
       
      </div>
    </div>
  );
}

export default AnimePlayer;
