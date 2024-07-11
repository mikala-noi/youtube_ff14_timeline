import React, { useRef, useState } from "react";

import Grid from "@mui/material/Grid";
import YouTube from "react-youtube";

import { URLInput } from "./URLInput";

import type { YouTubeProps } from "react-youtube";

export interface PlayerProps {
  setGetDurationFunc: React.Dispatch<React.SetStateAction<() => number>>;
  setPlayerRef: React.Dispatch<React.SetStateAction<HTMLIFrameElement | null>>;
}

export const Player = ({ setGetDurationFunc, setPlayerRef }: PlayerProps) => {
  const sizeRef = useRef(null);
  const [videoId, setVideoId] = useState("");

  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
    const player = event.target;
    // player.pauseVideo();
    player.setVolume(0);
    setGetDurationFunc(() => () => player.getCurrentTime());
    const iframe = player.getIframe();
    iframe.setAttribute("tabindex", "-1");
    setPlayerRef(iframe);
  };

  const opts: YouTubeProps["opts"] = {
    height: 390,
    width: 640,
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  return (
    <div ref={sizeRef}>
      <Grid container alignItems="center" justifyContent="center">
        <Grid item xs={12} container justifyContent="center">
          <div style={{ height: 390, width: 640 }}>
            <YouTube videoId={videoId} opts={opts} onReady={onPlayerReady} />
          </div>
        </Grid>
        <Grid item xs={12} container justifyContent="center">
          <div style={{ width: 640 }}>
            <URLInput onChange={(id) => setVideoId(id)} />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};
