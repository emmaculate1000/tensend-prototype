const socket = io("ec2-54-211-20-223.compute-1.amazonaws.com:3000");
const pics = ["images/avatar-1.jpg", "images/avatar-2.jpg", "images/avatar-3.jpg"];
const messageContainer = document.querySelector('.messages');

//set id of current user chatting
let currentUserChatting = null;
let currentChats = null;
let others = null;
//get user info from url
const { username, k } = Qs.parse(location.search, {
    ignoreQueryPrefix: true
})
let dateObj = new Date();
let time = dateObj.toUTCString();
//join chat and store user info
let me = { username: username, id: k, img: pics[Math.floor(Math.random() * 3)] };
socket.emit("join", me);
//generate users
socket.on("join", (users) => {
    //set content of users to zero 
    $(".user-list").html("");
    const otherUsers = users.filter(user => user.ref !== me.id);
    others = otherUsers;
    console.log(users);
    otherUsers.forEach((userX) => {
        let userObj = new Users(userX.id, userX.username, userX.img, "", "Hello, I just came in now", "Active");
        userObj.createUser();
    })
    console.log(otherUsers);
})
//switch current chat user
$(document).on('click', '.user-list-item', function () {
    //empty message box
    $(".messages").html("");
    let user_id = $(this).attr("data");
    //set current user chatting as first member of users
    currentUserChatting = others.find(user => user_id == user.id);
    setUserInfo(currentUserChatting);
    //join user room
    //socket.emit("joinUser",user_id);
})
function setUserInfo(data) {
    $(".chatting-user-name").text(data.username);
    $(".chatting-user-img").attr("src", data.img);
}
socket.on("loadChat", (allChats) => {
    //filter chats for current user chatting
    const currentUserConversation = allChats.filter(chat => chat.from.id == currentUserChatting.id && chat.to.id == me.id);
    //append chats
    currentUserConversation.forEach(chat => {
        const chatObj = new Chat(chat.from.id == me.id ? true : false, { img: chat.from.img }, chat.text, chat.time);
        chatObj.createChat();
    })
})
function Chat(self, userInfo, message, time) {
    this.self = self;
    this.userInfo = userInfo;
    this.message = message;
    this.time = time;
}
Chat.prototype.createChat = function () {
    let parent = document.createElement("div");
    parent.setAttribute("class", this.self ? "chats chats-right" : "chats");
    if (this.self == false) {
        //create image of user chatting
        let userImgContainer = document.createElement("div");
        userImgContainer.setAttribute("class", "chat-avatar");
        //create img
        let userImg = document.createElement("img");
        userImg.setAttribute("class", "rounded-circle dreams_chat");
        userImg.setAttribute("alt", "image");
        userImg.src = this.userInfo.img;
        userImgContainer.appendChild(userImg);
        parent.appendChild(userImgContainer);
    }
    //chat content
    let chatContent = document.createElement("div");
    chatContent.setAttribute("class", "chat-content");
    //chat message
    let chatMessage = document.createElement("div");
    chatMessage.setAttribute("class", "message-content");
    chatText = document.createTextNode(this.message);
    chatMessage.appendChild(chatText);
    chatContent.appendChild(chatMessage);
    parent.appendChild(chatContent);
    //chat-time
    let chatTime = document.createElement("div");
    chatTime.setAttribute("class", "chat-time");
    //time holder
    let timeHolder = document.createElement("div");
    //chat container
    let timeContainer = document.createElement("div");
    timeContainer.setAttribute("class", "time");
    //time text node
    let timeText = document.createTextNode(this.time);
    timeContainer.appendChild(timeText);
    timeHolder.appendChild(timeContainer);
    chatTime.appendChild(timeHolder);
    chatContent.appendChild(chatTime);
    //append chatcontent to parent
    parent.appendChild(chatContent);
    //append chat to messages
    $(".messages").append(parent);
    //scroll down
    messageContainer.scrollTop = messageContainer.scrollHeight;

}
const img = "images/logo.jpg";
$("#chatForm").submit(function (e) {
    e.preventDefault();
    let message = $("#message-data").val();
    let dateOb = new Date();
    let currentTime = dateOb.toUTCString();
    let msg = {
        to: currentUserChatting,
        text: message,
        time: currentTime,
        from: me
    }
    console.log(msg);
    //empty input field
    $("#message-data").val("");
    const chatObj = new Chat(true, {}, message, currentTime);
    chatObj.createChat();
    socket.emit("message", msg);
    ;
})
socket.on("message", (chat) => {
    const chatObj = new Chat(chat.from.id == k ? true : false, { img: chat.from.img }, chat.text, chat.time);
    chatObj.createChat();
})
