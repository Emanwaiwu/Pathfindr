import { MutableRefObject, useContext, useState } from "react";
import { TileContext } from "../context/TileContext";
import { PathfindingContext } from "../context/PathfindingContext";
import {
  EXTENDED_SLEEP_TIME,
  MAZES,
  PATHFINDING_ALGORITHMS,
  SLEEP_TIME,
  SPEEDS,
  MAX_ROWS,
  MAX_COLS,
} from "../utils/constants";
import { resetGrid } from "../utils/resetGrid";
import { AlgorithmType, MazeType, SpeedType } from "../utils/types";
import { Select } from "./Select";
import { useSpeed } from "../hooks/useSpeed";
import { runMazeAlgorithm } from "../utils/runMazeAlgorithm";
import { PlayButton } from "./PlayButton";
import { runPathfindingAlgorithm } from "../utils/runPathfindingAlgorithm";
import { animatePath } from "../utils/animatePath";

export function Nav({
  isVisualizationRunningRef,
}: {
  isVisualizationRunningRef: MutableRefObject<boolean>;
}) {
  const tileContext = useContext(TileContext);
  const pathfindingContext = useContext(PathfindingContext);

  if (!tileContext || !pathfindingContext) {
    throw new Error(
      "TileContext and PathfindingContext must be used within their respective providers"
    );
  }

  const { startTile, setStartTile, endTile, setEndTile } = tileContext;
  const {
    maze,
    setMaze,
    grid,
    setGrid,
    isGraphVisualized,
    setIsGraphVisualized,
    algorithm,
    setAlgorithm,
  } = pathfindingContext;
  const { speed, setSpeed } = useSpeed();

  const [isDisabled, setIsDisabled] = useState(false);
  const [startRow, setStartRow] = useState(startTile.row);
  const [startCol, setStartCol] = useState(startTile.col);
  const [endRow, setEndRow] = useState(endTile.row);
  const [endCol, setEndCol] = useState(endTile.col);

  const handleGenerateMaze = (maze: MazeType) => {
    if (maze === "NONE") {
      setMaze(maze);
      resetGrid({ grid, startTile, endTile });
      return;
    }

    setMaze(maze);
    setIsDisabled(true);
    runMazeAlgorithm({
      maze,
      grid,
      startTile,
      endTile,
      setIsDisabled,
      speed,
    });
    const newGrid = grid.slice();
    setGrid(newGrid);
    setIsGraphVisualized(false);
  };

  const handlerRunVisualizer = () => {
    if (isGraphVisualized) {
      setIsGraphVisualized(false);
      resetGrid({ grid: grid.slice(), startTile, endTile });
      return;
    }

    const { traversedTiles, path } = runPathfindingAlgorithm({
      algorithm,
      grid,
      startTile,
      endTile,
    });

    animatePath(traversedTiles, path, startTile, endTile, speed);
    setIsDisabled(true);
    isVisualizationRunningRef.current = true;
    setTimeout(
      () => {
        const newGrid = grid.slice();
        setGrid(newGrid);
        setIsGraphVisualized(true);
        setIsDisabled(false);
        isVisualizationRunningRef.current = false;
      },
      SLEEP_TIME * (traversedTiles.length + SLEEP_TIME * 2) +
        EXTENDED_SLEEP_TIME *
          (path.length + 60) *
          SPEEDS.find((s) => s.value === speed)!.value
    );
  };

  const updateStartTilePosition = (row: number, col: number) => {
    setStartRow(row);
    setStartCol(col);
    setStartTile({ ...startTile, row, col });
    const newGrid = grid.map((gridRow) =>
      gridRow.map((tile) => {
        if (tile.isStart) {
          return { ...tile, isStart: false };
        }
        if (tile.row === row && tile.col === col) {
          return { ...tile, isStart: true };
        }
        return tile;
      })
    );
    setGrid(newGrid);
  };

  const updateEndTilePosition = (row: number, col: number) => {
    setEndRow(row);
    setEndCol(col);
    setEndTile({ ...endTile, row, col });
    const newGrid = grid.map((gridRow) =>
      gridRow.map((tile) => {
        if (tile.isEnd) {
          return { ...tile, isEnd: false };
        }
        if (tile.row === row && tile.col === col) {
          return { ...tile, isEnd: true };
        }
        return tile;
      })
    );
    setGrid(newGrid);
  };

  return (
    <div className="flex items-center justify-center min-h-[4.5rem] shadow-gray-600 sm:px-5 py-10 w-[95%] font-main">
      <div className="flex items-center lg:justify-between justify-center sm:w-[90rem] disabled:pointer-events-none">
        <h1 className="lg:flex hidden w-[40%] ml-20 mt-6 text-4xl">
          Pathfinding Visualizr
        </h1>
        <div className="flex sm:items-end items-center justify-start sm:justify-between sm:flex-row flex-col sm:space-y-0 space-y-3 sm:py-0 py-4 sm:space-x-4">
          <Select
            label="Maze"
            value={maze}
            options={MAZES}
            isDisabled={isDisabled}
            onChange={(e) => {
              handleGenerateMaze(e.target.value as MazeType);
            }}
          />
          <Select
            label="Algorithms"
            value={algorithm}
            isDisabled={isDisabled}
            options={PATHFINDING_ALGORITHMS}
            onChange={(e) => {
              setAlgorithm(e.target.value as AlgorithmType);
            }}
          />
          <Select
            label="Speed"
            value={speed}
            options={SPEEDS}
            isDisabled={isDisabled}
            onChange={(e) => {
              setSpeed(parseInt(e.target.value) as SpeedType);
            }}
          />
          <PlayButton
            isDisabled={isDisabled}
            isGraphVisualized={isGraphVisualized}
            handlerRunVisualizer={handlerRunVisualizer}
          />
          <div className="flex flex-col items-center">
            <label>Start Tile</label>
            <div className="flex items-center">
              <label className="mr-2">Row:</label>
              <input
                type="number"
                value={startRow}
                onChange={(e) =>
                  updateStartTilePosition(parseInt(e.target.value), startCol)
                }
                disabled={isDisabled}
                className="bg-black border pl-1 ml-[1.2rem]"
                min={0}
                max={MAX_ROWS - 1}
              />
            </div>
            <div className="flex items-center">
              <label className="mr-2">Column:</label>
              <input
                type="number"
                value={startCol}
                onChange={(e) =>
                  updateStartTilePosition(startRow, parseInt(e.target.value))
                }
                disabled={isDisabled}
                className="bg-black border pl-1"
                min={0}
                max={MAX_COLS - 1}
              />
            </div>
          </div>
          <div className="flex flex-col items-center">
            <label>End Tile</label>
            <div className="flex items-center">
              <label className="mr-2">Row:</label>
              <input
                type="number"
                value={endRow}
                onChange={(e) =>
                  updateEndTilePosition(parseInt(e.target.value), endCol)
                }
                disabled={isDisabled}
                className="bg-black border pl-1 ml-[2.4rem]"
                min={0}
                max={MAX_ROWS - 1}
              />
            </div>
            <div className="flex items-center">
              <label className="mr-2">Column:</label>
              <input
                type="number"
                value={endCol}
                onChange={(e) =>
                  updateEndTilePosition(endRow, parseInt(e.target.value))
                }
                disabled={isDisabled}
                className="bg-black border pl-1 ml-[1.2rem]"
                min={0}
                max={MAX_COLS - 1}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
