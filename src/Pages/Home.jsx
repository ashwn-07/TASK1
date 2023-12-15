import axios from "axios";
import React, { useEffect, useState } from "react";
import { getDayIndexes } from "../Helpers/dayindexes";
import { filterWeatherData } from "../Helpers/filterweatherdata";

const Home = () => {
    const [cityName, setCityName] = useState("");
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [isCityDisabled, setIsCityDisabled] = useState(false);
    const [isCo_ordDisabled, setIsCo_ordDisabled] = useState(true);
    const [weatherData, setWeatherdData] = useState([]);

    const handleSearch = async () => {
        try {
            const data = await axios.get(
                "https://api.openweathermap.org/data/2.5/forecast?lat=20.0287732&lon=79.1231918&appid=e586fb1bf1f0206cdc114d49d84c8ec7"
            );

            let dayIndexes = getDayIndexes(data);
            let filteredWeatherData = filterWeatherData(data, dayIndexes);
            setWeatherdData(filteredWeatherData);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <main>
                <h1>Weather Forecast</h1>

                <section>
                    <div>
                        <input
                            placeholder="Enter City"
                            value={cityName}
                            onChange={(e) => setCityName(e.target.value)}
                        />{" "}
                        OR
                        <input
                            placeholder="Enter co-ordinates"
                            value={latitude}
                            onChange={(e) => setCoordinates(e.target.value)}
                        />
                        <button onClick={handleSearch}>search</button>
                    </div>
                    <article className=" mt-20 flex flex-wrap space-x-4 space-y-6">
                        {weatherData.map((item, index) => (
                            <div className=" bg-stone-300 h-360 w-270 rounded-xl ">
                                <div className="flex flex-col justify-center pt-10 pb-10 w-full">
                                    <p className="text-3xl text-center mb-8">
                                        21<span>&#8451;</span>
                                    </p>
                                    <h1 className="mx-5"> Humidity </h1>
                                    <h1 className="m-5">Wind Speed {item.wind.speed}</h1>
                                    <h1></h1>
                                </div>
                                <div className="flex justify-center"></div>
                            </div>
                        ))}
                    </article>
                    <button className="bg-blue-300 p-1 rounded-md" onClick={handleSearch}>
                        More Info
                    </button>
                </section>
            </main>
        </>
    );
};

export default Home;
