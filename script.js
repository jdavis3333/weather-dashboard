var newCity;

// var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + APIKey;
// var APIKey = "ef5a31cf3e6b80b9a71631a627c91754";


//event listener
$("#button").click(function(event) {
    event.preventDefault();
    //capture user input and store in local storage
    newCity = $("#text").val().trim();  
    console.log(newCity);
    localStorage.setItem("newCity", newCity);
    $("<#newDiv>").append(newCity);

})






//ajax functionality





