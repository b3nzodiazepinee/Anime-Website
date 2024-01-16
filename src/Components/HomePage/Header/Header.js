import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import Search from "./Search/Search";

const Header = () => {

  return (
    <header className="header">
      <div className="container">
        <div className="header__row">
          <div className="header__logo">AniLand</div>
          <div className="header__nav">
            <ul>
            <Search />
              {/* <li>
                <Link to="/ListsAnime">
                  <img src="/image/tag.png" alt="" />
                </Link>
              </li> */}
              {/* <li>
                <Link to="/shop">
                  <img src="/image/shop.png" alt="" />
                </Link>
              </li> */}
              {/* <li className="nav__profile">
                <Link to="/account">
                  <img src="/image/user.png" alt="" />
                </Link>
              </li> */}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
