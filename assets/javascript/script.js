var zip;


$(document).ready(function(){
    //initialize parallax for the page  
    $('.parallax').parallax();

    // click listener on events-btn
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
        });
    });

    // click listener for restaurant button
    $("#rests-btn").on("click", function(){
        // empty results div
        $("#results").empty();
        // retrieve value from zipcode_inline
        zip = $("#zipcode_inline").val().trim()
        // ajax call for Restaurants
        let zipCode = zip;
        let number = 5
        let queryURL = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=restaurants&location=" + zipCode + "&limit=" + number;
            // 
        $.ajax({
            url: queryURL,
            headers:{
                'Authorization': 'Bearer h53RmJI935qCD6t1Hz-h2Xc8kq_IjzKtzs-zmXCTsQQDFhkaSX5hO_pXQJMbRZDAxTNcMiy_EnYX44lYJhvUjAPqnrQUwjoyqNPS4Ssd2VRzTMN4RBAgGTPvEW-CXXYx'
            },
            method: "GET"
        }).then(function(response){
            // loop through response results
            for(var i = 0; i < number; i++){
                // restaurant name
                var name = response.businesses[i].name;
                // img url
                var imgURL = response.businesses[i].image_url
                // rest types
                var type = response.businesses[i].categories[0].title
                // isClosed
                var isClosed = response.businesses[i].is_closed
                // address
                var address = response.businesses[i].location.address1 + ". " +response.businesses[i].location.city +", " + response.businesses[i].location.state +". "+  response.businesses[i].location.zip_code
                // phone number
                var phone = response.businesses[i].phone
                // price
                var price = response.businesses[i].price
                // rating
                var rating = response.businesses[i].rating
                // website
                var websiteURL = response.businesses[i].url

                var div = $("<div>")
                var header = $("<h3>")
                header.text(name);
                var img = $("<img>");
                img.attr("src", imgURL)
                img.attr("alt", header)
                var p1 = $("<p>");
                p1.text(type)
                var p2 = $("<p2>")
                if(isClosed){
                    p2.text("Currently Closed")
                } else {
                    p2.text("Open Now")
                }
                var p3 = $("<p>")
                p3.text(address)
                var p4 = $("<p>");
                p4.text(phone);
                p5 = $("<p>");
                p5.text(price);
                p6 = $("<p>");
                p6.text("Yelp rating: " + rating + " stars")
                p7 = $("<p>")
                a = $("<a>")
                a.attr("href", websiteURL)
                a.text("view website")
                p7.append(a)
                div.append(header);
                div.append(img);
                div.append(p1)
                div.append(p2)
                div.append(p3)
                div.append(p4)
                div.append(p5)
                div.append(p6)
                div.append(p7)
                $("#results").append(div)
            }
        })
    })

    // set click listener for bars-btn
    $("#bars-btn").on("click", function(){
        // empty results div
        $("#results").empty();
        // retrieve value from zipcode_inline
        zip = $("#zipcode_inline").val().trim()
        // ajax call for Restaurants
        let zipCode = zip;
        let number = 5
        let queryURL = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=bars&location=" + zipCode + "&limit=" + number;
            // 
        $.ajax({
            url: queryURL,
            headers:{
                'Authorization': 'Bearer h53RmJI935qCD6t1Hz-h2Xc8kq_IjzKtzs-zmXCTsQQDFhkaSX5hO_pXQJMbRZDAxTNcMiy_EnYX44lYJhvUjAPqnrQUwjoyqNPS4Ssd2VRzTMN4RBAgGTPvEW-CXXYx'
            },
            method: "GET"
        }).then(function(response){
            // loop through response results
            for(var i = 0; i < number; i++){
                // restaurant name
                var name = response.businesses[i].name;
                // img url
                var imgURL = response.businesses[i].image_url
                // rest types
                var type = response.businesses[i].categories[0].title
                // isClosed
                var isClosed = response.businesses[i].is_closed
                // address
                var address = response.businesses[i].location.address1 + ". " +response.businesses[i].location.city +", " + response.businesses[i].location.state +". "+  response.businesses[i].location.zip_code
                // phone number
                var phone = response.businesses[i].phone
                // price
                var price = response.businesses[i].price
                // rating
                var rating = response.businesses[i].rating
                // website
                var websiteURL = response.businesses[i].url

                var div = $("<div>")
                var header = $("<h3>")
                header.text(name);
                var img = $("<img>");
                img.attr("src", imgURL)
                img.attr("alt", header)
                var p1 = $("<p>");
                p1.text(type)
                var p2 = $("<p2>")
                if(isClosed){
                    p2.text("Currently Closed")
                } else {
                    p2.text("Open Now")
                }
                var p3 = $("<p>")
                p3.text(address)
                var p4 = $("<p>");
                p4.text(phone);
                p5 = $("<p>");
                p5.text(price);
                p6 = $("<p>");
                p6.text("Yelp rating: " + rating + " stars")
                p7 = $("<p>")
                a = $("<a>")
                a.attr("href", websiteURL)
                a.text("view website")
                p7.append(a)
                div.append(header);
                div.append(img);
                div.append(p1)
                div.append(p2)
                div.append(p3)
                div.append(p4)
                div.append(p5)
                div.append(p6)
                div.append(p7)
                $("#results").append(div)
            }
        })
    })


// // ajax call for Bars
// let zipCode = "32801";
// let number = 5
// let queryURL = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=bars&location=" + zipCode + "&limit=" + number;

// $.ajax({
//     url: queryURL,
//     headers:{
//         'Authorization': 'Bearer h53RmJI935qCD6t1Hz-h2Xc8kq_IjzKtzs-zmXCTsQQDFhkaSX5hO_pXQJMbRZDAxTNcMiy_EnYX44lYJhvUjAPqnrQUwjoyqNPS4Ssd2VRzTMN4RBAgGTPvEW-CXXYx'
//     },
//     method: "GET"
// }).then(function(response){
//     console.log(response)
//     // name
//     console.log(response.businesses[0].name)
//     // image
//     console.log(response.businesses[0].image_url)
//     // type of location
//     for(var i = 0; i < response.businesses[0].categories.length; i++)
//     console.log(response.businesses[0].categories[i].title)
//     // open
//     if(response.businesses[0].is_closed){
//         console.log("Closed")
//     } else {
//         console.log("Open")
//     }
//     // location address
//     console.log(response.businesses[0].location.address1 + ". " +response.businesses[0].location.city +", " + response.businesses[0].location.state +". "+  response.businesses[0].location.zip_code)
//     // phone number
//     console.log(response.businesses[0].phone)
//     // price
//     console.log(response.businesses[0].price)
//     // review
//     console.log(response.businesses[0].rating)
//     // url
//     console.log(response.businesses[0].url)
// });

})

