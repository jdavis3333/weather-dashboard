var newCity;
var cityHistory = [];


 //Day
//  $("#currentDate").text(moment().format("dddd, MMMM Do YYYY"));


//function to add rows to page and log history -- see 06-16
function populateRows(arrayToUse, classToAdd, areaToAddTo) { 
    $(areaToAddTo).empty();

    for (var i = 0; i < cityHistory.length; i++) {
      var newRow = $("<div>");
      newRow.addClass(classToAdd);
      newRow.attr("data-type", arrayToUse[i]);
      newRow.text(arrayToUse[i]);
      $(areaToAddTo).append(newRow);
    }

  }

//event listener
$("#button").click(function(event) {
    event.preventDefault();
    //capture user input and store in local storage
    newCity = $("#text").val().trim();  
    console.log(newCity);
    localStorage.setItem("newCity", newCity);
    newCity
    
   

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
          $("#selectedCity").html("<h3>" + response.name + " Weather Details</h3>");
          var windSpeed = response.wind.speed;
          $("#windSpeed").html("<p>Wind Speed: " +  windSpeed + " mph" + "</p>");
          $("#humidity").text("Humidity: " + response.main.humidity + "%");
          var kelvinTemp = response.main.temp;
          var fahrenheit = Math.round(((kelvinTemp-273.15)*1.8)+32);
          $("#currentTemp").text("Temperature (F) " + fahrenheit + "\u00B0");
    })
    //5-day forecast 
    var fiveDayQueryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + newCity + "&appid=ef5a31cf3e6b80b9a71631a627c91754"

    $.ajax({
        url: fiveDayQueryURL,
        method: "GET"
      }).then(function(response) {
          // Log the queryURL
          console.log(fiveDayQueryURL);
          // Log the resulting object
          console.log(response);
          // Transfer content to HTML

    })


    //create an array, push each newCity into the array and append to newDiv
    //see 06-08
    // $("<#newDiv>").append(newCity);

})