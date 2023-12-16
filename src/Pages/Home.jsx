import axios from "axios";
import React, { useEffect, useState } from "react";
import { getDayIndexes } from "../Helpers/dayindexes";
import { filterWeatherData } from "../Helpers/filterweatherdata";
import dayjs from "dayjs";

const Home = () => {
  const [cityName, setCityName] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [fetchedLatitude, setFetchedLatitude] = useState(null);
  const [fetchedLongitude, setFetchedLongitude] = useState(null);
  const [isSearchByCity, setIsSearchByCity] = useState(false);
  const [isCo_ordDisabled, setIsCo_ordDisabled] = useState(true);
  const [weatherData, setWeatherdData] = useState([]);
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [cities, setCities] = useState([]);

  const handleSearch = async () => {
    try {
      const data = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=e586fb1bf1f0206cdc114d49d84c8ec7`
      );
      console.log(data);
      setCountry(data.data.city.country);
      setState(data.data.city.name);
      let dayIndexes = getDayIndexes(data);
      let filteredWeatherData = filterWeatherData(data, dayIndexes);
      setWeatherdData(filteredWeatherData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCitySearch = async () => {
    const city = cityName;

    const data = await axios.get(
      `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=e586fb1bf1f0206cdc114d49d84c8ec7`
    );
    setCities(data.data);

    console.log(data);
  };

  const handleGeoClick = (lat, lon) => {
    setFetchedLatitude(lat);
    setFetchedLongitude(lon);

    console.log("clicked");
  };

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const data = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${fetchedLatitude}&lon=${fetchedLongitude}&appid=e586fb1bf1f0206cdc114d49d84c8ec7`
        );
        console.log(data);
        setCountry(data.data.city.country);
        setState(data.data.city.name);
        let dayIndexes = getDayIndexes(data);
        let filteredWeatherData = filterWeatherData(data, dayIndexes);
        setWeatherdData(filteredWeatherData);
      } catch (error) {
        console.log(error);
      }
    };
    if (fetchedLatitude && fetchedLongitude) {
      fetchWeatherData();
    }
  }, [fetchedLatitude, fetchedLongitude]);

  const WeatherDataView = () => {
    return (
      <>
        {" "}
        <div>
          <h1>
            Country: <span>{country}</span>
          </h1>
          <h1>
            State: <span>{state}</span>
          </h1>
        </div>
        <article className=" mt-20 flex flex-wrap space-x-4 space-y-6">
          {weatherData.map((item, index) => (
            <div className=" bg-stone-300 h-360 w-270 rounded-xl ">

              <div className="flex flex-col justify-center pt-10 pb-10 w-full">
                <p className="">
                   {
                    dayjs(item.dt_txt).toString().slice(0,11)
                   }
                </p>
                <p className="text-3xl text-center mb-8">
                  21<span>&#8451;</span>
                </p>
                <h1 className="mx-5"> Humidity </h1>
                <h1 className="m-5">Wind Speed {item.wind.speed}</h1>
                <h1></h1>
              </div>
              <div className="flex justify-center">
                {" "}
                <button className="bg-blue-300 p-1 rounded-md">
                  More Info
                </button>
              </div>
            </div>
          ))}
        </article>
      </>
    );
  };

  const CoordinateSearch = () => {
    return (
      <div className="flex space-x-4 mt-4">
        <input
          placeholder="latitiude"
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
        />
        <input
          placeholder="longitude"
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
        />
        <button onClick={handleSearch}>search</button>
      </div>
    );
  };

  return (
    <>
      <main>
        <h1>Weather Forecast</h1>
        <div>
          <div className="flex">
            {" "}
            <input
              placeholder="Enter City"
              value={cityName}
              onChange={(e) => setCityName(e.target.value)}
            />
            <button onClick={handleCitySearch} className="ms-4">
              search
            </button>
          </div>{" "}
          <br />
          OR
          <CoordinateSearch />
        </div>
        <div>
          <div className="flex ">
            {cities.map((item, index) => {
              return (
                <ul
                  className="flex"
                  onClick={(e) => handleGeoClick(item.lat, item.lon)}
                >
                  <li>{item.name},</li>
                  <li>
                    {item?.state}
                    {item?.state && ","}
                  </li>
                  <li className="pe-4">{item.country}</li>&nbsp; &nbsp;
                </ul>
              );
            })}
          </div>
        </div>

        <section>
          <WeatherDataView />
        </section>
      </main>
    </>
  );
};

export default Home;
