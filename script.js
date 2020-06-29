$(document).ready(function(){
    var newCity;
    var cityHistory = [];


    //Day
    $("#currentDate").text(moment().format("dddd, MMMM Do YYYY"));


    //event listener
    $("#button").click(function(event) {
        event.preventDefault();
        //capture user input and store in local storage and array
        newCity = $("#text").val().trim();  
        console.log(newCity);
        localStorage.setItem("newCity", newCity);
        cityHistory.push(newCity);
        console.log(cityHistory);

        // //recall from storage and display below search field
        // function displayLocalStorage() {
        //     for (let i = 0; i < cityHistory.length; i++) {
        //         $("newCity").val(newCity.getItem(i));
        //         var newRow = $("<div>");
        //         newRow.addClass("row");
        //         newRow.attr("data-name", cityHistory[i]);
        //         newRow.text(cityHistry[i]);
        //         $("historicalRows").append(newCity);
        //     }
        // }
        // displayLocalStorage ();


        //ajax functionality
        //Search City
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + newCity + "&appid=ef5a31cf3e6b80b9a71631a627c91754";
        
        $.ajax({
            url: queryURL,
            method: "GET"
            }).then(function(response) {
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
                $("#windSpeed").html("<p>Wind Speed: " +  windSpeed + " mph" + "</p>");
                //insert humidity
                $("#humidity").text("Humidity: " + response.main.humidity + "%");
                //insert temp
                var kelvinTemp = response.main.temp;
                var fahrenheit = Math.round(((kelvinTemp-273.15)*1.8)+32);
                $("#currentTemp").text("Temperature (F) " + fahrenheit + "\u00B0");
                //find lat and long
                var lat = response.coord.lat;
                var long = response.coord.lon;
                console.log(lat);
                console.log(long);
                //Add UV index with second ajax call
                var queryURLUvIndex = "http://api.openweathermap.org/data/2.5/uvi?appid=ef5a31cf3e6b80b9a71631a627c91754" + "&lat=" + lat + "&lon=" + long;
                    $.ajax({
                        url: queryURLUvIndex,
                        method: "GET"
                        }).then(function(response) {
                            $("#uvIndex").html("UV Index: " + response.value);
                            //color code background depending on rating
                            if (response.value < 3) {
                               $("#uvIndex").css("background-color", "green");
                            }else if (response.value < 5) {
                               $("#uvIndex").css("background-color", "yellow");
                            }else if (response.value < 7) {
                                $("#uvIndex").css("background-color", "orange");
                            }else if (response.value < 10) {
                                $("#uvIndex").css("background-color", "red");
                            }else if (response.value > 11) {
                                $("#uvIndex").css("background-color", "violet");
                            }                         
                    })

                //call function to create new rows
                populateRows(cityHistory, "#historicalRows")


                //5-day forecast 
                // var fiveDayQueryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + newCity + "&appid=ef5a31cf3e6b80b9a71631a627c91754";
                // console.log(fiveDayQueryURL);
                // $.ajax({
                //     url: fiveDayQueryURL,
                //     method: "GET"
                // }).then(function(response) {
                //     // Log the queryURL
                //     console.log(fiveDayQueryURL);////
                    // function generateDates() {
                    //     for (i = 0; i < 5; i + 1){
                    //     var dates5day = moment().add(i+1,'day').format("M/D/YYYY"); 
                    //     console.log(dates5day);
                    //     $("#card" + i.toString()).text(dates5day); 
                    //     }
                    // };
                    // generateDates();/////////////


                    // Log the resulting object
                    //       console.log(response);
                    //       // Transfer content to HTML
                    //       $(".cardDate").html("<h6>" + response.name + " Weather Details</h3>");
                    //       var windSpeed = response.wind.speed;
                    //       $("#windSpeed").html("<p>Wind Speed: " +  windSpeed + " mph" + "</p>");
                    //       $("#humidity").text("Humidity: " + response.main.humidity + "%");
                    //       var kelvinTemp = response.main.temp;
                    //       var fahrenheit = Math.round(((kelvinTemp-273.15)*1.8)+32);
                    //       $("#currentTemp").text("Temperature (F) " + fahrenheit + "\u00B0");
                
            })
        
        
 


    })
})    