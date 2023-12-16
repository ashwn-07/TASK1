import axios from "axios";
import React, { useEffect, useState } from "react";
import { getDayIndexes } from "../Helpers/dayindexes";
import { filterWeatherData } from "../Helpers/filterweatherdata";
import dayjs from "dayjs";
import WeatherIcon from "../Components/WeatherIcon";

const Home = () => {
  const [cityName, setCityName] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [fetchedLatitude, setFetchedLatitude] = useState(null);
  const [fetchedLongitude, setFetchedLongitude] = useState(null);
  const [weatherData, setWeatherdData] = useState([]);
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [cities, setCities] = useState([]);
  const [isInfoClicked, setIsInfoClicked] = useState(false);
  const [weatherDescription, setWeatherDescription] = useState();

  const handleWeatherFetch = async (lat, lon) => {
    try {
      const data = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=e586fb1bf1f0206cdc114d49d84c8ec7`
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

  const handleCityFetch = async () => {
    const data = await axios.get(
      `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=e586fb1bf1f0206cdc114d49d84c8ec7`
    );
    setCities(data.data);
  };

  const handleGeoConvert = (lat, lon) => {
    setFetchedLatitude(lat);
    setFetchedLongitude(lon);
  };

  useEffect(() => {
    if (fetchedLatitude && fetchedLongitude) {
      handleWeatherFetch(fetchedLatitude, fetchedLongitude);
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
        <article className=" mt-20 flex flex-wrap">
          {weatherData.map((item, index) => (
            <div className=" bg-stone-300 h-360 w-270 rounded-xl my-2 mx-4">
              <div className="flex flex-col justify-center pt-10 pb-2 w-full">
                <p className="ms-4">
                  {dayjs(item.dt_txt).toString().slice(0, 11)}
                </p>
                <p className="text-3xl text-center mb-8">
                  {(item.main.temp - 273.15).toFixed(0)}
                  <span>&#8451;</span>
                </p>
                <h1 className="mx-5"> Humidity {item.main.humidity} </h1>
                <h1 className="m-5">Wind Speed {item.wind.speed} m/s</h1>
                <h1></h1>
              </div>
              <div className="flex justify-center flex-col items-center">
                {" "}
                <h1 className="text-xl">Description</h1>
                <p>{item.weather[0].description}</p>
              </div>
            </div>
          ))}
        </article>
      </>
    );
  };

  const CoordinateSearch = () => {
    return (
      <div className="flex mt-4 flex-wrap items-center">
        <input
          className="ms-2 my-2 rounded-md px-2 py-2"
          placeholder="latitiude"
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
        />
        <input
          className="ms-2 my-2  rounded-md px-2 py-2"
          placeholder="longitude"
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
        />
        <button
          className="bg-green-400 h-fit ms-2 px-2 py-2 rounded-md text-white"
          onClick={() => handleWeatherFetch(latitude, longitude)}
        >
          search
        </button>
      </div>
    );
  };

  return (
    <>
      <main className=" bg-gradient-to-r from-blue-400 to-slate-400 h-screen relative">
        <div className="flex w-full bg-fuchsia-100 justify-center">
          <div className="relative "><h1 className="text-center text-5xl pt-4 font-rob">Weather Forecast</h1>
        <WeatherIcon /></div></div>
        
        <div>
          <div className="flex items-center">
            {" "}
            <input
              className="ms-2 my-2 rounded-md px-2 py-2"
              placeholder="Enter City"
              value={cityName}
              onChange={(e) => setCityName(e.target.value)}
            />
            <button
              className="bg-green-400 h-fit ms-2 px-2 py-2 rounded-md text-white"
              onClick={handleCityFetch}
            >
              search
            </button>
          </div>{" "}
          <br />
          OR
          <CoordinateSearch />
        </div>

        <div>
          <div className="flex flex-wrap">
            {cities.map((item, index) => {
              return (
                <ul
                  className="flex"
                  onClick={(e) => handleGeoConvert(item.lat, item.lon)}
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
