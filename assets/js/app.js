$('document').ready(function () {

    $('.btn').on('click', function () {
        event.preventDefault();

        // store firstname in variable
        var name = $('#firstname').val();
        console.log(name);

        // store birthday in variable
        var birthday = $('#birthday').val();
        console.log(birthday);

        // validate inputs
        if (name === '') {
            // must enter name
            alert('Must Enter Name');
        } else if (birthday === '') {
            // must enter birthday
            alert('Must Enter Birthday')
        } else {
            // hide form
            $('.form1').hide();
            
            // add text
            $('#print-name').html('<h1>' + 'Hi ' + name + ', here is some info about your birthday!' + '</h1>').css('border-bottom', '2px solid #26a69a').addClass('animated slideInUp');

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