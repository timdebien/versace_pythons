$('document').ready(function () {

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyAzmF8RKbpbRSE0wsHFNuq74EqmMdh6kRs",
        authDomain: "jobs-bd0a1.firebaseapp.com",
        databaseURL: "https://jobs-bd0a1.firebaseio.com",
        projectId: "jobs-bd0a1",
        storageBucket: "jobs-bd0a1.appspot.com",
        messagingSenderId: "445815274284"
    };
    firebase.initializeApp(config);

    // set database variable
    var database = firebase.database();

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

        // store array of states in variable
        var stateList = ["AK", "AL", "AR", "AZ", "CA", "CO", "CT", "DC", "DE", "FL", "GA", "GU", "HI", "IA", "ID", "IL", "IN", "KS", "KY", "LA", "MA", "MD", "ME", "MH", "MI", "MN", "MO", "MS", "MT", "NC", "ND", "NE", "NH", "NJ", "NM", "NV", "NY", "OH", "OK", "OR", "PA", "PR", "PW", "RI", "SC", "SD", "TN", "TX", "UT", "VA", "VI", "VT", "WA", "WI", "WV", "WY"];
        console.log(stateList);

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
        else if (stateList.indexOf(state) == -1) {
            // must enter legit state
            $('#state').addClass('animated wobble');
            $('#alert').text('*Must Enter Legitimate State Abbreviation');
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
            $('#print-name').html('<h1>' + 'Hi ' + firstname + ', here are some perfect jobs for you! (and the weather)' + '</h1>').css('border-bottom', '2px solid rgb(38, 166, 154)').addClass('animated slideInUp');

            // add gif
            $('#gif').html('<img src=https://media.giphy.com/media/CTkWFZ1IDvsfS/giphy.gif>').addClass('animated slideInUp');

            // push input values to firebase
            database.ref().push({

                savedName: firstname,
                savedCity: city,
                savedState: state,
                savedJob: job

            });

            // This is our API key
            var APIKey = "4679cf55751d13b3";

            // Here we are building the URL we need to query the database
            var queryURL = "https://api.wunderground.com/api/" + APIKey + "/conditions/q/" + state + "/" + city + ".json"
            
            // Here we run our AJAX call to the OpenWeatherMap API
            $.ajax({
                url: queryURL,
                method: "GET"
            })
                // We store all of the retrieved data inside of an object called "response"
                .then(function (response) {

                    // log api data
                    console.log(response);

                    // store local weather
                    var weather = response.current_observation.weather;

                    // store weather icon
                    var weatherIcon = response.current_observation.icon_url;

                    // store local temp
                    var temp = response.current_observation.feelslike_string;

                    // store humidity
                    var humidity = response.current_observation.relative_humidity;

                    // show weather html
                    $('#weather').html('<h5>Weather in ' + city + '</h5>');
                    $('#weather').css('border', '3px solid rgb(38, 166, 154)');
                    $('#weather').append('<h3>' + weather + '</h3>').addClass('weather animated slideInUp');
                    $('#weather').append('<img src="' + weatherIcon + '" alt="weather icon">').addClass('weather animated slideInUp');
                    $('#weather').append('<h4>Current Temp:</h4>').addClass('weather animated slideInUp');
                    $('#weather').append('<h3>' + temp + '</h3>').addClass('weather animated slideInUp');
                    $('#weather').append('<h4>Humidity:</h4>').addClass('weather animated slideInUp');
                    $('#weather').append('<h3>' + humidity + '</h3>').addClass('weather animated slideInUp');



                });
            // weather api.


            // jobs api url
            var queryURL = "https://jobs.github.com/positions.json?description=" + job + "&location=" + city + ', ' + state;
            //query that acts as if our site has a actual url not delployed on git hub.
            jQuery.ajaxPrefilter(function (options) {
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
                    console.log(companies);

                    // create jobs header
                    $('#jobs-title').addClass('animated slideInUp').append('<h2 style="margin: 9px;">Available Jobs</h2>').css({ 'background-color': 'rgba(53, 192, 178, 0.742)', 'border': '1px solid gainsboro' });
                    $('#jobs-title').append('<p style="font-size: 21px; margin: 6px; ">You searched for ' + job + ' jobs in ' + city + '</p>');

                    // loop through data
                    for (var i = 0; i < companies.length; i++) {
                        console.log('-------------------')
                        // store company name
                        var companyName = companies[i].company;
                        // store job title 
                        var titleName = companies[i].title;
                        // store job description
                        var description = companies[i].description;
                        // store application details
                        var apply = companies[i].how_to_apply;
                        // append html
                        $('#jobs').addClass('animated slideInUp').append('<li><div class="collapsible-header"><i class="material-icons">assignment</i>' + companyName + ' - ' + titleName + '</div><div class="collapsible-body"><span>' + description + '<h5 id="apply-here">Apply Here:</h5>' + apply + '</span></div>');
                    }

                });
            // then function.
            // job api.
        }
        // else if.
    });
    // on click.
});
// document.
