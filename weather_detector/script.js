function getIP(callback) {
    const ipv4Url = 'https://api.ipify.org?format=json'
    fetch(ipv4Url)
    .then(response => response.json())
    .then(data => {
        //ipv4 = data.ip
        callback(data.ip)
    })
    .catch(error => {
        console.error('Error fetching data: ', error)
    });
}

function getWeather(ip,callback) {
    const weatherUrl = 'http://api.weatherapi.com/v1/current.json?q=' + ip
    const weatherKey = 'f7ac7ff557154dac866131959231508'

    fetch(weatherUrl, {
        method: "GET",
        headers: {
            "key": weatherKey
        }
    })
    .then(response => response.json())
    .then(data => {
        callback(data)
    })
    .catch(error => {
        console.error('Error fetching data:', error);
        });
}

getIP(function(ip) {
    getWeather(ip, function(weather) {
        const countryCard = document.getElementById('country');
        const tempCard = document.getElementById('temp');
        const wsCard = document.getElementById('ws');
        const humidityCard = document.getElementById('hmdt');
        const ftempCard = document.getElementById('ftemp');
        const conditionCard = document.getElementById('condition');

        countryCard.innerHTML = `
        <span>
            Country & City:
            <br>
            ${weather.location.country}, ${weather.location.name}
            </span>
        `
        tempCard.innerHTML = `
        <span>
            Temperature:<br>
            ${weather.current.temp_c}ºC
        </span>
        `
        wsCard.innerHTML = `
        <span>
            Wind Speed:
            <br>
            ${weather.current.wind_kph} Km/h
        </span>
        `
        humidityCard.innerHTML = `
        <span>
            Humidity:
            <br>
            ${weather.current.humidity} g/m³
        </span>
        `
        ftempCard.innerHTML = `
        <span>
            Temperature Feel:
            <br>
            ${weather.current.feelslike_c} ºC
        </span>
        `
        conditionCard.innerHTML = `
        <span>
            Condition:
            <br>
            ${weather.current.condition.text}
            <br>
            <img src="${weather.current.condition.icon}">`
    });
});



