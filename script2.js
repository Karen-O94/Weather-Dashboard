$(document).ready(function () {

    //add click event to search button to trigger all the functions
    $(".searchBtn").on("click", function (event) {
        event.preventDefault(); //Prevents default function of button
        saveSearchedCity();
        retrieveCityArray();
    });

    var city = "";
    var cityNames = [];

    //This function saves the city names and stores it in the user's locatStorage
    function saveSearchedCity() {
        city = $("#city-input").val().trim();
        localStorage.setItem("searchedCity", JSON.stringify(city));

        cityNames.push(city);
        localStorage.setItem("cities", JSON.stringify(cityNames));
    };

    //retrieves items from localStorage
    function retrieveCityArray() {
        var retrievedCityArray = localStorage.getItem("cities");
        city = JSON.parse(localStorage.getItem("searchedCity"));

        if (retrievedCityArray !== null) {
            cityNames = JSON.parse(retrievedCityArray);
            addCityButtons();
            cityLongLat();
        }
    };

    //Function to add city buttons to side navbar
    function addCityButtons() {
        $("#add-city-div").empty();
        for (var i = 0; i < cityNames.length; i++) {
            var newCityBtn = $("<button>");
            newCityBtn.addClass("btn btn-outline-secondary city-btn");
            newCityBtn.attr("city-name", cityNames[i]);
            newCityBtn.text(cityNames[i]);

            $("#add-city-div").prepend(newCityBtn)
        }
    }

    function clickedCityInfo () {
       city = $(this).attr("city-name");
       localStorage.setItem("searchedCity", JSON.stringify(city));
       cityLongLat();
    }
    //variables showing APIKey used through out
    var apiKey = "c38077db5d2d3cc7511c35c5146ebdb4";
    var longitude = "";
    var latitude = "";

    //1st API required to retrieve City Name using Longitude & Latitude info
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
            console.log(response);
            longitude = response.coord.lon;
            latitude = response.coord.lat;
            getWeatherInfo();
        });
    }
    cityLongLat();

    //2nd API call required to retrieve the weather info
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
                console.log(response);
                renderFullPage(response);
            });
    };

    //Displays full page
    function renderFullPage(response) {
        currentCityTitle(response);
        renderCityInfo(response);
        uvIndexIndicator(response);
        display5DayForecast(response);
        //$("#5day-forecast").css("display", "block");
    };
    //This function retrieves specific weather info
    function renderCityInfo(response) {
        var temp = fromKelvinToCelsius(response.current.temp);
        var humidity = response.current.humidity;
        var windSpeed = mPerSectoMPH(response.current.wind_speed);
        var uvIndex = response.current.uvi;
        $(".present-temp").text("Temperature: " + temp + "°C");
        $(".present-humidity").text("Humidity: " + humidity + "%");
        $(".present-wind").text("Wind Speed: " + windSpeed + "MPH");
        $(".present-uvi").text("UV Index: " + uvIndex);
        uvIndexIndicator(uvIndex);
    };
    //renderCityInfo();

    //changes temp from Kelvin to Celsius
    function fromKelvinToCelsius(kelvin) {
        return Math.round((kelvin - 273.15) * 10) / 10;
    };

    //changes speed to mph
    function mPerSectoMPH(speed) {
        return (speed * 2.23694).toFixed(1);
    };

    //Next function retrieves determines if UV Index is moderate, high or low
    function uvIndexIndicator(uvIndex) {
        if (uvIndex <= 2) {
            $(".present-uvi").addClass("low")
            $(".present-uvi").removeClass("moderate severe");
        } else if (uvIndex > 2 && uvIndex <= 5) {
            $(".present-uvi").addClass("moderate");
            $(".present-uvi").removeClass("low severe")
        } else if (uvIndex >= 6) {
            $(".present-uvi").addClass("severe");
            $(".present-uvi").removeClass("low moderate")
        }

    };

    //Displays current city & present date
    function currentCityTitle(response) {
        var cityTitle = $("#city-date");
        var date = moment().format('L');
        var titleIcon = $("<img>");
        var iconCode = response.current.weather[0].icon;
        cityTitle.text(city + "" + "(" + date + ")");
        titleIcon.attr("src", displayIcon(iconCode));
        cityTitle.append(titleIcon);
    }

    //This function is called to display weather icons
    function displayIcon(iconCode) {
        return (iconURL = "http://openweathermap.org/img/w/" + iconCode + ".png");
    }

    //Displays 5 Day forecast for city
    function display5DayForecast(response) {
        for (var i = 1; i <= 5; i++) {
            displayDailyDate(response, i);
            displayDailyForecastIcon(response, i)
            dailyForecast(response, i);
        }
    };

    //This displays icons for 5 Day forecast
    function displayDailyForecastIcon(response, i) {
        var iconCode = response.daily[i].weather[0].icon;
        var dailyIcon = "#day-icon-" + i;
        displayIcon(iconCode);
        $(dailyIcon).attr("src", displayIcon(iconCode));
    }

    //Display daily forecast
    function dailyForecast(response, i) {
        var temp = fromKelvinToCelsius(response.daily[i].temp.day);
        var humidity = response.daily[i].humidity;
        var tempID = "#daily-temp-" + i;
        var humidityID = "#daily-humidity-" + i;
        $(tempID).text("Temperature: " + temp + "°C");
        $(humidityID).text("Humidity: " + humidity + "%");
    }

    //Get daily date
    function getDailyDate(response) {
        var date = new Date(response.dt * 1000);

        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();

        return day + "/" + month + "/" + year;
    }

    function displayDailyDate(response, i) {
        var date = getDailyDate(response.daily[i])
        var dateID = "#daily-date-" + i;
        $(dateID).text(date);
    }

});