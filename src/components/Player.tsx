import React, { useRef, useState, useEffect } from "react";

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
  const [width, setWidth] = useState(0);

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
    height: (width * 390) / 640,
    width: width,
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const fitWidth = () => {
    const w = sizeRef.current?.offsetWidth;
    if (w !== undefined) {
      setWidth(w / 2);
    }
  };

  window.addEventListener("resize", fitWidth);
  useEffect(() => fitWidth(), []);

  return (
    <div>
      <div ref={sizeRef} style={{ width: "100vw" }}></div>
      <Grid container alignItems="center" justifyContent="center">
        <Grid item xs={12} container justifyContent="center">
          <div style={{ width: width }}>
            <YouTube videoId={videoId} opts={opts} onReady={onPlayerReady} />
          </div>
        </Grid>
        <Grid item xs={12} container justifyContent="center">
          <div style={{ width: width }}>
            <URLInput onChange={(id: string) => setVideoId(id)} />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};
