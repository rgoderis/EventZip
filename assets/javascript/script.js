var zip;


$(document).ready(function(){

    // click listener on zipSubmit 
    $("#zipSubmit").on("click", function(event){
        event.preventDefault();
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
        for(var i = 0; i < 20; i++){
            console.log("Event Name: " + response._embedded.events[i].name)
            console.log("IMG URL: " + response._embedded.events[i].images[1].url)
            console.log("Date: " + response._embedded.events[i].dates.start.localDate)
            console.log("Start Time: " + response._embedded.events[i].dates.start.localTime)
            console.log("Venue: "+ response._embedded.events[i]._embedded.venues[0].name);
            console.log("Address: "+ response._embedded.events[i]._embedded.venues[0].address.line1  + " " + response._embedded.events[i]._embedded.venues[0].city.name+ ", " + response._embedded.events[i]._embedded.venues[0].state.name + " " + response._embedded.events[i]._embedded.venues[0].postalCode)
            console.log("Buy tickets at: "+ response._embedded.events[i].url)
        }
        console.log(response)
    })
})

})

