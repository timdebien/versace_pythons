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
        else if (firstname !== '' && lastname !== '' && inputLocation !== '' && job !== ''){

            // hide form
            $('.form1').hide();

            // add text
            $('#print-name').html('<h1>' + 'Hi ' + firstname + ', here are some perfect jobs for you!' + '</h1>').css('border-bottom', '2px solid #26a69a').addClass('animated slideInUp');
        
            // add gif
            $('#gif').html('<img src=https://media.giphy.com/media/CTkWFZ1IDvsfS/giphy.gif>').addClass('animated slideInUp');
            
        
        }

    });

    // var url = "https://api.nasa.gov/planetary/apod?api_key=TiviFiWBJyWVjtnQHT97G8Eg0q8ZaKRm0hOqDpk2";

    // $.ajax({
    //     url: url,
    //     method: 'GET'
    // }).then(function (response) {
    //     console.log(response);
    // });
});