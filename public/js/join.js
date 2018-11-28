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

const createAlertMessage = document.querySelector('#create-alert-error');
const joinAlertMessage = document.querySelector('#join-alert-error');
createAlertMessage.style.display = 'none';
joinAlertMessage.style.display = 'none';

function setCreateBox() {
    choose.style.display = 'none';
    createForm.style.display = 'block';
    createForm.style.transform = 'scale(1)';
}

function setJoinBox() {
    choose.style.display = 'none';
    joinForm.style.display = 'block';
    joinForm.style.transform = 'scale(1)';
}

function alertError() {
    const urlParams = new URLSearchParams(window.location.search);
    const error = urlParams.get('error');
    const method = urlParams.get('method');
    if (method === 'create') {
        if (error === 'empty') {
            setCreateBox();
            createAlertMessage.innerHTML = 'Name and room name can not be empty';
            createAlertMessage.style.display = 'block';
        }
        else if (error === 'string') {
            setCreateBox();
            createAlertMessage.innerHTML = 'Name and room name must be a string';
            createAlertMessage.style.display = 'block';
        }
        else if (error === 'alpha') {
            setCreateBox();
            createAlertMessage.innerHTML = 'Name and room name must contain only Eng letters, numbers, or dashes.';
            createAlertMessage.style.display = 'block';
        }
        else if (error === 'exist') {
            setCreateBox();
            createAlertMessage.innerHTML = 'This Name or room name already exists';
            createAlertMessage.style.display = 'block';
        }
        else {
            createAlertMessage.style.display = 'none';
        }
    } else if (method === 'join') {
        if (error === 'empty') {
            setJoinBox();
            joinAlertMessage.innerHTML = 'Name and room name can not be empty';
            joinAlertMessage.style.display = 'block';
        }
        else if (error === 'string') {
            setJoinBox();
            joinAlertMessage.innerHTML = 'Name and room name must be a string';
            joinAlertMessage.style.display = 'block';
        }
        else if (error === 'exist') {
            setJoinBox();
            joinAlertMessage.innerHTML = 'This name already taken';
            joinAlertMessage.style.display = 'block';
        }
        else if (error === 'alpha') {
            console.log(error + " " + method + "if");
            setJoinBox();
            joinAlertMessage.innerHTML = 'Name and room name must contain only Eng letters, numbers, or dashes.';
            joinAlertMessage.style.display = 'block';
        }
        else if (error === 'noroom') {
            setJoinBox();
            joinAlertMessage.innerHTML = 'This room does not exist';
            joinAlertMessage.style.display = 'block';
        }
        else {
            console.log('error not show');
            joinAlertMessage.style.display = 'none';
        }
    }
    console.log(error);
}
alertError();

// document.getElementById("create-button").addEventListener("click", function() {
//     if (createDisplayName.value.length && createRoomName.value.length) {
//         localStorage.setItem('method', 'create');
//         localStorage.setItem('name', createDisplayName.value);
//         localStorage.setItem('room', createRoomName.value);
//         window.location = 'chat.html';
//     }
// });
// document.getElementById("join-button").addEventListener("click", function() {
//     if (joinDisplayName.value.length && joinRoomName.value.length) {
//         console.log('sdfdsf');
//         localStorage.setItem('method', 'join');
//         localStorage.setItem('name', joinDisplayName.value);
//         localStorage.setItem('room', joinRoomName.value);
//         window.location = 'chat.html';
//     }
// });