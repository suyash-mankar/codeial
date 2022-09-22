class ChatEngine{
    constructor(chatBoxId, userEmail){
        this.chatBox = $(`#${chatBoxId}`);
        this.userEmail = userEmail;

        // go and connect (connect fires an event : connection)
        this.socket = io.connect('http://localhost:5000');
    
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
    }
}

