
function Users(id,name,picture,userMessages,receivedMessages,time){
    this.id=id;
    this.name=name;
    this.picture=picture;
    this.userMessages=userMessages;
    this.receivedMessages=receivedMessages;
    this.time=time;

}
Users.prototype.createUser=function(){
    //parent li
    let parentContainer=document.createElement("li");
    parentContainer.setAttribute("class","user-list-item user");
    parentContainer.setAttribute("data",this.id);
    //image container
    let profileImageContainer=document.createElement("div");
    profileImageContainer.setAttribute("class","avatar avatar-online");
    //create image
    let profileImage=document.createElement('img');
    profileImage.setAttribute("class","rounded-circle");
    profileImage.setAttribute("alt","image");
    profileImage.src=this.picture;
    //append image to container
    profileImageContainer.appendChild(profileImage);
    //append image container to parentContainer
    parentContainer.appendChild(profileImageContainer);
    //user list body
    let userListBody=document.createElement("div");
    userListBody.setAttribute("class","users-list-body");
    //user name container
    let userNameContainer=document.createElement("div");
    //create name
    let userName=document.createElement("h5");
    userNameText=document.createTextNode(this.name);
    userName.appendChild(userNameText);
    userNameContainer.appendChild(userName);
    //create last message
    let lastMessage=document.createElement("p");
    let lastMessageText=document.createTextNode(this.receivedMessages);
    lastMessage.appendChild(lastMessageText);
    userNameContainer.appendChild(lastMessage);
    //append userNameContainer to userListBody
    userListBody.appendChild(userNameContainer);
    //create last chat time
    let lastChatTime=document.createElement("div");
    lastChatTime.setAttribute("class","last-chat-time");
    //time text node
    let timeText=document.createElement("small");
    let timeNode=document.createTextNode(this.time);
    timeText.appendChild(timeNode);
    lastChatTime.appendChild(timeText);
    //append lastchat time to usersListBody
    userListBody.appendChild(lastChatTime);
    //append listBody to parent container
    parentContainer.appendChild(userListBody);
    //append user to ul
    $(".user-list").append(parentContainer);
}
