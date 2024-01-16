import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../HomePage/Header/Header";
import { Link, useParams } from "react-router-dom";
import "./AnimePage.css";

const AnimePage = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [anime, setAnime] = useState([]);

  //Поиск аниме на сервере по id
  const getAnime = async (id) => {
    try {
      const response = await axios.get(
        `https://api.anilibria.tv/v3/title?id=${id}`
      );
      const animeData = response.data;
      setAnime(animeData);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching anime:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAnime(id);
  }, [id]);

  return (
    <div className="AnimePage">
      <Header />
      {isLoading ? (
        <div id="center">
          <p className="load">
            <img src="https://i.gifer.com/ZKZx.gif"></img>
          </p>
        </div>
      ) : (
        <div className="container">
          <div className="anime__preview">
            <img
              className="anime__banner"
              src={"https://www.anilibria.tv" + anime.posters.original.url}
              alt=""
            />
            <div className="anime__info">
            <div className="anime__title">{anime.names.ru}</div>
            <ul className="anime__info__more">
              <li className="anime__original__title"> {anime.names.en}</li>
              <li className="anime__info__list">Тип: {anime.type.string}</li>
              <li className="anime__info__list">
                Эпизоды: {anime.player.episodes.last}
              </li>
              <li className="anime__info__list">Год: {anime.season.year}</li>
              <li className="anime__info__list">
                Статус: {anime.status.string}
              </li>
              <li className="anime__info__list">
                Жанр:{" "}
                {anime.genres.map((genre) => (
                  <span key={genre}>{genre}, </span>
                ))}
              </li>
            </ul>
            </div>
          </div>
          <Link
            to={{
              pathname: `/anime/player/${anime.id}`,
            }}
          >
            <button className="watch">Смотреть</button>
          </Link>
          <div>
            <div className="main__description">Описание</div>
            <div className="description">{anime.description}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnimePage;
