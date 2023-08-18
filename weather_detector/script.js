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
        const countryCard = document.getElementById('country');
        const tempCard = document.getElementById('temp');
        const wsCard = document.getElementById('ws');
        const humidityCard = document.getElementById('hmdt');
        const ftempCard = document.getElementById('ftemp');
        const conditionCard = document.getElementById('condition');

        

        let cards = document.getElementsByClassName("card")
        
        for(const element of cards) {
            element.style.opacity = '1'
        }
    });
});



