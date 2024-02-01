import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function TestStation() {
  const [channels, setChannels] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.sr.se/api/v2/channels?format=json&size=100")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("No response");
      })
      .then((data) => {
        setChannels(data.channels);
      })
      .catch((error) => {
        console.error("error msg", error);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-2xl text-black py-4 font-semibold">
        Radio stations:{" "}
      </h1>
      {channels.length === 0 || loading ? (
        <>
          <p>loading...</p>
          <Skeleton
            count={5}
            className="mt-10 bg-red h-28 w-[80%] mx-auto flex"
          />
        </>
      ) : (
        channels.map((channel) => {
          return (
            <>
              <div
                key={channel.id}
                className="flex py-3 px-4 max-w-[540px] border-black border min-h-[180px] mb-4"
                style={{ backgroundColor: `#${channel.color}` }}
              >
                <div className="flex flex-row gap-4">
                  <div className="flex w-[30%] h-auto my-auto border-r-2 border-black">
                    <img
                      src={`${channel.image}`}
                      alt={`${channel.name}`}
                      className="aspect-square"
                    />
                  </div>
                  <div className="flex flex-col justify-between p-4">
                    <h1 className="font-bold text-4xl">{channel.name} </h1>
                    <audio controls>
                      <source
                        src={`${channel.liveaudio.url}`}
                        type="audio/mpeg"
                      />
                    </audio>
                  </div>
                </div>
              </div>
            </>
          );
        })
      )}
    </div>
  );
}
