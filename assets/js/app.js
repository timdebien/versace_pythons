$('document').ready(function() {

    $('.btn').on('click', function() {
        event.preventDefault();

        // store firstname in variable
        var name = $('#firstname').val();
        console.log(name);

        // store birthday in variable
        var birthday = $('#birthday').val();
        console.log(birthday);

        // validate inputs
        if (name === '') {
            
            alert('Must Enter Name');
        } else if (birthday === '') {
            
            alert('Must Enter Birthday')
        } else {

            $('#print-name').html('<h1>' + 'Hi ' + name + ', Here is some info about your birthday!' + '</h1>')
        }

        
    });
});