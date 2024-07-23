import React, { useEffect } from "react";

const Bgm = ({clickPauseHandler, bgmRunning}) => {
  
  useEffect(() => {
    const audioElement = document.getElementById('audio');
    if (audioElement) {
      audioElement.volume = 0.4; // 볼륨을 절반으로 설정
    }
  }, [bgmRunning]); // bgmRunning이 변경될 때마다 실행

  return (
    <div className="bottom_menu_item pause" onClick={clickPauseHandler}>
        {bgmRunning ? <audio id="audio" src="bgm/MapleStory_-_Raindrop_Flower.mp3" autoPlay loop ></audio> : null}
        <img src="icon/svg/Pause.svg" alt="pause" />
    </div>
  );
}

export default Bgm;