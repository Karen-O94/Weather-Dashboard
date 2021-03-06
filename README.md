## Weather-Dashboard
The aim of this project was to create a weather dashboard that allows a user to see current weather and 5 day forecast of a city of their choice. We had to use the [OpenWeather API](https://openweathermap.org/api) to retrieve weather data for cities and make use of `localStorage` to store any persistent data.

## Link To Application
[Weather Dashboard](https://karen-o94.github.io/Weather-Dashboard/)

## First Steps: Pseudocoding & Styling Weather Dashboard page 
Before attempting to code the Javascript file, I took some time to pseudocode a flow chart of how I wanted the application to work based on the client's user story. 

The client's first criteria was that a dashboard displaying weather information will appear when they searched a city name. 

I started off styling the HTML page mainly using Bootstrap and correlating the HTML tag attributes with the CSS selectors from Bootstrap or the additional stylesheet I created.

## Second step: API calls
The next step was to research the list of available APIs on the [OpenWeather API](https://openweathermap.org/api) site and identify which APIs would best help me get all the info required. This lead me to using thr following API docs: 

[Current Weather API](https://openweathermap.org/current) : This API was used to retrieve the city name info using latitude and longitude coordinates provided. 

[One Call API](https://openweathermap.org/api/one-call-api) : This API was used to retieve all the current and 5-day forecast info (i.e. `temperature`, `wind`,`humidity`,`UV Index`, `icon` etc) for each city. This API also used the longitude and latitude information from the 

## Third step: Declaring intial global variables & using DOM Methods
After pseudocoding, I proceeded to declaring the variables I would need to store the city and elements that I would need to manipulate on the DOM. I used a click event (`.on("click", function() {})` to the search `button` to render the page with the city info.

Then I stored the user' search item into their `localStorage` by targetting the input box and storing those in variables to be used as key-value pairs later on. Similarly I created a function to later retrieve from the `localStorage` to make sure the information stayed on the page.

## Final Steps: Displaying Weather info on page & UV Index
The last few steps was making sure the information collated was displaying in their designated HTML elements 

As the client wanted the UV Index to be colour-coded to represent whether the UV Index was in the favourable, moderate or severe; I wrote a function to display this comparison using a `for loop` setting the conditions with if/else statements. 

## Deployed Application Images
![image](https://user-images.githubusercontent.com/74797740/107834865-6f4cff00-6d8f-11eb-85e7-fb91737638cf.png)

![image](https://user-images.githubusercontent.com/74797740/107834963-cd79e200-6d8f-11eb-9def-70e75340a91d.png)

![image](https://user-images.githubusercontent.com/74797740/107835064-20ec3000-6d90-11eb-9ad7-6efab382eef3.png)

![image](https://user-images.githubusercontent.com/74797740/107835364-3150da80-6d91-11eb-889d-87379ac2584f.png)

## Difficulties
API: I run into some difficulties extracting information from the API objects and it took a lot of trial and error and debugging to work out where I was going wrong. It was difficult figuring out how to organise my API calls and when to call them to make sure they rendered on the page at the right time. 

Organising: Similar to previous assignments, I still struggle with figuring out how to organise my JavaScript/jQuery code for it to flow logically especially when writing functions.

I used console.log, Chrome DevTools, YouTube and peer reviews to troubleshoot what was going wrong and what direction to take to fix these issues.

**Built With**
- HTML
- [Bootstrap](https://getbootstrap.com/)
- CSS
- JavaScript / [jQuery](https://jquery.com/) / AJAX
- [VScode](https://code.visualstudio.com/)

# License
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)