$('document').ready(function () {
// this is a test to merge Jonathan's branch
    $('.btn').on('click', function () {
        event.preventDefault();

        // store firstname in variable
        var firstname = $('#first-name').val();
        console.log(firstname);

        // store lastname in variable
        var lastname = $('#last-name').val();
        console.log(lastname);

        // store city in variable
        var city = $('#city').val();
        console.log(city);

        // store state in variable
        var state = $('#state').val();
        console.log(state);

        // store job in variable
        var job = $('#job').val();
        console.log(job);

        // validate inputs
        if (firstname === '') {
            // must enter first name
            $('#first-name').addClass('animated wobble');
            $('#alert').text('*Must Enter First Name');
        }
        else if (lastname === '') {
            // must enter last name
            $('#last-name').addClass('animated wobble');
            $('#alert').text('*Must Enter Last Name');
        }
        else if (city === '') {
            // must enter city
            $('#city').addClass('animated wobble');
            $('#alert').text('*Must Enter City');
        }
        else if (state === '') {
            // must enter state
            $('#state').addClass('animated wobble');
            $('#alert').text('*Must Enter State');
        }
        else if (job === '') {
            // must enter job
            $('#job').addClass('animated wobble');
            $('#alert').text('*Must Enter Job Description');
        }
        else if (firstname !== '' && lastname !== '' && city !== '' && state !== '' && job !== '') {

            // hide form
            $('.form1').hide();

            // hide alert
            $('#alert').hide();

            // add text
            $('#print-name').html('<h1>' + 'Hi ' + firstname + ', here are some perfect jobs for you!' + '</h1>').css('border-bottom', '2px solid #26a69a').addClass('animated slideInUp');

            // add gif
            $('#gif').html('<img src=https://media.giphy.com/media/CTkWFZ1IDvsfS/giphy.gif>').addClass('animated slideInUp');
            
            // This is our API key
            var APIKey = "4679cf55751d13b3";

            // Here we are building the URL we need to query the database
            var queryURL = "http://api.wunderground.com/api/" + APIKey + "/conditions/q/" + state + "/" + city + ".json"
            
            // Here we run our AJAX call to the OpenWeatherMap API
            $.ajax({
                url: queryURL,
                method: "GET"
            })
                // We store all of the retrieved data inside of an object called "response"
                .then(function (response) {

                    // log api data
                    console.log(response);

                    // store local temp
                    var temp = response.current_observation.feelslike_string;

                    // store weather icon
                    var weatherIcon = response.current_observation.icon_url;

                    // show weather html
                    // $('#weather').
                    $('#weather').html('<img id="weather-icon" src="' + weatherIcon + '" alt="weather icon">').css('margin', '0px').addClass('animated slideInUp');
                    $('#weather').append('<h4>Current Temp:</h4>').css('margin', '0px').addClass('animated slideInUp');                    
                    $('#weather').append('<h3 id="temp">' + temp + '</h3>').css('margin', '0px').addClass('animated slideInUp');
                    


                });

        

            // jobs api url
            var queryURL = "https://jobs.github.com/positions.json?description=" + job + "&location=" + inputLocation
            //query that acts as if our site has a actual url not delployed on git hub.
            jQuery.ajaxPrefilter(function(options) {
                if (options.crossDomain && jQuery.support.cors) {
                    options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
                }
            });
            // call api
            $.ajax({
                url: queryURL,
                method: "GET"
            })
            // creating a function  companies infor
                .then(function (companies) {
                    for (var i = 0; i < companies.length; i++) {
                        console.log('-------------------')
                        var companyName = $('<div data-company="' + companies[i].company + '">' + companies[i].company + '</div>').addClass('job animated slideInUp');
                        $('#jobs').append(companyName);
                        var titleName = $('<div data-title="' + companies[i].title + '">' + companies[i].title + '</div>').addClass('job animated slideInUp');
                        $('#jobs').append(titleName);

                        var descriptionName = $('<div></div>').addClass('job animated slideInUp');
                        var parsed = $.parseHTML(companies[i].description);

                        descriptionName.append(...parsed);
                        descriptionName.data('description', companies[i].description);
                        $('#jobs').append(descriptionName);
                    }

                });
                // then function
        }
        // else if
    });
    // on click
});
// document
