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
        this.socket.on('connect', function(){
            console.log('connection established using sockets');    
        });
    }
}

