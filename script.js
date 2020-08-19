$(document).ready(function () {
    let $search = $('#searching');
    let $submit = $('#submit');
    let $history = $('#history');
    let storage = JSON.parse(localStorage.getItem('Search'));

    // console.log(storage);

    $submit.on('click', function (event) {
    event.preventDefault();
    const search = $search.val();
    const aTag = $('<a>').addClass('list-group-item list-group-item-action').attr('href: #');
    localStorage.setItem('Search', JSON.stringify(search));

    $history.append(aTag).text(storage);
    $search.val('');

    $.ajax({
        url: `http://api.weatherstack.com/current?access_key=f1a8eeecc5bdbf06ef0f440e0391e09c&query=${search}`,
        method: "GET",
    }).then(function(response) {
        console.log(response);

        const inputName = response.location.name;
        const date = moment().format('dddd, MMMM Do');
        const icon = response.current.weather_icons[0];
        const description = response.current.weather_description;
        const temp = response.current.temperature;
        const tempF = (temp * 9/5) + 32;
        const humidity = response.current.humidity;
        const wind = response.current.wind_speed;
        const windDir = response.current.wind_dir;
        const uvIndex = response.current.uv_index;
        const visibility = response.current.visibility;
        const nameH1 = $('<h1>').text(inputName).addClass('card-title pl-4');
        const dateH3 = $('<h3>').text(date).addClass('pl-4');
        const desH3 = $('<h5>').text(description).addClass('pl-4');
        const tempH5 = $('<h5>').text(`Temperature ${tempF.toFixed(2)}°`).addClass('pl-4');
        const humidH5 = $('<h5>').text(`Humidity ${humidity}%`).addClass('pl-4');
        const windH5 = $('<h5>').text(`Wind Speed: ${wind}`).addClass('pl-4');
        const windDirection = $('<h5>').text(`Wind Direction: ${windDir}`).addClass('pl-4');
        const viseH5 = $('<h5>').text(`Visability: ${visibility} mi`).addClass('pl-4');
        const uvH5 = $('<h5>').text(`UV: ${uvIndex}`).addClass('pl-4');
        $('#userRequest').append(nameH1, dateH3, desH3, tempH5, humidH5, windH5, windDirection, viseH5, uvH5)
        // console.log(tempF);
        // console.log(icon);
    });

    $.ajax({
        url: `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=4d3e71aa350785d4a2efee37a6cbbf4e`,
        method: 'GET',
    }).then(function(response) {
        // console.log(response);
        const lat = response.coord.lat;
        const long = response.coord.lon;
        // console.log(lat, long);
    $.ajax({
        url: `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=current,minutely,hourly&appid=4d3e71aa350785d4a2efee37a6cbbf4e`,
        method: 'GET',
    }).then(function(response) {
        // console.log(response);
        const unix = response.daily[0].dt;
        const m = moment(unix).format('dddd Do')
        const icon = response.daily[0].weather[0].icon;
        const temp = response.daily[0].temp.max;
        const tempF = (temp - 273.15) * 1.80 + 32;
        const humid = response.daily[0].humidity;
        // console.log(temp, tempF);
        const card = $('<div>').addClass('card-body  bg-secondary')
        const day = $('<h5>').addClass('card-title').text(m);
        const iconTag = $('<a>').attr(`href: ${icon}`);
        const tempTag = $('<p>').text(`Temp: ${tempF.toFixed(2)}°`);
        const humidTag = $('<p>').text(`Humidity: ${humid}%`)
        card.append(day, tempTag, humidTag),
        $('#card').append(card);
        // console.log(icon);



        // This was a Fun experience

        // const unixMill = unix * 1000;
        // const newDate = new Date(unixMill);
        // const time = newDate.toLocaleString();
        // console.log(time);

    });

    });

    
});



});

