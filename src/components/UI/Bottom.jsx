import React from "react";
import "../../static/css/bottom.css";

const App = ({ isOpen, setIsOpen, isChatOpen, setIsChatOpen }) => {
  const currentUser = sessionStorage.getItem("username");

  return (
    <div className="navbar">
      <div className="left-section">
        <div className="user-info">
          <img src="svg/user-icon.svg" alt="User Icon" className="user-icon" />
          <span className="username">{currentUser}</span>
          <span className="status">활동중</span>
          <span className="status-dot on"></span>
        </div>
        <div className="center-section">
          <button className="nav-button">
            <img src="svg/microphone-icon.svg" alt="Microphone" />
          </button>
          <button className="nav-button">
            <img src="svg/video-icon.svg" alt="Video" />
          </button>
          <button className="nav-button">
            <img src="svg/emoji-icon.svg" alt="emoji" />
          </button>
          <button className="nav-button">
            <img src="svg/fullscreen-icon.svg" alt="Fullscreen" />
          </button>
        </div>
      </div>
      <div className="right-section">
        <button className="nav-button">
          <img src="svg/bell-icon.svg" alt="Bell" />
        </button>
        <button className="nav-button">
          <img src="svg/calendar-icon.svg" alt="Calendar" />
        </button>
        <button
          className="nav-button"
          onClick={() => {
            setIsChatOpen((prev) => !prev);
            if (isOpen) setIsOpen((prev) => !prev);
          }}
        >
          <img src="svg/chat-icon.svg" alt="Chat" />
        </button>
        <button
          className="nav-button"
          onClick={() => {
            setIsOpen((prev) => !prev);
            if (isChatOpen) setIsChatOpen((prev) => !prev);
          }}
        >
          <img src="svg/group-icon.svg" alt="Group" />
          <div className="notification-count">23</div>
        </button>
      </div>
    </div>
  );
};

export default App;
