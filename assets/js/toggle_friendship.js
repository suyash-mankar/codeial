let toggleFriendship = function(){

    $('.toggle-friendship').click(function(e){

        e.preventDefault();

        // send a POST ajax request to friendship_controller via the route
        $.ajax({
            type: 'POST',
            url: $('.toggle-friendship').attr('href'),
        })
        .done(function(data){
            // data will come from the json response from friendship_controller

            if(data.data.removed == true){
                friendshipStatus = "Remove Friend";
            }else{
                friendshipStatus = "Add Friend";
            }

            // dynamically change the html text of "Add Friend/Remove Friend"
            $('.toggle-friendship').html(friendshipStatus);   


        })
        .fail(function(errData){
            console.log("error in completing the request", errData);
        });
    
    });



}

// call the toggleFriendship function
toggleFriendship();



   




