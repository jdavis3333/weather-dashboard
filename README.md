# weather-dashboard

The goal of this project was to create a weather dashboard which displays the current day's temerature, wind speed, humidity, and UV rating.  The project should also include a 5-day forecast for the selected city, and store historical searches for re-use if necessary.

## Getting Started

1. Log into GitLab > UCB-Coding-Bootcamp > UCB-BER-FSF-FT-06-2020-U-C
2. Navigate to Server Side APIs Homework (click) 
3. Open VS Code or similar program and follow provided instructions.

### Prerequisites

* Visual Studio Code https://code.visualstudio.com/
* Bootstrap https://getbootstrap.com/
* Momentsjs https://momentjs.com/ 
* OpenWeather https://openweathermap.org/ 
* Font Awesome https://fontawesome.com/v4.7.0/get-started/


### Installing

![weather-dashboard](https://user-images.githubusercontent.com/66157077/86080155-12424a00-ba47-11ea-8908-81283f305509.PNG)

* Created an onClick function that took the user's city input and stored it in a variable (newCity).
```
 $("#button").click(function (event) {
        event.preventDefault();
        $("#forecastId").empty();
        newCity = $("#text").val().trim();
        console.log(newCity);
        forecast (newCity);       
    })

```
* Stored variable was used for ajax call to Open Weather to get details on that city and store the city name in local storage.
```
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + newCity + "&appid=ef5a31cf3e6b80b9a71631a627c91754";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            // Log the queryURL
            console.log(queryURL);
            // Log the resulting object
            console.log(response);
            if (cityHistory.indexOf(newCity) === -1) {
                cityHistory.push(newCity);
                localStorage.setItem("cityList", JSON.stringify(cityHistory));
                console.log(cityHistory);
                displayLocalStorage ()
})
```
* Returned ajax info was displayed on the web page
```
 $("#selectedCity").html("<h3>" + response.name + " </h3>");
            //insert weather icon
            var iconID = response.weather[0].icon;
            var iconResult = "http://www.openweathermap.org/img/wn/" + iconID + "@2x.png";
            $("#weatherIcon").attr("src", iconResult);
            //insert windspeed
            var windSpeed = response.wind.speed;
            $("#windSpeed").html("<p>Wind Speed: " + windSpeed + " mph" + "</p>");
            //insert humidity
            $("#humidity").text("Humidity: " + response.main.humidity + "%");
            //insert temp
            var kelvinTemp = response.main.temp;
            var fahrenheit = Math.round(((kelvinTemp - 273.15) * 1.8) + 32);
            $("#currentTemp").text("Temperature (F) " + fahrenheit + "\u00B0");
```

* UV index color coded based on returned results, in accordance with World Health Organization color scheme
```
 var queryURLUvIndex = "http://api.openweathermap.org/data/2.5/uvi?appid=ef5a31cf3e6b80b9a71631a627c91754" + "&lat=" + lat + "&lon=" + long;
            $.ajax({
                url: queryURLUvIndex,
                method: "GET"
            }).then(function (response) {
                $("#uvIndex").html("UV Index: " + response.value);
                //color code background depending on rating
                if (response.value < 3) {
                    $("#uvIndex").css("background-color", "green");
                } else if (response.value < 5) {
                    $("#uvIndex").css("background-color", "yellow");
                } else if (response.value < 7) {
                    $("#uvIndex").css("background-color", "orange");
                } else if (response.value < 10) {
                    $("#uvIndex").css("background-color", "red");
                } else if (response.value > 11) {
                    $("#uvIndex").css("background-color", "violet");
                }
            })
```


## Built With

* [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)
* [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
* [Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

## Deployed Link

* [See Live Site] (https://jdavis3333.github.io/weather-dashboard/)


## Authors

* Joe Davis

- [Link to Github](https://github.com/jdavis3333)
- [Link to LinkedIn](https://www.linkedin.com/in/joe-davis-a8380232/)


See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License 

