import React from "react";

function Station({ id, color, name, image, liveaudio }) {
  return (
    <div className="flex flex-col items-center gap-4 mt-6 mx-w">
      <div
        key={id}
        style={{ background: `#${color}` }}
        className="flex flex-row w-[280px] sm:w-full max-w-[540px] p-2 sm:p-4"
      >
        <div className="flex items-center w-[30%] border-r-2 border-white">
          <img src={`${image}`} alt={name} className="aspect-square pr-4" />
        </div>
        <div className="flex flex-col w-[70%] justify-between px-4 py-1 gap-2 sm:p-4">
          <h1 className="font-semibold text-xl sm:text-2xl">{name}</h1>
          <audio controls className="flex shrink w-[150px] h-1/2 sm:w-full">
            <source typeof="audio/mpeg" src={`${liveaudio.url}`} />
          </audio>
        </div>
      </div>
    </div>
  );
}

export default Station;
