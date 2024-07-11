import React, { useState } from "react";

import IconButton from "@mui/material/IconButton";
import Snackbar from "@mui/material/Snackbar";
import { MdContentCopy } from "react-icons/md";

type TableType = string[][];

const convertToTSV = (data: TableType): string => {
  const rows = data.map((row) => row.join("\t"));
  return rows.join("\n");
};

export interface TSVCopyButtonProps {
  data: TableType;
}

export const TSVCopyButton = ({ data }: TSVCopyButtonProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const copyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        // alert('Copied to clipboard');
        setOpen(true);
      })
      .catch((err) => {
        console.error("Could not copy text: ", err);
      });
  };
  return (
    <>
      <IconButton
        aria-label="copy"
        onClick={() => copyToClipboard(convertToTSV(data))}
      >
        <MdContentCopy />
      </IconButton>
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={() => setOpen(false)}
        message="クリップボードにコピーしました!!"
      />
    </>
  );
};
