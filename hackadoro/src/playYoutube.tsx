import React, { useState } from "react";
import YouTube from "react-youtube";

interface YoutubeVidProps {
  videoId: string;
}

const YoutubeVid: React.FC<YoutubeVidProps> = ({ videoId }) => {
  const [player, setPlayer] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const options = {
    height: "1",
    width: "1",
    playerVars: {
      autoplay: 1,
      controls: 0,
    },
  };

  const handleReady = (event: any) => {
    setPlayer(event.target);
    event.target.playVideo();
  };

  const togglePlayPause = () => {
    if (player) {
      if (isPlaying) {
        player.pauseVideo();
      } else {
        player.playVideo();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="youtube-player">
      <YouTube videoId={videoId} opts={options} onReady={handleReady} />
      <button onClick={togglePlayPause} className="play-pause-button text-5xl">
        {isPlaying ? "Pause" : "Play"}
      </button>
    </div>
  );
};

export default YoutubeVid;
