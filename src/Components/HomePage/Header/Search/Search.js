import React, { useState, useEffect, useRef } from "react";
import "./Search.css";
import { Link } from "react-router-dom";
import axios from "axios";

const Search = () => {
  const [isActive, setIsActive] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [value, setValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const inputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (inputValue) {
      searchAnime(inputValue);
    } else {
      setSearchResults([]);
    }
  }, [inputValue]);

  const handleSearchClick = () => {
    setIsActive(!isActive);
    if (isActive) {
      setInputValue("");
    }
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleClearClick = (e) => {
    e.stopPropagation();
    setInputValue("");
    setSearchResults([]);
  };

  const handleInputClick = (e) => {
    e.stopPropagation();
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  //запрос на сервер по названию
  const searchAnime = async (query) => {
    try {
      const response = await axios.get(
        `https://api.anilibria.tv/api/v3/title/search?search=${query}&limit=10`
      );

      if (typeof response.data === "object") {
        const dataArray = Object.values(response.data);
        setSearchResults(dataArray[0]);
        console.log(dataArray);
        setIsLoading(true);
      } else {
        setSearchResults([]);
        setIsLoading(true);
      }
    } catch (error) {
      console.error("Error searching for anime:", error);
      setSearchResults([]);
      setIsLoading(true);
    }
  };

  return (
    <div className="main__search">
      <div
        className={isActive ? "search active" : "search"}
        onClick={handleSearchClick}
      >
        <div className="icon" />
        <div className="input">
          <input
            type="text"
            placeholder="Поиск аниме"
            id="mySearch"
            autoComplete="off"
            onClick={handleInputClick}
            value={inputValue}
            onChange={handleInputChange}
          />

          <span className="clear" onClick={handleClearClick} />
        </div>
      </div>
      <div className="autocomplete">
        {searchResults.map((animeItem) => (
          <Link to={{ pathname: `/anime/${animeItem.id}` }} key={animeItem.id}>
            <div
              className="autocomplete__item"
              onClick={() => setValue(animeItem.names.ru)}
            >
              {isLoading ? (
                <img
                  className="search__img"
                  src={"https://anilibria.tv" + animeItem.posters.original.url}
                  alt=""
                />
              ) : (
                <div className="img__skeleton" />
              )}
              <div className="search__info">
                <div className="search__name">{animeItem.names.ru}</div>
                <div className="search__year">
                  {animeItem.season.year + " ● " + animeItem.type.string}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Search;
