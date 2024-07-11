import { useState } from "react";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import { Player } from "./components/Player";
import { Timeline } from "./components/Timeline";

function App() {
  const [getDurationFunc, setGetDurationFunc] = useState(() => () => 0);
  const [playerRef, setPlayerRef] = useState<HTMLIFrameElement | null>(null);
  return (
    <Box sx={{ height: "100%" }}>
      <Grid container sx={{ height: "100%", overflow: "hidden" }} spacing={1}>
        <Grid item xs={6} container alignItems="center" justifyContent="center">
          <Player
            setGetDurationFunc={setGetDurationFunc}
            setPlayerRef={setPlayerRef}
          />
        </Grid>
        <Grid item xs={6} sx={{ overflow: "hideen", maxHeight: "100%" }}>
          <Timeline getDurationFunc={getDurationFunc} playerRef={playerRef} />
        </Grid>
      </Grid>
    </Box>
  );
}

export default App;
