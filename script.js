$(document).ready(function () {
    let $search = $('#search').text().trim();
    let $submit = $('#submit')
    console.log($search);


    var settings = {
    "url": "https://api.openweathermap.org/data/2.5/weather?q=san francisco&appid=4d3e71aa350785d4a2efee37a6cbbf4e",
    "method": "GET",
    "timeout": 0,
};

    $.ajax(settings).done(function (response) {
    // console.log('Open Weather Map', response);


    $submit.on('click', function (event) {
        event.preventDefault();
        console.log('button Works');

        localStorage.setItem('Search', JSON.stringify($search));
    })



});







});