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

            // add text
            $('#print-name').html('<h1>' + 'Hi ' + firstname + ', here are some perfect jobs for you!' + '</h1>').css('border-bottom', '2px solid #26a69a').addClass('animated slideInUp');

            // add gif
            $('#gif').html('<img src=https://media.giphy.com/media/CTkWFZ1IDvsfS/giphy.gif>').addClass('animated slideInUp');

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
