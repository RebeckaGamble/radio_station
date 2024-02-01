import { useEffect, useState } from "react";
import Search from "./components/Search";
import List from "./components/List";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import TestStation from "./components/TestStation";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [stations, setStations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://api.sr.se/api/v2/channels?format=json&size=100")
      .then((response) => {
        if (response.ok) {
          return response.json(); //if success
        }
        throw new Error("No network response");
      })
      .then((data) => {
        setStations(data.channels);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  //skeleton loader showing when searching for station - time, testing purpose
  useEffect(() => {
    if (searchTerm !== "") {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 300);
      return () => clearTimeout(timer);
    }
    setIsLoading(false);
  }, [searchTerm]);

  function handleInputChange(e) {
    setSearchTerm(e.target.value);
  }

  //iterate over stations, return filtered arr
  const filteredList = stations.filter((station) => {
    return (
      //convert station and searchTerm to lower case and check if station name contains/includes the searchTerm
      station.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      searchTerm != "" //dont show list if input is empty
    );
  });

  if (error) {
    return (
      <div className="flex flex-col items-center">
        <p className="text-[16px] my-4">
          {" "}
          <span className="text-red-300 text-[20px] font-bold ">
            {" "}
            Error:{" "}
          </span>{" "}
          {error.message}{" "}
        </p>
        <div className="underline text-blue-700 ">
          <a href="/">Go back</a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen sm:py-8 bg-gradient-to-b from-slate-100 to-blue-300">
      <div className="sm:border-4 sm:rounded-xl sm:border-slate-500 h-auto bg-white sm:shadow sm:shadow-white sm:w-[80%] py-10 mx-auto ">
        <Search
          id={"search"}
          placeholder={"Search"}
          label={"Search Radio Station: "}
          handleInputChange={handleInputChange}
          className={
            "border-2 border-slate-500 p-2 rounded-md shadow shadow-xl mb-4 flex-grow min-w-[280px] sm:w-full text-[16px]"
          }
        />
        {isLoading && (
          <>
            <p className="flex items-center justify-center font-semibold text-slate-400">
              Is loading..{" "}
            </p>
            <Skeleton
              count={5}
              className="mt-10 bg-red h-28 w-[280px] sm:w-[540px] mx-auto flex"
            />
          </>
        )}
        {filteredList == 0 && searchTerm != "" && (
          <i className="pl-10 text-red-600 text-[16px]">
            Can't find a station with that name, please try again.
          </i>
        )}
        <List station={filteredList} />
      </div>
    </div>
  );
}

export default App;
