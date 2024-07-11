import { useMemo, useRef, useState } from "react";

import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Radio from "@mui/material/Radio";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import { BiSolidTrashAlt } from "react-icons/bi";
import { v4 as uuidv4 } from "uuid";

import { AlertDialog } from "./AlertDialog";
import { TSVCopyButton } from "./TSVCopyButton";

export interface TimelineProps {
  getDurationFunc: () => number;
  playerRef: HTMLIFrameElement | null;
}

export class GimmickTime {
  name: string;
  sec: number;
  id: string;
  constructor(name: string, sec: number, id?: string) {
    this.name = name;
    this.sec = sec;
    this.id = id ?? uuidv4();
  }
}

export const Timeline = ({ getDurationFunc, playerRef }: TimelineProps) => {
  const [rows, setRows] = useState<GimmickTime[]>([]);
  const [checkedId, setCheckedId] = useState<string>("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const buttonRef = useRef<HTMLInputElement>(null);

  const baseSec = rows.find((r) => r.id === checkedId)?.sec ?? 0;
  const fixed = 3; // 小数点3ケタまで表示
  const buttonHeight = 43;

  const copyRowData = useMemo(
    () => rows.map((r) => [r.name, (r.sec - baseSec).toFixed(fixed)]),
    [rows, baseSec],
  );

  const handleButtonClick = () => {
    const time = getDurationFunc();
    setRows([...rows, new GimmickTime("", time)].sort((a, b) => a.sec - b.sec));
    setTimeout(() => {
      buttonRef?.current?.scrollIntoView(false);
    }, 100);
    if (playerRef) {
      setTimeout(() => {
        playerRef.focus();
        // カスタムイベントをトリガーしてYouTubeプレイヤーが反応するようにする
        const event = new Event("focus");
        playerRef.dispatchEvent(event);
        playerRef.contentWindow?.focus();
      }, 100); // 100ミリ秒の遅延を設定
    }
  };
  const deleteAll = () => {
    setRows([]);
  };
  return (
    <>
      <TableContainer
        component={Paper}
        sx={{ overflowY: "scroll", height: `calc(100% - ${buttonHeight}px)` }}
      >
        <Table stickyHeader aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">0秒</TableCell>
              <TableCell>ギミック</TableCell>
              <TableCell align="right">秒数</TableCell>
              <TableCell align="right">前からの秒数</TableCell>
              <TableCell align="right">
                <IconButton
                  aria-label="delete"
                  onClick={() => setDeleteDialogOpen(true)}
                >
                  <BiSolidTrashAlt />
                </IconButton>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => {
              const beforeRow = index > 0 ? rows[index - 1] : undefined;
              const diff = beforeRow
                ? (row.sec - beforeRow.sec).toFixed(fixed)
                : "-";
              const setName = (name: string) => {
                setRows((rs) => [
                  ...rs.slice(0, index),
                  new GimmickTime(name, row.sec, row.id),
                  ...rs.slice(index + 1),
                ]);
              };
              return (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>
                    <Radio
                      value={row.id}
                      checked={row.id === checkedId}
                      onChange={() => setCheckedId(row.id)}
                    />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <TextField
                      hiddenLabel
                      fullWidth
                      id="outlined-basic"
                      variant="standard"
                      size="small"
                      value={row.name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </TableCell>
                  <TableCell align="right">
                    {(row.sec - baseSec).toFixed(fixed)}
                  </TableCell>
                  <TableCell align="right">{diff}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      aria-label="delete"
                      onClick={() =>
                        setRows((rs) => rs.filter((v) => v.id !== row.id))
                      }
                    >
                      <BiSolidTrashAlt />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <div style={{ height: buttonHeight, display: "flex", padding: "5px" }}>
        <div style={{ width: "100%" }}>
          <Button
            fullWidth
            variant="contained"
            onClick={handleButtonClick}
            ref={buttonRef}
          >
            追加
          </Button>
        </div>
        <div>
          <TSVCopyButton data={copyRowData} />
        </div>
      </div>
      <AlertDialog
        open={deleteDialogOpen}
        close={(ok) => {
          setDeleteDialogOpen(false);
          if (ok) deleteAll();
        }}
        title=""
      >
        タイムラインをすべて消去します。よろしいですか？
      </AlertDialog>
    </>
  );
};
