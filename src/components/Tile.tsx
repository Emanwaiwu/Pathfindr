import { twMerge } from "tailwind-merge";
import {
  END_TILE_STYLE,
  MAX_ROWS,
  PATH_TILE_STYLE,
  START_TILE_STYLE,
  TILE_STYLE,
  TRAVERSED_TILE_STYLE,
  WALL_TILE_STYLE,
} from "../utils/constants";
import { FaLocationDot, FaLocationCrosshairs } from "react-icons/fa6";

interface MouseFunction {
  (row: number, col: number): void;
}

interface TileProps {
  row: number;
  col: number;
  isStart: boolean;
  isEnd: boolean;
  isTraversed: boolean;
  isWall: boolean;
  isPath: boolean;
  handleMouseDown: MouseFunction;
  handleMouseUp: MouseFunction;
  handleMouseEnter: MouseFunction;
}

export function Tile({
  row,
  col,
  isStart,
  isEnd,
  isTraversed,
  isWall,
  isPath,
  handleMouseDown,
  handleMouseUp,
  handleMouseEnter,
}: TileProps) {
  let tileStyle;

  if (isWall) {
    tileStyle = WALL_TILE_STYLE;
  } else if (isPath) {
    tileStyle = PATH_TILE_STYLE;
  } else if (isTraversed) {
    tileStyle = TRAVERSED_TILE_STYLE;
  } else if (isStart) {
    tileStyle = START_TILE_STYLE;
  } else if (isEnd) {
    tileStyle = END_TILE_STYLE;
  } else {
    tileStyle = TILE_STYLE;
  }

  const borderStyle =
    row === MAX_ROWS - 1 ? "border-b" : col === 0 ? "border-l" : "";
  const edgeStyle = row === MAX_ROWS - 1 && col === 0 ? "border-l" : "";

  return (
    <div
      className={twMerge(tileStyle, borderStyle, edgeStyle)}
      id={`${row}-${col}`}
      onMouseDown={() => handleMouseDown(row, col)}
      onMouseUp={() => handleMouseUp(row, col)}
      onMouseEnter={() => handleMouseEnter(row, col)}
    >
      {isEnd && <FaLocationDot className=" text-red-700 text-[17px]" />}
      {isStart && (
        <FaLocationCrosshairs className="text-green-500 text-[17px]" />
      )}
    </div>
  );
}
