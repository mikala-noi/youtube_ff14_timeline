import React, { useState } from "react";

import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

const extractYouTubeId = (url: string): string | undefined => {
  const regex = /(?:\/|v=)([A-Za-z0-9_-]{11})(?:\?|&|$)/;
  const match = url.match(regex);
  if (match) {
    return match[1];
  } else {
    return undefined;
  }
};

export interface URLInputProps {
  onChange: (id: string) => void;
}

export const URLInput = ({ onChange }: URLInputProps) => {
  const [url, setUrl] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const onChangeWrap = () => {
    const id = extractYouTubeId(url);
    if (id) {
      onChange(id);
      setError(false);
    } else {
      setError(true);
    }
  };
  return (
    <Grid container alignItems="center" justifyContent="center">
      <Grid item xs={10}>
        <TextField
          fullWidth
          id="outlined-basic"
          label="URL"
          variant="outlined"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          helperText={error ? "有効なURLではありません" : undefined}
          error={error}
          size="small"
        />
      </Grid>
      <Grid item xs={2}>
        <Button
          fullWidth
          variant="outlined"
          size="medium"
          onClick={onChangeWrap}
        >
          変更
        </Button>
      </Grid>
    </Grid>
  );
};
