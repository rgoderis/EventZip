var zip;


$(document).ready(function(){
    //initialize parallax and our form selector for the page  
    $('.parallax').parallax();
    $('select').formSelect();

    // click listener on events-btn
    $("#events-btn").on("click", function(){
        // empty results div
        $("#results").empty();
        // sets value to zipcode_inline to zip
        zip = $("#zipcode_inline").val().trim();
        // check to make sure a value is entered in zip
        if(zip === ""){
            console.log("plase enter a value")
            return false
        } else{
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
                    var imgURL = response._embedded.events[i].images[0].url;
                    var date = response._embedded.events[i].dates.start.localDate;
                    var startTime = response._embedded.events[i].dates.start.localTime;
                    var venue = response._embedded.events[i]._embedded.venues[0].name;
                    var address = response._embedded.events[i]._embedded.venues[0].address.line1  + " " + response._embedded.events[i]._embedded.venues[0].city.name+ ", " + response._embedded.events[i]._embedded.venues[0].state.name + " " + response._embedded.events[i]._embedded.venues[0].postalCode
                    var tickmasterURL = response._embedded.events[i].url;
                    // dynamically creating a Materialize card for each item our ajax call returns
                    var card = $("<div>")
                    var b = $("<div>")
                    b.addClass("col s12 m6")
                    var c = $("<div>")
                    c.addClass("card hoverable")
                    var d = $("<div>")
                    d.addClass("card-image")
                    var e = $("<img>")
                    e.attr("src", imgURL)
                    e.addClass("resizeImg")
                    var f = $("<h3>")
                    f.addClass("card-title")
                    f.text(eventName)
                    var g = $("<div>")
                    g.addClass("card-content")
                    var cardBody1 = $("<p>")
                    var a = $("<a>")
                    a.attr("href", tickmasterURL)
                    a.text("Buy Tickets Here")
                    cardBody1.append(a)
                    var cardBody2 = $("<p>")
                    cardBody2.text("Date: " + date)
                    var cardBody3 = $("<p>")
                    cardBody3.text("Start Time: "+ startTime)
                    var cardBody4 = $("<p>")
                    cardBody4.text("Venue: "+ venue)
                    var cardBody5 = $("<p>")
                    cardBody5.text(address)
                    g.append(f,cardBody1,cardBody2, cardBody3, cardBody4, cardBody5)
                    d.append(e)
                    c.append(d,g)
                    b.append(c)
                    card.append(b)
                    //append "card" to the page wherever we want it.
                    $("#results").append(card);
                }
            });
        }
    }); 

    // click listener for restaurant button
    $("#rests-btn").on("click", function(){
        // empty results div
        $("#results").empty();
        // retrieve value from zipcode_inline
        zip = $("#zipcode_inline").val().trim()
        // check to make sure a value is entered in zip
        if(zip === ""){
            console.log("plase enter a value")
            return false
        } else{
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
                    var rating_val = response.businesses[i].rating

                    var star = function (rating) {
                        if (rating == 1) {
                            return "assets/images/yelp_stars/web_and_ios/small/small_1.png" };
                        if (rating == 1.5) {
                            return "assets/images/yelp_stars/web_and_ios/small/small_1_half.png" };
                        if (rating == 2) {
                            return "assets/images/yelp_stars/web_and_ios/small/small_2.png" };
                        if (rating == 2.5) {
                            return "assets/images/yelp_stars/web_and_ios/small/small_2_half.png" };
                        if (rating == 3) {
                            return "assets/images/yelp_stars/web_and_ios/small/small_3.png" };
                        if (rating == 3.5) {
                            return "assets/images/yelp_stars/web_and_ios/small/small_3_half.png" };
                        if (rating == 4) {
                            return "assets/images/yelp_stars/web_and_ios/small/small_4.png" };
                        if (rating == 4.5) {
                            return "assets/images/yelp_stars/web_and_ios/small/small_4_half.png" };
                        if (rating == 5) {
                            return "assets/images/yelp_stars/web_and_ios/small/small_5.png" };
                };
				
                    // website
                    var websiteURL = response.businesses[i].url
                    // dynamically creating a Materialize card for each item our ajax call returns
                    var card = $("<div>")
                    var b = $("<div>")
                    b.addClass("col s12 m6")
                    var c = $("<div>")
                    c.addClass("card hoverable")
                    var d = $("<div>")
                    d.addClass("card-image")
                    var e = $("<img>")
                    e.attr("src", imgURL)
                    e.addClass("resizeImg")
                    var f = $("<h3>")
                    f.addClass("card-title")
                    f.text(name)
                    var g = $("<div>")
                    g.addClass("card-content")
                    var cardBody1 = $("<p>")
                    var a = $("<a>")
                    a.attr("href", websiteURL)
                    a.text("View Website")
                    cardBody1.append(a)
                    var cardBody2 = $("<p>")
                    //checking if the establishment is closed or open to display on our card
                    if(isClosed){
                        cardBody2.text("Currently Closed")
                    } else {
                        cardBody2.text("Now Open")
                    }
                    var cardBody3 = $("<p>")
                    cardBody3.text(address)
                    var cardBody4 = $("<p>")
                    cardBody4.text(phone)
                    var cardBody5 = $("<p>")
                    cardBody5.text(price)
                    var cardBody6 = $("<img>")
                    cardBody6.attr("src", star(rating_val))

                   
                //p6.attr("src", star(rating_val))  


                    g.append(f, cardBody1,cardBody2, cardBody3, cardBody4, cardBody5, cardBody6)
                    d.append(e)
                    c.append(d,g)
                    b.append(c)
                    card.append(b)
                    //appending the completed card to our result div.
                    $("#results").append(card);
                }
            })
        }
    })

    // set click listener for bars-btn
    $("#bars-btn").on("click", function(){
        // empty results div
        $("#results").empty();
        // retrieve value from zipcode_inline
        zip = $("#zipcode_inline").val().trim()
        // check to make sure a value is entered in zip
        if(zip === ""){
            console.log("plase enter a value")
            return false
        } else{
            // ajax call for bars
            let zipCode = zip;
            let number = 5
            let queryURL = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=bars&location=" + zipCode + "&limit=" + number;
            
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
                    var rating_val = response.businesses[i].rating

                     var star = function (rating) {
                        if (rating == 1) {
                            return "assets/images/yelp_stars/web_and_ios/small/small_1.png" };
                        if (rating == 1.5) {
                            return "assets/images/yelp_stars/web_and_ios/small/small_1_half.png" };
                        if (rating == 2) {
                            return "assets/images/yelp_stars/web_and_ios/small/small_2.png" };
                        if (rating == 2.5) {
                            return "assets/images/yelp_stars/web_and_ios/small/small_2_half.png" };
                        if (rating == 3) {
                            return "assets/images/yelp_stars/web_and_ios/small/small_3.png" };
                        if (rating == 3.5) {
                            return "assets/images/yelp_stars/web_and_ios/small/small_3_half.png" };
                        if (rating == 4) {
                            return "assets/images/yelp_stars/web_and_ios/small/small_4.png" };
                        if (rating == 4.5) {
                            return "assets/images/yelp_stars/web_and_ios/small/small_4_half.png" };
                        if (rating == 5) {
                            return "assets/images/yelp_stars/web_and_ios/small/small_5.png" };
                    };
                    
                    // website
                    var websiteURL = response.businesses[i].url
                    // dynamically creating a Materialize card for each item our ajax call returns
                    var card = $("<div>")
                    var b = $("<div>")
                    b.addClass("col s12 m6")
                    var c = $("<div>")
                    c.addClass("card hoverable")
                    var d = $("<div>")
                    d.addClass("card-image")
                    var e = $("<img>")
                    e.attr("src", imgURL)
                    e.addClass("resizeImg")
                    var f = $("<h3>")
                    f.addClass("card-title")
                    f.text(name)
                    var g = $("<div>")
                    g.addClass("card-content")
                    var cardBody1 = $("<p>")
                    var a = $("<a>")
                    a.attr("href", websiteURL)
                    a.text("View Website")
                    cardBody1.append(a)
                    var cardBody2 = $("<p>")
                    //checking if the establishment is closed or open to display on our card
                    if(isClosed){
                        cardBody2.text("Currently Closed")
                    } else {
                        cardBody2.text("Now Open")
                    }
                    var cardBody3 = $("<p>")
                    cardBody3.text(address)
                    var cardBody4 = $("<p>")
                    cardBody4.text(phone)
                    var cardBody5 = $("<p>")
                    cardBody5.text(price)
                    var cardBody6 = $("<img>")
                    cardBody6.attr("src", star(rating_val))
                    g.append(f, cardBody1,cardBody2, cardBody3, cardBody4, cardBody5, cardBody6)
                    d.append(e)
                    c.append(d,g)
                    b.append(c)
                    card.append(b)
                    //appending the completed card to our result div.
                    $("#results").append(card);
                }
            })
        }
    });

    // hotel click listener
    $("#hotels-btn").on("click", function(){
        // empty results div
        $("#results").empty();
        // retrieve value from zipcode_inline
        zip = $("#zipcode_inline").val().trim()
        // check to make sure a value is entered in zip
        if(zip === ""){
            console.log("plase enter a value")
            return false
        } else{
            // ajax call for hotel
            let zipCode = zip;
            let number = 5
            let queryURL = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=hotels&location=" + zipCode + "&limit=" + number;
            
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
                    var rating_val = response.businesses[i].rating

                    var star = function (rating) {
                        if (rating == 1) {
                            return "assets/images/yelp_stars/web_and_ios/small/small_1.png" };
                        if (rating == 1.5) {
                            return "assets/images/yelp_stars/web_and_ios/small/small_1_half.png" };
                        if (rating == 2) {
                            return "assets/images/yelp_stars/web_and_ios/small/small_2.png" };
                        if (rating == 2.5) {
                            return "assets/images/yelp_stars/web_and_ios/small/small_2_half.png" };
                        if (rating == 3) {
                            return "assets/images/yelp_stars/web_and_ios/small/small_3.png" };
                        if (rating == 3.5) {
                            return "assets/images/yelp_stars/web_and_ios/small/small_3_half.png" };
                        if (rating == 4) {
                            return "assets/images/yelp_stars/web_and_ios/small/small_4.png" };
                        if (rating == 4.5) {
                            return "assets/images/yelp_stars/web_and_ios/small/small_4_half.png" };
                        if (rating == 5) {
                            return "assets/images/yelp_stars/web_and_ios/small/small_5.png" };
                    };
                    
                    // website
                    var websiteURL = response.businesses[i].url
                    // dynamically creating a Materialize card for each item our ajax call returns
                    var card = $("<div>")
                    var b = $("<div>")
                    b.addClass("col s12 m6")
                    var c = $("<div>")
                    c.addClass("card hoverable")
                    var d = $("<div>")
                    d.addClass("card-image")
                    var e = $("<img>")
                    e.attr("src", imgURL)
                    e.addClass("resizeImg")
                    var f = $("<h3>")
                    f.addClass("card-title")
                    f.text(name)
                    var g = $("<div>")
                    g.addClass("card-content")
                    var cardBody1 = $("<p>")
                    var a = $("<a>")
                    a.attr("href", websiteURL)
                    a.text("View Website")
                    cardBody1.append(a)
                    var cardBody2 = $("<p>")
                    //checking if the establishment is closed or open to display on our card
                    if(isClosed){
                        cardBody2.text("Currently Closed")
                    } else {
                        cardBody2.text("Now Open")
                    }
                    var cardBody3 = $("<p>")
                    cardBody3.text(address)
                    var cardBody4 = $("<p>")
                    cardBody4.text(phone)
                    var cardBody5 = $("<p>")
                    cardBody5.text(price)
                    var cardBody6 = $("<img>")
                    cardBody6.attr("src", star(rating_val))
                    g.append(f, cardBody1,cardBody2, cardBody3, cardBody4, cardBody5, cardBody6)
                    d.append(e)
                    c.append(d,g)
                    b.append(c)
                    card.append(b)
                    //appending the completed card to our result div.
                    $("#results").append(card);
                }
            })
        }
    });
})

