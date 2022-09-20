let toggleFriendship = function(){

    $('.toggle-friendship').click(function(e){

        e.preventDefault();

        let friendshipStatus = ($('.toggle-friendship').attr('data-friendship-status'));


        // send a POST ajax request to controller via the route
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

            $('.toggle-friendship').attr('data-friendship-status', friendshipStatus);
            $('.toggle-friendship').html(friendshipStatus);   


        })
        .fail(function(errData){
            console.log("error in completing the request", errData);
        });
    
    });



}

toggleFriendship();



   




