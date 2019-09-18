var zip;


$(document).ready(function(){

    // click listener on zipSubmit 
    $("#events-btn").on("click", function(event){
        // event.preventDefault();
        console.log("you clicked a button")
        // sets value to zipcode_inline to zip
        zip = $("#zipcode_inline").val().trim();
    
    // code for ticketmaster API
    let zipCode = zip
    let key = "&apikey=YnArdwWNV6XCMfq0SFhg1hk3Dj8RPvTm";
    let queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?postalCode=" + zipCode + "&sort=date,asc" +  key;
    
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        // loop through results
        for(var i = 0; i < 5; i++){
            var eventName = response._embedded.events[i].name;
            var imgURL = response._embedded.events[i].images[1].url;
            var date = response._embedded.events[i].dates.start.localDate;
            var startTime = response._embedded.events[i].dates.start.localTime;
            var venue = response._embedded.events[i]._embedded.venues[0].name;
            var address = response._embedded.events[i]._embedded.venues[0].address.line1  + " " + response._embedded.events[i]._embedded.venues[0].city.name+ ", " + response._embedded.events[i]._embedded.venues[0].state.name + " " + response._embedded.events[i]._embedded.venues[0].postalCode
            var tickmasterURL = response._embedded.events[i].url;

            console.log(eventName)
            console.log(imgURL)
            console.log(date)
            console.log(startTime)
            console.log(venue)
            console.log(address)
            console.log(tickmasterURL)
        }
        console.log(response)
    })
})

})

