$('document').ready(function () {

    $('.btn').on('click', function () {
        event.preventDefault();

        // store firstname in variable
        var firstname = $('#first-name').val();
        console.log(firstname);

        // store lastname in variable
        var lastname = $('#last-name').val();
        console.log(lastname);

        // store job in variable
        var inputLocation = $('#location').val();
        console.log(inputLocation);

        // store job in variable
        var job = $('#job').val();
        console.log(job);

        // validate inputs
        if (firstname === '') {
            // must enter first name
            $('#first-name').addClass('animated wobble');
            $('#alert').text('*Must Enter First Name')
        }
        else if (lastname === '') {
            // must enter last name
            $('#last-name').addClass('animated wobble');
            $('#alert').text('*Must Enter Last Name')
        }
        else if (inputLocation === '') {
            // must enter location
            $('#location').addClass('animated wobble');
            $('#alert').text('*Must Enter Location')
        }
        else if (job === '') {
            // must enter job
            $('#job').addClass('animated wobble');
            $('#alert').text('*Must Enter Job Description')
        }
        else if (firstname !== '' && lastname !== '' && inputLocation !== '' && job !== '') {

            // hide form
            $('.form1').hide();

            // hide alert
            $('#alert').hide();

            // add text
            $('#print-name').html('<h1>' + 'Hi ' + firstname + ', here are some perfect jobs for you!' + '</h1>').css('border-bottom', '2px solid #26a69a').addClass('animated slideInUp');

            // add gif
            $('#gif').html('<img src=https://media.giphy.com/media/CTkWFZ1IDvsfS/giphy.gif>').addClass('animated slideInUp');
            ///////////////////////mine
            // This is our API key
            var APIKey = "166a433c57516f51dfab1f7edaed8413";
            // Here we are building the URL we need to query the database
            var queryURL = queryURL = "https://api.openweathermap.org/data/2.5/forecast/daily?q=" + inputLocation + "&units=imperial&appid=" + APIKey;
            // Here we run our AJAX call to the OpenWeatherMap API
            $.ajax({
                url: queryURL,
                method: "GET"
            })
                // We store all of the retrieved data inside of an object called "response"
                .then(function (response) {

                    // log api data
                    console.log(response);

                    $(".city").html("<h1>" + response.city.name + " Forecast Details</h1>");
                    // $("#weather").html("<h1>" + " temperature </h1>" + response.list[0].temp.max);

                    var list = response.list

                    for (var i = 0; i < list.length; i++) {
                        console.log(list[i].temp.max);

                        $("#weather").append(list[i].temp.max);
                    }
                });

        }

    });

});