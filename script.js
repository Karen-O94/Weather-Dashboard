$(document).ready(function () {

    //Variables
    var cityNames = [];
    var apiKey = "c38077db5d2d3cc7511c35c5146ebdb4";
    var city ="";
    var longitude = "";
    var latitude = "";


    // //Event added to search button 
    // $(".searchBtn").on("click", function (event){
    //     event.preventDefault();
    //     saveSearchedCity();
    //    retrieveCityArray;
    // });

    // function saveSearchedCity () {
    //     city = $("#city-input").val().trim();
    //     localStorage.setItem("searchedCity", JSON.stringify(city));

    //     cityNames.push(city);
    //     localStorage.setItem("cities", JSON.stringify(cityNames));
    //  };
     
    //  function retrieveCityArray() {
    //     var retrievedCityArray = localStorage.getItem("cities");
    //     city = JSON.parse(localStorage.getItem("searchedCity"));
    
    //     if (retrievedCityArray !== null) {
    //       cityNames = JSON.parse(retrievedCityArray);
    //       //renderCityButtons();
    //       cityLongLat();
    //     }
    //   };

    function cityLongLat() {
   
        var queryURL =
            "https://api.openweathermap.org/data/2.5/weather?q=" +
            city +
            "&appid=" +
            apiKey;
        $.ajax({
            url: queryURL,
            method: "GET",
        }).then(function (response) {
            longitude = response.coord.lon;
            latitude = response.coord.lat;
            getWeatherInfo();
        });
    }
    cityLongLat();

    function getWeatherInfo() {
        var queryURL =
            "https://api.openweathermap.org/data/2.5/onecall?lat=" +
            latitude +
            "&lon=" +
            longitude +
            "&exclude={part}&appid=" +
            apiKey;
        $.ajax({
            url: queryURL,
            method: "GET",
        })
            .then(function (response) {
                // Transfer content to HTML
               renderPageInfo(response);
            });
    };

    // function renderPageInfo() {
    //     currentCityTitle();
    //     renderCityInfo();
    // };

    // function currentCityTitle () {
    //     var cityTitle = $("#city-date");
    //     var date = moment().format('LL');
    //     cityTitle.text(city + "(" + date + ")");
    // }
    // currentCityTitle; 

    // function renderCityInfo (response) {
    //     var temp = response.current.temp;
    //     var humidity = response.current.humidity;
    //     var windSpeed = response.current.wind_speed;
    //     $(".present-temp").text("Temperature: " + temp);
    //     $(".present-humidity").text("Humidity: " + humidity);
    //     $(".present-wind").text("Wind Speed: " + windSpeed)
    // };
    // renderCityInfo();

});

