import React, { useState, useEffect } from "react";
import axios from "axios";
import Banner from "./Banner/Banner";
import Header from "./Header/Header";
import Card from "./Card/Card";
import InfiniteScroll from "react-infinite-scroll-component";
import "./HomePage.css";

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [anime, setAnime] = useState([]);
  const [page, setPage] = useState(1);

  //Запрос на сервер
  useEffect(() => {
    axios
      .get(
        `https://api.anilibria.tv/api/v3/title/changes?page=${page}&items_per_page=${36}`
      )
      .then((response) => {
        if (typeof response.data === "object") {
          const animeArray = Object.values(response.data);
          setAnime((prevAnime) => [...prevAnime, ...animeArray[0]]);
          console.log(animeArray);
          setIsLoading(false);
        } else {
          console.error("Anime data is not an object");
        }
      })
      .catch((error) => {
        console.error("Error fetching anime:", error);
      });
  }, [page]);

  //автоподгрузка
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      localStorage.setItem('scrollPosition', window.scrollY);
    };
  
    window.addEventListener('beforeunload', handleBeforeUnload);
  
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);
  
  //сохранение позиции скролла
  useEffect(() => {
   
    const savedScrollPosition = localStorage.getItem('scrollPosition');
  
    if (savedScrollPosition) {
      window.scrollTo(0, parseInt(savedScrollPosition, 10));
    }
  }, []);
  //загрузка следующей страницы
  const loadMore = () => {
    setPage(page + 1);
  };
  return (
    <div>
      <Header />
      <Banner />
      <div className="container__card">
        <InfiniteScroll
          dataLength={anime.length}
          next={loadMore}
          hasMore={true}
          loader={
            <div className="center">
              <p className="load">
                <img src="https://i.gifer.com/ZKZx.gif"></img>
              </p>
            </div>
          }
        >
          <div className="card__grid">
            {anime.map((animeItem) => (
              <div className="anime__card" key={animeItem.id}>
                <Card
                  id={animeItem.id}
                  title={animeItem.names.ru}
                  poster={animeItem.posters.original.url}
                />
              </div>
            ))}
          </div>
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default HomePage;
