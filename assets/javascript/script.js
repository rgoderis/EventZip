var zip;


$(document).ready(function(){

    // click listener on zipSubmit 
    $("#events-btn").on("click", function(){
    // empty results div
    $("#results").empty()
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
            // variables for response calls
            var eventName = response._embedded.events[i].name;
            var imgURL = response._embedded.events[i].images[1].url;
            var date = response._embedded.events[i].dates.start.localDate;
            var startTime = response._embedded.events[i].dates.start.localTime;
            var venue = response._embedded.events[i]._embedded.venues[0].name;
            var address = response._embedded.events[i]._embedded.venues[0].address.line1  + " " + response._embedded.events[i]._embedded.venues[0].city.name+ ", " + response._embedded.events[i]._embedded.venues[0].state.name + " " + response._embedded.events[i]._embedded.venues[0].postalCode
            var tickmasterURL = response._embedded.events[i].url;

            // append results to page
            var div = $("<div>");
            var header = $("<h3>");
            header.text(eventName);
            var img = $("<img>")
            img.attr("src", imgURL);
            img.attr("alt", eventName);
            var p1 = $("<p>");
            p1.text(date);
            var p2 = $("<p>");
            p2.text(startTime);
            var p3 = $("<p>");
            p3.text(venue);
            var p4 = $("<p>");
            p4.text(address);
            var p5 = $("<p>");
            var a = $("<a>")
            a.attr("href", tickmasterURL)
            a.text("Ticketmaster")
            p5.append(a)
            div.append(header);
            div.append(img);
            div.append(p1);
            div.append(p2);
            div.append(p3);
            div.append(p4);
            div.append(p5);
            $("#results").append(div);
        }
    })
})

})

