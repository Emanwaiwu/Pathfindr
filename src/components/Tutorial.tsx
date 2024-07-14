import React, { useState } from "react";
import distance from "../assets/distance.png";
import {
  IoIosArrowDroprightCircle,
  IoIosArrowDropleftCircle,
} from "react-icons/io";
import algo from "../assets/algo.mp4";
import walls from "../assets/walls.mp4";
import { FaLocationDot, FaLocationCrosshairs } from "react-icons/fa6";
import select from "../assets/select.mp4";
import set from "../assets/set.gif";

const steps = [
  {
    title: "Welcome to Pathfinding Visualizer",
    content: (
      <>
        <h2 className="flex justify-center text-[25px] text-center">
          This short tutorial will walk you through all of the features of this
          application.
        </h2>
        <div className="ml-[3rem] mt-[50px] text-[20px]">
          <p>Firstly, What is Pathfinding?</p>
          <p>
            Pathfinding is the search, by a computer application, for the
            shortest route between two points.
          </p>
        </div>
        <div className="flex justify-center mt-10">
          <img src={distance} alt="distance" className=" w-[200px] h-[200px]" />
        </div>
      </>
    ),
  },
  {
    title: "Picking an Algorithm",
    content: (
      <>
        <h2 className="flex justify-center text-[25px]">
          Choose an algorithm from the "Algorithms" drop-down menu.
        </h2>
        <div className="flex justify-center mt-14 w-[20rem] ml-[30%]">
          <video autoPlay muted loop src={algo} className="rounded-md"></video>
        </div>
      </>
    ),
  },
  {
    title: "Understand the algorithms",
    content: (
      <>
        <div className="ml-[3rem] mt-[50px] text-[20px]">
          <h2 className="text-[22px] text-red-600">
            Dijkstra's Algorithm (Weighted):
          </h2>
          <p>
            Dijkstra's finds the shortest path from a start node to all others
            in a graph where edges have different weights. It picks the closest
            unvisited node, updates neighbors' distances, and repeats.
          </p>
        </div>
        <div className="ml-[3rem] mt-[50px] text-[20px]">
          <h2 className="text-[22px] text-red-600">A* Algorithm (Weighted):</h2>
          <p>
            A* finds the shortest path from start to end in a graph where edges
            have different weights, using a guess (heuristic) to find the goal
            faster. It calculates a cost for each node and picks the lowest one.
          </p>
        </div>
        <div className="ml-[3rem] mt-[50px] text-[20px]">
          <h2 className="text-[22px] text-red-600">
            Breadth-First Search (BFS) (Unweighted):
          </h2>
          <p>
            BFS explores all nodes at the current depth before going deeper in a
            graph where all edges have the same weight. It starts from the root,
            visits all neighbors, then moves to the next level.
          </p>
        </div>
        <div className="ml-[3rem] mt-[50px] text-[20px]">
          <h2 className="text-[22px] text-red-600">
            Depth-First Search (DFS) (Unweighted):
          </h2>
          <p>
            DFS explores as far as possible along each branch before
            backtracking in a graph where all edges have the same weight. It
            starts from the root and uses a stack to track the path.
          </p>
        </div>
        <div className="ml-[3rem] mt-[50px] text-[20px]">
          <h2 className="text-[22px] text-red-600">**NOTE**</h2>
          <p>
            In a weighted graph, edges have different values, meaning some paths
            cost more to travel than others. In an unweighted graph, all edges
            have the same value, so all paths cost the same to travel.
          </p>
        </div>
        <div className="flex items-center justify-center mt-10">
          <p className="text-red-600">
            There are more pathfinding algorithms to explore, these are just the
            few featured in this project.
          </p>
        </div>
      </>
    ),
  },
  {
    title: "Adding walls",
    content: (
      <>
        <div className="ml-[0.5rem] text-[20px]">
          <p className="flex justify-center text-[25px]">
            Click on the grid to add a wall.
          </p>
          <p className="text-[15px] flex justify-center mt-5 text-center">
            Walls are there to block certain paths, meaning a path cannot go
            through them. They create obstacles that the path must navigate
            around. Feel free to use the "maze" dropdown to select wall presets.
          </p>
        </div>
        <div className="flex justify-center mt-14 w-[18rem] ml-[33%]">
          <video autoPlay muted loop src={walls} className="rounded-md"></video>
        </div>
      </>
    ),
  },
  {
    title: "Node Positioning",
    content: (
      <>
        <h2 className="flex justify-center text-[25px]">
          Use the arrows to change the positions of the start and end node
        </h2>
        <div className="flex justify-center mt-10 w-[13rem] ml-[20rem]">
          <video
            autoPlay
            muted
            loop
            src={select}
            className="rounded-md"
          ></video>
        </div>
        <div className="ml-[3rem] mt-[20px] text-[20px]">
          <p className="flex justify-center text-[20px]">
            Assign a row and column to both the start node (
            <FaLocationCrosshairs className="mt-[0.45rem] px-1 text-green-500" />{" "}
            ) and the end node (
            <FaLocationDot className="mt-[0.45rem] px-1 text-red-600" /> ).
          </p>
        </div>
      </>
    ),
  },
  {
    title: "You’re All Set!!",
    content: (
      <>
        <div className="flex justify-center mt-14 w-[25rem] ml-[30%]">
          <img src={set} alt="set" />
        </div>
        <div className="ml-[3rem] mt-[50px] text-[20px]">
          <p className="flex justify-center text-[1rem] text-center">
            ***You can increase or decrease the speed of visualization using the
            "speed" dropdown. Don't forget to click the green play button to
            visualize the algorithm.***
          </p>
        </div>
      </>
    ),
  },
];

const Tutorial = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isTutorialOpen, setIsTutorialOpen] = useState(true);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prevStep) => prevStep + 1);
    } else {
      setIsTutorialOpen(false);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep((prevStep) => prevStep - 1);
    }
  };

  const handleSkip = () => {
    setIsTutorialOpen(false);
  };

  if (!isTutorialOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center ">
      <div className="border rounded-md font-main w-[70%] bg-black opacity-95 p-6 h-[80vh] max-w-4xl ">
        <h1 className="flex justify-center text-[40px]">
          {steps[currentStep].title}
        </h1>
        <div className="content overflow-auto h-[calc(100%-120px)]">
          {steps[currentStep].content}
        </div>
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={handleSkip}
            className="border rounded-sm py-1 px-2 my-5 hover:text-red-500 hover:translate-y-1 hover:border-red-500 duration-500 ease-in-out"
          >
            Skip
          </button>
          <div className="flex text-[35px] gap-1">
            <IoIosArrowDropleftCircle
              onClick={handlePrev}
              className={`cursor-pointer ${currentStep === 0 ? "text-gray-500" : ""} hover:text-slate-400 duration-300 hover:-translate-x-1 ease-in-out`}
            />
            <IoIosArrowDroprightCircle
              onClick={handleNext}
              className={`cursor-pointer ${currentStep === steps.length - 1 ? "text-gray-500" : ""} hover:text-slate-400 duration-300 hover:translate-x-1 ease-in-out`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tutorial;
