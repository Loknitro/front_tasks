function setOpacity (object) {
    object.style.opacity = '1'
}

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
        let iconString = weather.current.condition.icon
        iconString = iconString.substring(21)
        const cards = document.getElementsByClassName('card')
        const countryCard = document.getElementById('country').getElementsByClassName('info')[0]
        const tempCard = document.getElementById('temp').getElementsByClassName('info')[0]
        const wsCard = document.getElementById('ws').getElementsByClassName('info')[0]
        const humidityCard = document.getElementById('hmdt').getElementsByClassName('info')[0]
        const ftempCard = document.getElementById('ftemp').getElementsByClassName('info')[0]
        const conditionCard = document.getElementById('condition').getElementsByClassName('info')[0]
        
        countryCard.textContent = weather.location.country + ", " + weather.location.name
        tempCard.textContent = weather.current.temp_c + " ºC"
        wsCard.textContent = weather.current.wind_kph + " Km/h"
        humidityCard.textContent = weather.current.humidity + " g/m³"
        ftempCard.textContent = weather.current.feelslike_c + " ºC"

        const conditionImage = document.createElement('img')
        conditionImage.src = iconString
        conditionCard.textContent = weather.current.condition.text
        conditionCard.appendChild(conditionImage)

        for(const element of cards) {
            element.style.opacity = '1'
        }
    });
});



