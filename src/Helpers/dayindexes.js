export const getDayIndexes = (weatherData) => {
    let dayIndexes = [];
    if (weatherData.data.list) {
        let temp = weatherData.data.list[1].dt_txt.slice(8, 10); //gets the date of first item.

        weatherData.data.list.forEach((item, index) => {
            if (temp == item.dt_txt.slice(8, 10)) {
                if (item.dt_txt.slice(11, 13) === "12") {
                    dayIndexes.push(index);
                }
            } else {
                temp = item.dt_txt.slice(8, 10);
            }
        });
    }
    return dayIndexes;
};
