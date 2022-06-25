
function Chat(self,userInfo,message,time){
    this.self=self;
    this.userInfo=userInfo;
    this.message=message;
    this.time=time;
}
Chat.prototype.createChat=function(){
    let parent=document.createElement("div");
    parent.setAttribute("class",this.self?"chats chats-right":"chats");
    if(this.self==false){
        //create image of user chatting
        let userImgContainer=document.createElement("div");
        userImgContainer.setAttribute("class","chat-avatar");
        //create img
        let userImg=document.createElement("img");
        userImg.setAttribute("class","rounded-circle dreams_chat");
        userImg.setAttribute("alt","image");
        userImg.src=this.userInfo.img;
        userImgContainer.appendChild(userImg);
        parent.appendChild(userImgContainer);
    }
    //chat content
    let chatContent=document.createElement("div");
    chatContent.setAttribute("class","chat-content");
    //chat message
    let chatMessage=document.createElement("div");
    chatMessage.setAttribute("class","message-content");
    chatText=document.createTextNode(this.message);
    chatMessage.appendChild(chatText);
    chatContent.appendChild(chatMessage);
    parent.appendChild(chatContent);
    //chat-time
    let chatTime=document.createElement("div");
    chatTime.setAttribute("class","chat-time");
    //time holder
    let timeHolder=document.createElement("div");
    //chat container
    let timeContainer=document.createElement("div");
    timeContainer.setAttribute("class","time");
    //time text node
    let timeText=document.createTextNode(this.time);
    timeContainer.appendChild(timeText);
    timeHolder.appendChild(timeContainer);
    chatTime.appendChild(timeHolder);
    chatContent.appendChild(chatTime);
    //append chatcontent to parent
    parent.appendChild(chatContent);
    //append chat to messages
    $(".messages").append(parent);
    
}
//const chatObj2=new  Chat(true,null,"Am cool bro and you?","Today 14:30 PM");
//chatObj2.createChat();
$(document).ready(function(){
    
})