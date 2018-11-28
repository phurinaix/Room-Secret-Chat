setTimeout(function(){
    document.getElementById("loader").style.display = "none";
    document.getElementsByClassName("container")[0].style.display = "block";
}, 500);

var joinForm = document.getElementById("join-form");
var createForm = document.getElementById("create-form");
var choose = document.getElementById("choose");
var createDisplayName = document.getElementById("create-display-name");
var createRoomName = document.getElementById("create-room-name");
var joinDisplayName = document.getElementById("join-display-name");
var joinRoomName = document.getElementById("join-room-name");

document.getElementById("create").addEventListener('click', function() {
    choose.style.transform = 'scale(0)';
    setTimeout(function() {
        choose.style.display = 'none';
        createForm.style.display = 'block';
        createForm.style.transform = 'scale(1)';
    }, 400);
    joinForm.style.display = 'none';
});
document.getElementById("join").addEventListener('click', function() {
    choose.style.transform = 'scale(0)';
    setTimeout(function() {
        choose.style.display = 'none';
        joinForm.style.display = 'block';
        joinForm.style.transform = 'scale(1)';
    }, 400);
});

document.getElementById("create-button").addEventListener("click", function() {
    if (createDisplayName.value.length && createRoomName.value.length) {
        localStorage.setItem('method', 'create');
        localStorage.setItem('name', createDisplayName.value);
        localStorage.setItem('room', createRoomName.value);
        window.location = 'chat.html';
    }
});
document.getElementById("join-button").addEventListener("click", function() {
    if (joinDisplayName.value.length && joinRoomName.value.length) {
        console.log('sdfdsf');
        localStorage.setItem('method', 'join');
        localStorage.setItem('name', joinDisplayName.value);
        localStorage.setItem('room', joinRoomName.value);
        window.location = 'chat.html';
    }
});