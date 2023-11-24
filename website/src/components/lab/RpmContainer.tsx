import Image from "next/image";
import React, { useState, useRef } from "react";

const RpmContainer = () => {
  const [rpm, setRpm] = useState("5");

  const tireRef = useRef<HTMLImageElement>(null);

  const changeRpm = (newRpm: string) => {
    setRpm(newRpm);

    if (tireRef.current && Number(newRpm)) {
      tireRef.current.style.animation = `spin ${
        60 / Number(newRpm)
      }s infinite linear`;
    }
  };

  return (
    <section className="w-full h-screen flex items-center justify-center">
      <div className="p-8 rounded-lg border bg-white shadow-2xl flex flex-col items-center justify-center w-full max-w-[400px]">
        <h1 className="mb-8 text-2xl">Apgriezieni minūtē</h1>

        <Image
          src="/lab/tire.png"
          alt="Tire"
          width={400}
          height={400}
          className="w-48 h-48"
          style={{
            animation: `spin ${60 / Number(rpm)}s infinite linear`,
          }}
          draggable={false}
          ref={tireRef}
        />

        <div className="flex w-full mt-8">
          <button
            className="h-12 w-12 bg-accent"
            onClick={() => changeRpm(String(Number(rpm) - 1))}
          >
            -
          </button>
          <input
            type="number"
            name="rpm"
            id="rpm"
            className="flex-1 h-12 px-4 text-xl text-center"
            value={rpm}
            onChange={(e) => changeRpm(e.target.value)}
            placeholder="RPM"
          />
          <button
            className="h-12 w-12 bg-accent"
            onClick={() => changeRpm(String(Number(rpm) + 1))}
          >
            +
          </button>
        </div>
      </div>
    </section>
  );
};

export default RpmContainer;
