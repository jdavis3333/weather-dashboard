$(document).ready(function () {
    var newCity;
    var cityHistory = JSON.parse(localStorage.getItem("cityList"))||["San Francisco"];


    //Day
    $("#currentDate").text(moment().format("dddd, MMMM Do YYYY"));
    displayLocalStorage();
    function displayLocalStorage() {
        $("#historicalRows").empty();
        for (let i = 0; i < cityHistory.length; i++) {
            $("#historicalRows").append(`<div><button class="previousCities">${cityHistory[i]}</button></div>`)
        }
    }
    function forecast (newCity) {
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + newCity + "&appid=ef5a31cf3e6b80b9a71631a627c91754";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            // Log the queryURL
            console.log(queryURL);
            // Log the resulting object
            console.log(response);
            // Transfer content to HTML
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
            //find lat and long
            var lat = response.coord.lat;
            var long = response.coord.lon;
            console.log(lat);
            console.log(long);
            fiveDayForecast(lat, long);
            //Add UV index with second ajax call
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

            //call function to create new rows
            // populateRows(cityHistory, "#historicalRows")
        })
    }

    //event listener
    $("#button").click(function (event) {
        event.preventDefault();
        //capture user input and store in local storage and array
        newCity = $("#text").val().trim();
        console.log(newCity);
        if (cityHistory.indexOf(newCity) === -1) {
            cityHistory.push(newCity);
            localStorage.setItem("cityList", JSON.stringify(cityHistory));
            console.log(cityHistory);
            displayLocalStorage ();
        }
        forecast (newCity);
        // //recall from storage and display below search field

        //ajax functionality
        //Search City
       
    })
    function fiveDayForecast(lat, long) {
        // 5-day forecast

        var fiveDayQueryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + long + "&exclude=current,minutely,hourly&appid=ef5a31cf3e6b80b9a71631a627c91754";
        $.ajax({
            url: fiveDayQueryURL,
            method: "GET"
        }).then(function (response) {
            // Log the queryURL
            console.log(fiveDayQueryURL, response);
            var data = response.daily

            for (i = 1; i < 6; i++) {
                var dates5day = moment().add(i, 'days').format("M/D/YYYY");
                console.log(dates5day);
                $("#forecastId").append(`
                <div class="col-md-2">
                <div class="card" style="width: 10rem;">
                    <div class="card-body">
                      <h5 class="card-date" id=card4>${dates5day}</h5>
                      <img class="icon5Day" id="icon4" src="http://www.openweathermap.org/img/wn/${data[i].weather[0].icon}@2x.png"/>
                      <h6 class="cardTemp" id="card4Temp">${data[i].temp.max}</h6>
                      <h6 class="cardHumidity" id="card4Humidity">${data[i].humidity}</h6>
                    </div>
                </div>
               </div>`)
            }

        })
    }
})    