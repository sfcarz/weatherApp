$(document).ready(function () {
    let $search = $('#searching');
    let $submit = $('#submit');
    let $history = $('#history');
    let storage = JSON.parse(localStorage.getItem('Search'));

    console.log(storage);

    $submit.on('click', function (event) {
    event.preventDefault();
    const search = $search.val();
    const aTag = $('<a>').addClass('list-group-item list-group-item-action').attr('href: #');
    localStorage.setItem('Search', JSON.stringify(search));

    $history.append(aTag);
    $search.val('')

    var settings = {
        "url": `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=4d3e71aa350785d4a2efee37a6cbbf4e`,
        "method": "GET",
        "timeout": 0,
    };

    $.ajax(settings).then(function (response) {
        console.log(response);

        const inputName = response.name;
        const date = moment().format('dddd, MMMM Do');
        const temp = response.main.temp;
        const tempF = (temp - 273.15) * 1.80 + 32;
        const humidity = response.main.humidity;
        const wind = response.wind.speed;
        const nameH1 = $('<h1>').text(inputName).addClass('card-title');
        const dateH3 = $('<h3>').text(date);
        const tempH5 = $('<h5>').text(`Temperature ${tempF.toFixed(2)}`);
        const humidH5 = $('<h5>').text(`Humidity ${humidity}%`);
        const windH5 = $('<h5>').text(`Wind Speed: ${wind}`);

        $('#userRequest').append(nameH1, dateH3, tempH5, humidH5, windH5)



        // console.log(inputName, date, temp, tempF, humidity, wind);
        // const icon = response.weather.first().last();
        // console.log(icon);
    });
});



    



    





});