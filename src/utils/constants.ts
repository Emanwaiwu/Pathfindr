import { AlgorithmSelectType, MazeSelectType, SpeedSelectType } from "./types";

export const MAX_ROWS = 35;
export const MAX_COLS = 55;

export const START_TILE_CONFIGURATION = {
  row: 10,
  col: 10,
  isEnd: false,
  isWall: false,
  isPath: false,
  distance: 0,
  isStart: true, // Should be true for the start tile
  isTraversed: false,
  parent: null,
};

export const END_TILE_CONFIGURATION = {
  row: MAX_ROWS - 25,
  col: MAX_COLS - 20,
  isEnd: true, // Should be true for the end tile
  isWall: false,
  isPath: false,
  distance: 0,
  isStart: false,
  isTraversed: false,
  parent: null,
};

export const TILE_STYLE =
  "lg:w-[18px] md:w-[20px] xs:w-[15px] w-[20px] lg:h-[17px] md:h-[20px] xs:h-[15px] h-[20px] border-t border-r border-[#109BFF]";
export const TRAVERSED_TILE_STYLE = TILE_STYLE + " bg-[#5941A9]";
export const START_TILE_STYLE = TILE_STYLE;
export const END_TILE_STYLE = TILE_STYLE;
export const WALL_TILE_STYLE = TILE_STYLE + " bg-[#DF8153]";
export const PATH_TILE_STYLE = TILE_STYLE + " bg-[#98FF61]";

export const MAZES: MazeSelectType[] = [
  { name: "No Maze", value: "NONE" },
  { name: "Binary Tree", value: "BINARY_TREE" },
  { name: "Recursive Division", value: "RECURSIVE_DIVISION" },
];

export const PATHFINDING_ALGORITHMS: AlgorithmSelectType[] = [
  { name: "Dijkstra", value: "DIJKSTRA" },
  { name: "A-Star", value: "A_STAR" },
  { name: "Breadth First Search", value: "BFS" },
  { name: "Depth First Search", value: "DFS" },
];

export const SPEEDS: SpeedSelectType[] = [
  { name: "Slow", value: 2 },
  { name: "Medium", value: 1 },
  { name: "Fast", value: 0.5 },
];

export const SLEEP_TIME = 8;
export const EXTENDED_SLEEP_TIME = 30;
