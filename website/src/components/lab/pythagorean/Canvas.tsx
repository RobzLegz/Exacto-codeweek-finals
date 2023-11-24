import React, { useRef, useEffect, useState } from "react";

const Canvas = ({ sideA, sideB }) => {
  const canvasRef = useRef(null);
  const [hypotenuse, setHypotenuse] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    context.clearRect(0, 0, canvas.width, canvas.height);

    if (!sideA || !sideB) return;

    const a = parseFloat(sideA);
    const b = parseFloat(sideB);

    if (isNaN(a) || isNaN(b)) {
      setHypotenuse(null);
      return;
    }

    const c = Math.sqrt(a * a + b * b);
    setHypotenuse(c);

    // Draw the triangle
    context.beginPath();
    context.moveTo(50, 50); // Starting point
    context.lineTo(50, 50 + a); // Side A
    context.lineTo(50 + b, 50); // Side B
    context.closePath();
    context.strokeStyle = "blue";
    
    context.stroke();

    // Draw the hypotenuse
    context.beginPath();
    context.moveTo(a, 50);
    context.lineTo(b, 10 + a);
    context.strokeStyle = "red";
    context.stroke();
  }, [sideA, sideB]);

  return (
    <div className="w-full h-full">
      <canvas
        ref={canvasRef}
        width={500}
        height={500}
        style={{ border: "1px solid black" }}
      />

      {hypotenuse && <p className="mt-2">Hypotenuse length: {hypotenuse.toFixed(2)}</p>}
    </div>
  );
};

export default Canvas;
