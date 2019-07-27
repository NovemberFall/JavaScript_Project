// // All kind DOM manipulation
// const cityFrom = document.getElementsByTagName('form')[0];

// const updateCity = async (city) => {
//     const tempCityDets = await getCity(city);
//     const tempWeather = await getWeather(tempCityDets.Key);

//     return {
//         cityDets: tempCityDets,
//         weather: tempWeather
//     };
// }


// cityFrom.addEventListener('submit', (e) => {
//     //prevent default action
//     e.preventDefault();

//     //get city value
//     const city = cityFrom.city.value.trim();
//     cityFrom.reset();

//     //update the ui with new city
//     updateCity(city)
//         .then(data => console.log(data))
//         .catch(error => console.log(error));
// })

















// //shorthand notation
// // All kind DOM manipulation
// const cityFrom = document.getElementsByTagName('form')[0];

// const updateCity = async (city) => {
//     const cityDetails = await getCity(city);
//     const weather = await getWeather(cityDetails.Key);

//     return { cityDetails, weather };//shorthand notation
// }


// cityFrom.addEventListener('submit', (e) => {
//     //prevent default action
//     e.preventDefault();

//     //get city value
//     const city = cityFrom.city.value.trim();
//     cityFrom.reset();

//     //update the ui with new city
//     updateCity(city)
//         .then(data => console.log(data))
//         .catch(error => console.log(error));
// })





















// updating the UI
// All kind DOM manipulation
const cityFrom = document.getElementsByTagName('form')[0];
const card = document.querySelector('.card');
const detatils = document.querySelector('.detail');

const updateUI = (data) => {

    const cityDetails = data.cityDetails;
    const weather = data.weather;

    //update deatils template
    detatils.innerHTML = `
    <h5 class="my-3">${cityDetails.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display-4 my-4">
      <span>${weather.Temperature.Metric.Value}</span>
      <span>&deg;C</span>
    </div>
    `;
}

const updateCity = async (city) => {
    const cityDetails = await getCity(city);
    const weather = await getWeather(cityDetails.Key);

    return { cityDetails, weather };//shorthand notation
}


cityFrom.addEventListener('submit', (e) => {
    //prevent default action
    e.preventDefault();

    //get city value
    const city = cityFrom.city.value.trim();
    cityFrom.reset();

    //update the ui with new city
    updateCity(city)
        .then(data => updateUI(data))
        .catch(error => console.log(error));
})
