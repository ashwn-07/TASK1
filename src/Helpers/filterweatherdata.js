export const filterWeatherData = (weatherData, dayIndexes) => {
    let filteredWeatherData = weatherData.data.list.filter((item, index) => {
        for (let i = 0; i < 5; i++) {
            let status = index === dayIndexes[i];
            if (status) {
                return item;
            }
        }
    });

    return filteredWeatherData;
};
