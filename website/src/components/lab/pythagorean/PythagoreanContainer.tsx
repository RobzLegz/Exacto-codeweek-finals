import React, { useState } from "react";
import Canvas from "./Canvas";

function Pythagorean() {
  const [sideA, setSideA] = useState("400");
  const [sideB, setSideB] = useState("350");

  return (
    <div className="w-full h-full flex items-center justify-center flex-col pt-40 pb-10">
      <div className="p-8 rounded-lg border bg-white shadow-2xl flex flex-col items-center justify-center w-full max-w-[900px]">
        <h1 className="mb-8 text-2xl">Pythagorean Theorem Visualizer</h1>

        <div className="w-full flex flex-col">
          <label>Side A:</label>
          <input
            type="number"
            value={sideA}
            onChange={(e) => setSideA(e.target.value)}
          />
        </div>

        <div className="w-full flex flex-col mb-4 mt-2">
          <label>Side B:</label>
          <input
            type="number"
            value={sideB}
            onChange={(e) => setSideB(e.target.value)}
          />
        </div>

        <Canvas sideA={sideA} sideB={sideB} />
      </div>
    </div>
  );
}

export default Pythagorean;
