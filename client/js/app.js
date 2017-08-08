var parseApplicationId = 'cda806c4-d0a6-4c25-bc9a-37a73703778c';
var parseRestKey = 'GmDFkR914D4hiHt3mYPcjffYCR28HrCm';

$(document).ready(function() {
    getExistingLog();
    
    $('#send').click(function() {
        var $sendButton = $(this);
        $sendButton.html('<img src="img/spinner.gif" width="20"/>')
        var exerciseName = $('input[name=exercisename]').val();
        var numberOfReps = $('input[name=numberofreps]').val();
        var weight = $('input[name=weight]').val();
        
        
        $.ajax({
            url: 'https://api.parse.buddy.com/parse/classes/WorkoutLog',
            headers: {
                'X-Parse-Application-Id': parseApplicationId,
                'X-Parse-REST-API-Key': parseRestKey,
            },
            contentType: 'application/json',
            dataType: 'json',
            processData: false,
            data: JSON.stringify({
                'exercisename': exerciseName,
                'numberofreps': numberOfReps,
                'weight': weight
            }),
            type: 'POST',
            success: function() {
                console.log('sent');
                getExistingLog();
                $sendButton.html('Submit');
            },
            error: function() {
                console.log("you dun goof'd");
                $sendButton.html('SEND');
            }
        })

    });
});

var getExistingLog = function() {
    $.ajax({
        url: 'https://api.parse.buddy.com/parse/classes/WorkoutLog',
        headers: {
                'X-Parse-Application-Id': parseApplicationId,
                'X-Parse-REST-API-Key': parseRestKey,
        },
        contentType: 'application/json',
        dataType: 'json',
        type: 'GET',
        success: function(data) {
            console.log('got existing log');
            updateView(data);
        },
        error: function() {
            console.log("couldn't get log");
        }
    });
}

function updateView(messages) {
    var table = $('#tablebody');
    
    table.html('');
    
    $.each(messages.results, function(index, value) {
        
        var trEl = ('<tr><td>'
            + value.exercisename
            + '</td><td>'
            + value.numberofreps
            + '</td><td>'
            + value.weight
            + '</td></tr>');
            
        table.append(trEl);
        
    });
}