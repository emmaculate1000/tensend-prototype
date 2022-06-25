const socket=io("http://localhost:3000");
const img="images/logo.jpg";
$("#chatForm").submit(function(e){
    e.preventDefault();
    let message=$("#message-data").val();
    //empty input field
    $("#message-data").val("");
    let dateObj=new Date();
    let time=dateObj.toUTCString();
    const chatObj=new Chat(true,{},message,time);
    chatObj.createChat();
    socket.emit("message",{data:message});
;})
socket.on("message",({data})=>{
    let dateObj=new Date();
    let time=dateObj.toUTCString();
    const chatObj=new Chat(false,{img:"images/logo.jpg"},data,time);
    chatObj.createChat();
})
