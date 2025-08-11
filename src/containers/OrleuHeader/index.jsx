import React from "react";

import OrleuLogo from "../../assets/ORLEU_Vector.svg";
import DefaultProfile from "../../assets/defaultProfile.png";
import "./index.scss";

const OrleuHeader = () => {
  return (
    <div className="container">
        <div className="logo">
            <img src={OrleuLogo} />
        </div>
        <div className="menu">
            <nav class="language-switcher">
                <a href="#" class="lang-link">Каз</a>
                <a href="#" class="lang-link active">Рус</a>
                <a href="#" class="lang-link">Eng</a>
            </nav>

        <div class="user-controls">
            <div class="user-avatar">
                {/* <div class="avatar-icon"></div> */}
                <img src={DefaultProfile} />
            </div>
            
            <button class="menu-button" onclick="toggleMenu(this)">
                <div class="menu-line"></div>
                <div class="menu-line"></div>
                <div class="menu-line"></div>
            </button>
        </div>
        </div>
    </div>
  );
};

export default OrleuHeader;
