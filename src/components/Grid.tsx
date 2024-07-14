import { MutableRefObject, useContext, useState } from "react";
import { twMerge } from "tailwind-merge";
import { TileContext } from "../context/TileContext";
import { PathfindingContext } from "../context/PathfindingContext";
import { MAX_COLS, MAX_ROWS } from "../utils/constants";
import { Tile } from "./Tile";
import { checkIfStartOrEnd, createNewGrid } from "../utils/helpers";

export function Grid({ isVisualizationRunningRef }: { isVisualizationRunningRef: MutableRefObject<boolean> }) {
  const tileContext = useContext(TileContext);
  const pathfindingContext = useContext(PathfindingContext);

  if (!tileContext || !pathfindingContext) {
    throw new Error("TileContext and PathfindingContext must be used within their respective providers");
  }

  const { grid, setGrid } = pathfindingContext;
  const [isMouseDown, setIsMouseDown] = useState(false);

  const handleMouseDown = (row: number, col: number) => {
    if (isVisualizationRunningRef.current || checkIfStartOrEnd(row, col)) {
      return;
    }

    setIsMouseDown(true);
    const newGrid = createNewGrid(grid, row, col);
    setGrid(newGrid);
  };

  const handleMouseUp = (row: number, col: number) => {
    if (isVisualizationRunningRef.current || checkIfStartOrEnd(row, col)) {
      return;
    }

    setIsMouseDown(false);
  };

  const handleMouseEnter = (row: number, col: number) => {
    if (isVisualizationRunningRef.current || checkIfStartOrEnd(row, col)) {
      return;
    }

    if (isMouseDown) {
      const newGrid = createNewGrid(grid, row, col);
      setGrid(newGrid);
    }
  };

  return (
    <div
      className={twMerge(
        "flex items-center flex-col justify-center border-[#60717d]",
        `lg:min-h-[${MAX_ROWS * 17}px] md:min-h-[${MAX_ROWS * 15}px] sm:min-h-[${MAX_ROWS * 10}px] min-h-[${MAX_ROWS * 7}px]`,
        `lg:w-[${MAX_COLS * 17}px] md:w-[${MAX_COLS * 15}px] sm:w-[${MAX_COLS * 12}px] w-[${MAX_COLS * 7}px]`
      )}
    >
      {grid.map((r, rowIndex) => (
        <div key={rowIndex} className="flex">
          {r.map((tile, tileIndex) => {
            const { row, col, isEnd, isStart, isPath, isTraversed, isWall } = tile;
            return (
              <Tile
                key={tileIndex}
                row={tile.row}
                col={tile.col}
                isEnd={isEnd}
                isStart={isStart}
                isPath={isPath}
                isTraversed={isTraversed}
                isWall={isWall}
                handleMouseDown={() => handleMouseDown(row, col)}
                handleMouseUp={() => handleMouseUp(row, col)}
                handleMouseEnter={() => handleMouseEnter(row, col)}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}
