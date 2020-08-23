$(document).ready(function () {
    let $search = $('#searching');
    let $submit = $('#submit');
    let $history = $('#history');
    let cityList = JSON.parse(localStorage.getItem('Search'));
    let memory = [];

    

    console.log(memory);

    $submit.on('click', function (event) {
        event.preventDefault();
        $('#userRequest').empty();
        $('#card').empty();

        const search = $search.val();
        // const memory = [];
        memory.push(search);;
        

    const aTag = $('<a>').addClass('list-group-item list-group-item-action').attr('href: #');
        localStorage.setItem('Search', JSON.stringify(memory));
        

    // $history.append(aTag).text(storage);
    $search.val('');

    $.ajax({
        url: `http://api.weatherstack.com/current?access_key=f1a8eeecc5bdbf06ef0f440e0391e09c&query=${search}`,
        method: "GET",
    }).then(function(response) {
        // console.log(response);
        // console.log(response.current);
        // console.log(response.current.weather_icons[0]);

        const inputName = response.location.name;
        const date = moment().format('dddd, MMMM Do');
        const icon = response.current.weather_icons[0];
        const description = response.current.weather_descriptions[0];
        const temp = response.current.temperature;
        const tempF = (temp * 9/5) + 32;
        const humidity = response.current.humidity;
        const wind = response.current.wind_speed;
        const windDir = response.current.wind_dir;
        const uvIndex = response.current.uv_index;
        const visibility = response.current.visibility;
        
        const divWeather = $('<div>').addClass('bg-light pr-1')
        const nameH1 = $('<h1>').text(inputName).addClass('card-title pl-4');
        const dateH3 = $('<h3>').text(date).addClass('pl-4');
        const desH3 = $('<h5>').text(description).addClass('pl-4');
        const tempH5 = $('<h5>').text(`Temperature ${tempF.toFixed(2)}°`).addClass('pl-4');
        const humidH5 = $('<h5>').text(`Humidity ${humidity}%`).addClass('pl-4');
        const windH5 = $('<h5>').text(`Wind Speed: ${wind}`).addClass('pl-4');
        const windDirection = $('<h5>').text(`Wind Direction: ${windDir}`).addClass('pl-4');
        const viseH5 = $('<h5>').text(`Visibility: ${visibility} mi`).addClass('pl-4');
        const uvH5 = $('<h5>').text(`UV: ${uvIndex}`).addClass('pl-4');
        divWeather.append(nameH1, dateH3, desH3, tempH5, humidH5, windH5, windDirection, viseH5, uvH5);
        $('#userRequest').append(divWeather)
        // console.log(icon, description);
    });

    $.ajax({
        url: `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=4d3e71aa350785d4a2efee37a6cbbf4e`,
        method: 'GET',
    }).then(function(response) {
        const lat = response.coord.lat;
        const long = response.coord.lon;
    $.ajax({
        url: `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=current,minutely,hourly&appid=4d3e71aa350785d4a2efee37a6cbbf4e`,
        method: 'GET',
    }).then(function(response) {
        // console.log(response);

        for (let i = 1; i < 6; i++) {

        const unix = response.daily[i].dt;
        const date = moment.unix(unix).format('dddd');
        const icon = response.daily[i].weather[0].icon;
        const temp = response.daily[i].temp.max;
        const tempF = (temp - 273.15) * 1.80 + 32;
        const humid = response.daily[i].humidity;
        // console.log(icon);
        const mainDiv = $('<div>').addClass('card-group');
        const div = $('<div>').addClass('card bg-primary text-light m-1 pl-2 pr-2');
        const card = $('<div>').addClass('card-body');
        const day = $('<h5>').addClass('card-title').text(date);
        const iconTag = $('<img>').attr(`src: ${icon} alt: 'weather icon'`,);
        const tempTag = $('<p>').text(`Temp: ${tempF.toFixed(2)}°`);
        const humidTag = $('<p>').text(`Humidity: ${humid}%`);
        div.append(card, day, iconTag, tempTag, humidTag);
        mainDiv.append(div);
        $('#card').append(mainDiv);

        // This was a Fun experience

        // const unixMill = unix * 1000;
        // const newDate = new Date(unixMill);
        // const time = newDate.toLocaleString();
        // console.log(time);
    };
    });
    });
});
});

