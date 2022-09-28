class ChatEngine{
    constructor(chatBoxId, userEmail){
        this.chatBox = $(`#${chatBoxId}`);
        this.userEmail = userEmail;

        // go and connect (connect fires an event : connection)
        this.socket = io.connect('https://52.91.0.125');
    
        if(this.userEmail){
            this.connectionHandler();
        }
    }

    // detects if the connection has been completed
    connectionHandler(){

        let self = this;
                
        this.socket.on('connect', function(){
            console.log('connection established using sockets');    
            
            self.socket.emit('join_room', {
                user_email: self.userEmail,
                chatroom: 'codeial'
            });

            self.socket.on('user_joined', function(data){
                console.log(' a user joined', data);
            });
        });

        // send a message on clicking the send message button   
        $('#send-message').click(function(){
            let msg = $('#chat-message-input').val();
         
            if(msg!=''){
                self.socket.emit('send_message', {
                    message: msg,
                    user_email: self.userEmail,
                    chatroom: 'codeial'
                    
                });
            }
        });


        self.socket.on('receive_message', function(data){
            console.log('message received', data.message);

            let newMessage = $('<li>');

            let messageType = 'other-message';
            // data.user_email - person who is sending the message & self.userEmail - person who is logged in
            if(data.user_email == self.userEmail){
                messageType = 'self-message'
            }

            newMessage.append($('<span>', {
                'html': data.message
            }));

            newMessage.append($('<sub>', {
                'html': data.user_email
            }));

            newMessage.addClass(messageType);

            $('#chat-message-list').append(newMessage);

        });


    }
}

