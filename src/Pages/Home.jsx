import axios from "axios";
import React, { useEffect, useState } from "react";

const Home = () => {
    const [cityName, setCityName] = useState("");
    const [coordinates, setCoordinates] = useState("");
    const [isCityDisabled, setIsCityDisabled] = useState(false);
    const [isCo_ordDisabled, setIsCo_ordDisabled] = useState(true);

    const handleSearch = async () => {
        try {
            const data = await axios.get(
                "https://api.openweathermap.org/data/2.5/forecast?lat=20.0287732&lon=79.1231918&appid=e586fb1bf1f0206cdc114d49d84c8ec7"
            );
            let dayIndexes = new Array(5);
            if (data?.data?.list) {
                let temp = data.data.list[1].dt_txt.slice(8, 10); //gets the date of first item.
                
                console.log("HIII", dayIndexes);
                data.data.list.forEach((item, index) => {
                    if (temp == item.dt_txt.slice(8, 10)) {
                        if (item.dt_txt.slice(11, 13) === "12") {
                            dayIndexes.push(index);
                        }
                    } else {
                        temp = item.dt_txt.slice(8, 10);
                    }
                });
            }

            console.log(dayIndexes); //now it have the whether data that needs to be printed. fileter this out from main data and map that array.
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        console.log(coordinates, cityName);
    }, [coordinates, cityName]);

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
                            value={coordinates}
                            onChange={(e) => setCoordinates(e.target.value)}
                        />
                        <button onClick={handleSearch}>search</button>
                    </div>
                    <article className=" mt-20">
                        <div className=" bg-stone-300 h-420 w-270 rounded-xl">
                            <div className="flex flex-col justify-center pt-10 pb-10 w-full">
                                <p className="text-3xl text-center mb-8">
                                    21<span>&#8451;</span>
                                </p>
                                <h1 className="mx-5"> Humidity </h1>
                                <h1 className="m-5">Wind Speed</h1>
                                <h1></h1>
                            </div>
                            <div className="flex justify-center">
                                <button
                                    className="bg-blue-300 p-1 rounded-md"
                                    onClick={handleSearch}
                                >
                                    More Info
                                </button>
                            </div>
                        </div>
                    </article>
                </section>
            </main>
        </>
    );
};

export default Home;
